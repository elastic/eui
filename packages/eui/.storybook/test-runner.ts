/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Page } from 'playwright';
import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import {
  VRT_SELECTORS,
  VARIANTS,
  VRT_VARIANT_ATTRIBUTE,
  isVariantName,
  isVariantSkipped,
  type VariantName,
  type VrtSkip,
} from './vrt.ts';

/**
 * `{ animations: 'disabled' }` pauses CSS animations before taking a screenshot,
 * preventing stability timeouts on infinite looping animations (spinners etc.).
 */
const SCREENSHOT_OPTIONS = {
  animations: 'disabled',
  timeout: 20_000,
} as const;

/**
 * Playwright does not abort `page.evaluate` of a Promise that never settles
 * (`document.fonts.ready`, Storybook `__test` waiting on play/render). Cap
 * those from Node and terminate the page JS so the worker is not wedged.
 */
const EVALUATE_HANG_MS = 20_000;

type PageWithHangGuard = Page & { __euiHangGuard?: true };

const raceHang = <T>(promise: Promise<T>, label: string): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`${label} hung after ${EVALUATE_HANG_MS}ms`));
    }, EVALUATE_HANG_MS);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });

const abortHungEvaluate = async (page: Page) => {
  try {
    const session = await page.context().newCDPSession(page);
    await session.send('Runtime.terminateExecution').catch(() => undefined);
    await session.detach().catch(() => undefined);
  } catch {
    // Page already closed or context gone.
  }
  await page.reload({ waitUntil: 'domcontentloaded' }).catch(() => undefined);
};

const guardPageAgainstEvaluateHang = (page: Page) => {
  const guarded = page as PageWithHangGuard;
  if (guarded.__euiHangGuard) return;
  guarded.__euiHangGuard = true;

  const evaluate = page.evaluate.bind(page);
  page.evaluate = (async (...args: Parameters<Page['evaluate']>) => {
    try {
      return await raceHang(evaluate(...args), 'page.evaluate');
    } catch (err) {
      if (String(err).includes('hung after')) {
        await abortHungEvaluate(page);
      }
      throw err;
    }
  }) as Page['evaluate'];

  const waitForFunction = page.waitForFunction.bind(page);
  page.waitForFunction = (async (
    ...args: Parameters<Page['waitForFunction']>
  ) => {
    try {
      return await raceHang(
        waitForFunction(...args),
        'page.waitForFunction'
      );
    } catch (err) {
      if (String(err).includes('hung after')) {
        await abortHungEvaluate(page);
      }
      throw err;
    }
  }) as Page['waitForFunction'];
};

/**
 * Allow a few pixels of subpixel noise.
 */
const FAILURE_THRESHOLD_PIXELS = 4;

const configDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * The active variant for this run, determined by the `VRT_VARIANT` env var.
 * Falls back to desktop when run directly (e.g. `yarn test-storybook`).
 */
const activeVariantName: VariantName = isVariantName(process.env.VRT_VARIANT)
  ? process.env.VRT_VARIANT
  : 'desktop';
const activeVariant = VARIANTS[activeVariantName];

const WAIT_OPTIONS = { timeout: EVALUATE_HANG_MS, polling: 100 } as const;

/**
 * Ensures all `<img>` elements are fully loaded before taking a screenshot.
 */
const waitForImagesToLoad = async (page: Page) => {
  await page.waitForFunction(
    () => Array.from(document.images).every((img) => img.complete),
    undefined,
    WAIT_OPTIONS
  );
};

/**
 * Ensure all fonts are loaded before taking a screenshot.
 */
const waitForFonts = async (page: Page) => {
  await page.waitForFunction(
    () => document.fonts.status === 'loaded',
    undefined,
    WAIT_OPTIONS
  );
};

/**
 * `EuiIcon` lazy-loads SVGs. The placeholder has `data-is-loading` until the
 * import resolves; screenshotting earlier captures an empty grey square.
 */
