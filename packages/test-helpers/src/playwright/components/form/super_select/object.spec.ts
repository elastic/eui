/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiSuperSelectObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiSuperSelectObject` against the live component in EUI
 * Storybook. The Playground story is stateful with options `option-1..3`
 * whose `dropdownDisplay` ("Option One") differs from `inputDisplay`
 * ("Option 1") — exercising the label-vs-value distinction the object
 * documents. `data-test-subj` is injected via Storybook's `args` URL
 * parameter and lands on the control `<button>`.
 */

const TEST_SUBJ = 'testSuperSelect';

const PLAYGROUND_URL = storyUrl(
  'forms-euisuperselect--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiSuperSelectObject', () => {
  let superSelect: EuiSuperSelectObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    superSelect = new EuiSuperSelectObject(page, TEST_SUBJ);
  });

  test.describe('getSelectedValue', () => {
    test('reads the initial committed value', async () => {
      expect(await superSelect.getSelectedValue()).toBe('option-1');
    });
  });

  test.describe('selectOptionByValue', () => {
    test('selects an option and commits its value', async () => {
      await superSelect.selectOptionByValue('option-2');

      expect(await superSelect.getSelectedValue()).toBe('option-2');
    });

    test('is a no-op-safe re-selection of the current value', async () => {
      await superSelect.selectOptionByValue('option-1');

      expect(await superSelect.getSelectedValue()).toBe('option-1');
    });
  });

  test.describe('selectOptionByLabel', () => {
    test('selects an option by its visible dropdown label', async () => {
      // The dropdown shows `dropdownDisplay` ("Option Two"), not the
      // committed `inputDisplay` ("Option 2").
      await superSelect.selectOptionByLabel('Option Two');

      expect(await superSelect.getSelectedValue()).toBe('option-2');
    });
  });
});
