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
import { getStoryContext, waitForPageReady } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import {
  VRT_SELECTORS,
  VARIANTS,
  VRT_VARIANT_ATTRIBUTE,
  isVariantName,
  isVariantSkipped,
  type VariantName,
  type VrtSkip,
} from './vrt';

/**
 * `{ animations: 'disabled' }` pauses CSS animations before taking a screenshot,
 * preventing stability timeouts on infinite looping animations (spinners etc.).
 */
const SCREENSHOT_OPTIONS = { animations: 'disabled' } as const;

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

/**
 * Ensures all `<img>` elements are fully loaded before taking a screenshot.
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

/**
 * Ensure all fonts are loaded before taking a screenshot.
 */
const waitForFonts = async (page: Page) => {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
};

/**
 * Ensure the page layout has stabilized before taking a screenshot.
 */
const waitForLayout = async (page: Page) => {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      )
  );
};

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async preVisit(page) {
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

    await waitForPageReady(page);
    await waitForImagesToLoad(page);
    await waitForFonts(page);
    await waitForLayout(page);

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
