/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import fs from 'fs';
import path from 'path';
import type { Page } from 'playwright';
import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext, waitForPageReady } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import { VRT_SELECTORS } from './vrt';

/**
 * `{ animations: 'disabled' }` pauses CSS animations before taking a screenshot,
 * preventing stability timeouts on infinite looping animations (spinners etc.).
 */
const SCREENSHOT_OPTIONS = { animations: 'disabled' } as const;

/**
 * Variants each story is snapshotted under. Each variant's `name` becomes the
 * suffix on the saved baseline (e.g. `${context.id}-desktop.png`) and is what
 * stories pass to `parameters.vrt.skipVariants` to opt out of a specific one.
 */
const VARIANTS = [
  { name: 'desktop', viewport: { width: 1440, height: 900 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
] as const;

type VariantName = (typeof VARIANTS)[number]['name'];

/**
 * Ensures all `<img>` elements are fully loaded before taking a screenshot.
 * `waitForPageReady` does not guarantee image decode completion, which causes
 * layout shifts in stories that use `<EuiImage>` or similar components.
 */
const waitForImagesToLoad = async (page: Page) => {
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.addEventListener('load', resolve);
              img.addEventListener('error', resolve);
            })
        )
    )
  );
};

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
    jest.retryTimes(2, { logErrorsBeforeRetry: true });
  },
  async preVisit(page) {
    // Emulate `prefers-reduced-motion` so EUI components that respect it
    // render in their reduced/static state before the screenshot is taken
    await page.emulateMedia({ reducedMotion: 'reduce' });
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);

    if (storyContext.parameters?.vrt?.skip) return;

    const selector =
      storyContext.parameters?.vrt?.selector ?? VRT_SELECTORS.default;
    const skipVariants: VariantName[] =
      storyContext.parameters?.vrt?.skipVariants ?? [];

    for (const variant of VARIANTS) {
      if (skipVariants.includes(variant.name)) continue;

      await page.setViewportSize(variant.viewport);
      await waitForPageReady(page);
      await waitForImagesToLoad(page);

      const image =
        selector === 'page'
          ? await page.screenshot(SCREENSHOT_OPTIONS)
          : await page.locator(selector).first().screenshot(SCREENSHOT_OPTIONS);

      const snapshotId = `${context.id}-${variant.name}`;
      const snapshotPath = path.join(
        __dirname,
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
          customSnapshotsDir: path.join(__dirname, '..', '.vrt', 'reference'),
          customDiffDir: path.join(__dirname, '..', '.vrt', 'diff'),
          customReceivedDir: path.join(__dirname, '..', '.vrt', 'current'),
          storeReceivedOnFailure: true,
          customSnapshotIdentifier: snapshotId,
        });
      }
    }
  },
};

export default config;
