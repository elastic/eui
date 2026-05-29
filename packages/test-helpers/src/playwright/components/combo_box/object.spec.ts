/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiComboBoxObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiComboBoxObject` against the live component in EUI Storybook.
 *
 * `data-test-subj` is injected via Storybook's `args` URL parameter so the
 * helper can scope to the outer `.euiComboBox` wrapper — the clear button is
 * rendered as a sibling of `comboBoxInput`, not a descendant.
 */

const TEST_SUBJ = 'testComboBox';

const PLAYGROUND_URL = storyUrl(
  'forms-euicombobox--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiComboBoxObject', () => {
  let comboBox: EuiComboBoxObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    comboBox = new EuiComboBoxObject(page, TEST_SUBJ);
    await comboBox.clear();
  });

  test.describe('setSelectedOptions', () => {
    test('sets the selection to the provided labels', async () => {
      await comboBox.setSelectedOptions(['Item 2']);

      expect(await comboBox.getSelectedOptions()).toEqual(['Item 2']);
    });

    test('replaces the existing selection', async () => {
      await comboBox.setSelectedOptions(['Item 1', 'Item 2']);
      expect(await comboBox.getSelectedOptions()).toEqual(['Item 1', 'Item 2']);

      // Replace, don't add.
      await comboBox.setSelectedOptions(['Item 3']);
      expect(await comboBox.getSelectedOptions()).toEqual(['Item 3']);
    });

    test('is idempotent when the selection already matches', async () => {
      await comboBox.setSelectedOptions(['Item 1', 'Item 2']);

      await expect(
        comboBox.setSelectedOptions(['Item 1', 'Item 2'])
      ).resolves.not.toThrow();
      expect(await comboBox.getSelectedOptions()).toEqual(['Item 1', 'Item 2']);
    });

    test('setSelectedOptions([]) clears the selection', async () => {
      await comboBox.setSelectedOptions(['Item 1', 'Item 2']);

      await comboBox.setSelectedOptions([]);

      expect(await comboBox.getSelectedOptions()).toEqual([]);
    });
  });

  test.describe('clear', () => {
    test('removes all selected options', async () => {
      await comboBox.setSelectedOptions(['Item 1', 'Item 2']);

      await comboBox.clear();

      expect(await comboBox.getSelectedOptions()).toEqual([]);
    });

    test('is a no-op when nothing is selected', async () => {
      await expect(comboBox.clear()).resolves.not.toThrow();
      expect(await comboBox.getSelectedOptions()).toEqual([]);
    });
  });
});
