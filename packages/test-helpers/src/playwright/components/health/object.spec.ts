/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiHealthObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiHealthObject` against the live component in EUI Storybook.
 */

const TEST_SUBJ = 'testHealth';

const PLAYGROUND_URL = storyUrl(
  'display-euihealth--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiHealthObject', () => {
  test('getText reads the status text', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const health = new EuiHealthObject(page, TEST_SUBJ);

    expect(await health.getText()).toBe('Status');
  });
});