const waitForEuiIcons = async (page: Page) => {
  await page.waitForFunction(
    () => !document.querySelector('[data-is-loading]'),
    undefined,
    WAIT_OPTIONS
  );
};

/**
 * Wait two animation frames so layout can settle. Cap with `setTimeout` so a
 * stuck rAF cannot hang `page.evaluate`.
 */
const waitForLayout = async (page: Page) => {
  await page.evaluate(
    () =>
      Promise.race([
        new Promise((resolve) => {
          requestAnimationFrame(() =>
            requestAnimationFrame(() => resolve(true))
          );
        }),
        new Promise((resolve) => {
          setTimeout(() => resolve(true), 1000);
        }),
      ])
  );
};

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async preVisit(page) {
    guardPageAgainstEvaluateHang(page);

    // Storybook 10 pauses CSS animations which breaks some components;
    // Remove animations entirely so components render base styles
    await page.evaluate(() => {
      if (!document.getElementById('eui-vrt-no-animation')) {
        const style = document.createElement('style');
        style.id = 'eui-vrt-no-animation';
        style.textContent =
          '*, *::before, *::after { animation: none !important; transition: none !important; }';
        document.head.appendChild(style);
      }
    });
    // Set the viewport before the story renders (and before its `play` runs) so
    // both layout and interactions happen at the active variant's dimensions.
    await page.setViewportSize(activeVariant.viewport);
    // Expose the active variant to `playDecorator` so it can honor `vrt.skip`.
    await page.evaluate(
      ({ attribute, name }) => {
        document.documentElement.setAttribute(attribute, name);
      },
      { attribute: VRT_VARIANT_ATTRIBUTE, name: activeVariant.name }
    );
    // Emulate `prefers-reduced-motion` so EUI components that respect it
    // render in their reduced/static state before the screenshot is taken
    await page.emulateMedia({ reducedMotion: 'reduce' });
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);

    const skip: VrtSkip | undefined = storyContext.parameters?.vrt?.skip;
    if (isVariantSkipped(skip, activeVariantName)) return;

    const selector =
      storyContext.parameters?.vrt?.selector ?? VRT_SELECTORS.default;

    // Do not call Storybook's `waitForPageReady`: it ends with
    // `page.evaluate(() => document.fonts.ready)`, which has no Playwright
    // timeout if that promise never settles and hangs the worker until the
    // job is killed. Load/idle are already done by the time `postVisit` runs.
    await waitForImagesToLoad(page);
    await waitForFonts(page);
    await waitForLayout(page);
    await waitForEuiIcons(page);

    const image =
      selector === 'page'
        ? await page.screenshot(SCREENSHOT_OPTIONS)
        : await page.locator(selector).first().screenshot(SCREENSHOT_OPTIONS);

    const snapshotId = `${context.id}-${activeVariant.name}`;
    const snapshotPath = path.join(
      configDir,
      '..',
      '.vrt',
      'reference',
      `${snapshotId}.png`
    );

    if (!fs.existsSync(snapshotPath)) {
      // No baseline exists yet, write it directly so Jest's CI mode doesn't
      // block first-run baseline generation.
      fs.mkdirSync(path.dirname(snapshotPath), { recursive: true });
      fs.writeFileSync(snapshotPath, new Uint8Array(image));
    } else {
      expect(image).toMatchImageSnapshot({
        customSnapshotsDir: path.join(configDir, '..', '.vrt', 'reference'),
        customDiffDir: path.join(configDir, '..', '.vrt', 'diff'),
        customReceivedDir: path.join(configDir, '..', '.vrt', 'current'),
        storeReceivedOnFailure: true,
        customSnapshotIdentifier: snapshotId,
        failureThreshold: FAILURE_THRESHOLD_PIXELS,
        failureThresholdType: 'pixel',
      });
    }
  },
};

export default config;
