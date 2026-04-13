/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import path from 'path';
import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const STORY_SELECTOR = '#story-wrapper > *';

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);

    if (storyContext.parameters?.vrt?.skip) return;

    const selector = storyContext.parameters?.vrt?.selector ?? STORY_SELECTOR;
    const viewport = page.viewportSize();
    const project = viewport?.width === 390 ? 'mobile' : 'desktop';
    const image = await page.locator(selector).first().screenshot();

    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: path.join(__dirname, '..', '.vrt', 'reference'),
      customDiffDir: path.join(__dirname, '..', '.vrt', 'diff'),
      customSnapshotIdentifier: `${context.id}-${project}`,
    });
  },
};

export default config;
