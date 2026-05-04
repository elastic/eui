/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import fs from 'fs';
import path from 'path';
import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const STORY_SELECTOR = '#story-wrapper > *';
/**
 * `{ animations: 'disabled' }` pauses CSS animations before taking a screenshot,
 * preventing stability timeouts on infinite looping animations (spinners etc.).
 */
const SCREENSHOT_OPTIONS = { animations: 'disabled' } as const;

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async preVisit(page) {
    // Emulate `prefers-reduced-motion` so EUI components that respect it
    // render in their reduced/static state before the screenshot is taken
    await page.emulateMedia({ reducedMotion: 'reduce' });
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);

    if (storyContext.parameters?.vrt?.skip) return;

    const selector = storyContext.parameters?.vrt?.selector ?? STORY_SELECTOR;
    const viewport = page.viewportSize();
    const project = viewport?.width === 390 ? 'mobile' : 'desktop';
    const image =
      selector === 'page'
        ? await page.screenshot(SCREENSHOT_OPTIONS)
        : await page.locator(selector).first().screenshot(SCREENSHOT_OPTIONS);

    const snapshotId = `${context.id}-${project}`;
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
