/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiCheckboxObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiCheckboxObject` against the live component in EUI Storybook.
 * The Playground story keeps the `checked` state itself.
 */

const TEST_SUBJ = 'testCheckbox';

const PLAYGROUND_URL = storyUrl(
  'forms-euicheckbox--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiCheckboxObject', () => {
  test('check and uncheck change the state once', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const checkbox = new EuiCheckboxObject(page, TEST_SUBJ);

    expect(await checkbox.isChecked()).toBe(false);
    await checkbox.check();
    await checkbox.check();
    expect(await checkbox.isChecked()).toBe(true);
    await checkbox.uncheck();
    expect(await checkbox.isChecked()).toBe(false);
  });

  test('toggle flips the state', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};checked:!true`);
    const checkbox = new EuiCheckboxObject(page, TEST_SUBJ);

    expect(await checkbox.isChecked()).toBe(true);
    await checkbox.toggle();
    expect(await checkbox.isChecked()).toBe(false);
    await checkbox.toggle();
    expect(await checkbox.isChecked()).toBe(true);
  });
});
