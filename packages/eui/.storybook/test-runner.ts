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

import { VRT_SELECTORS, VARIANTS, type VariantName } from './vrt';

/**
 * `{ animations: 'disabled' }` pauses CSS animations before taking a screenshot,
 * preventing stability timeouts on infinite looping animations (spinners etc.).
 */
const SCREENSHOT_OPTIONS = { animations: 'disabled' } as const;

/**
 * The active variant for this run, determined by the `VRT_VARIANT` env var.
 * Falls back to desktop when run directly (e.g. `yarn test-storybook`).
 */
const activeVariant =
  process.env.VRT_VARIANT && process.env.VRT_VARIANT in VARIANTS
    ? VARIANTS[process.env.VRT_VARIANT as VariantName]
    : VARIANTS.desktop;

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
    // Set the viewport before the story renders (and before its `play` runs) so
    // both layout and interactions happen at the active variant's dimensions.
    await page.setViewportSize(activeVariant.viewport);
    // Emulate `prefers-reduced-motion` so EUI components that respect it
    // render in their reduced/static state before the screenshot is taken
    await page.emulateMedia({ reducedMotion: 'reduce' });
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);

    if (storyContext.parameters?.vrt?.skip) return;

    const skipVariants: string[] =
      storyContext.parameters?.vrt?.skipVariants ?? [];
    if (skipVariants.includes(activeVariant.name)) return;

    const selector =
      storyContext.parameters?.vrt?.selector ?? VRT_SELECTORS.default;

    await waitForPageReady(page);
    await waitForImagesToLoad(page);

    const image =
      selector === 'page'
        ? await page.screenshot(SCREENSHOT_OPTIONS)
        : await page.locator(selector).first().screenshot(SCREENSHOT_OPTIONS);

    const snapshotId = `${context.id}-${activeVariant.name}`;
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
  },
};

export default config;
