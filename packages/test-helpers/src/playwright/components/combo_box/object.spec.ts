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

    test('selects the exact label when it is a prefix of another option', async () => {
      // "Item 1" is a prefix of "Item 10"; must pick "Item 1", not "Item 10".
      await comboBox.setSelectedOptions(['Item 1']);

      expect(await comboBox.getSelectedOptions()).toEqual(['Item 1']);
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

  test.describe('getAllVisibleOptions', () => {
    test('returns the visible option labels', async () => {
      const options = await comboBox.getAllVisibleOptions();
      expect(options).toContain('Item 1');
      expect(options).toContain('Item 5');
    });
  });
});

test.describe('EuiComboBoxObject component-type guard', () => {
  // Wiring test: a real method on a wrong target rejects. `comboBoxSearchInput`
  // is the inner input, not the `.euiComboBox` root. (Guard mechanism itself is
  // unit-tested in base_object.spec.ts.)
  test('rejects a non-EuiComboBox target', async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId('comboBoxSearchInput').waitFor({ state: 'visible' });

    const comboBox = new EuiComboBoxObject(page, 'comboBoxSearchInput');

    await expect(comboBox.getSelectedOptions()).rejects.toThrow(
      /Are you using the right Component Object/i
    );
  });
});
