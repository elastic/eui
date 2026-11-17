/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiSelectObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiSelectObject` against the live component in EUI Storybook.
 * The Playground story is uncontrolled with `defaultValue` `option-2`.
 */

const TEST_SUBJ = 'testSelect';

const PLAYGROUND_URL = storyUrl(
  'forms-euiselect--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiSelectObject', () => {
  test('reads the initial selection', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const select = new EuiSelectObject(page, TEST_SUBJ);

    expect(await select.getSelectedValue()).toBe('option-2');
    expect(await select.getSelectedLabel()).toBe('Option 2');
  });

  test('selectOptionByValue changes the selection', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const select = new EuiSelectObject(page, TEST_SUBJ);

    await select.selectOptionByValue('option-3');
    expect(await select.getSelectedValue()).toBe('option-3');
    expect(await select.getSelectedLabel()).toBe('Option 3');
  });

  test('selectOptionByLabel changes the selection', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    const select = new EuiSelectObject(page, TEST_SUBJ);

    await select.selectOptionByLabel('Option 1');
    expect(await select.getSelectedValue()).toBe('option-1');
    expect(await select.getSelectedLabel()).toBe('Option 1');
  });
});
