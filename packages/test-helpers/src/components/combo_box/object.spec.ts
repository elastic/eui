/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiComboBoxObject } from './object';

/**
 * Validates `EuiComboBoxObject` against the live component in EUI Storybook.
 *
 * `data-test-subj` is injected via Storybook's `args` URL parameter so the
 * helper can scope to the outer `.euiComboBox` wrapper — the clear button is
 * rendered as a sibling of `comboBoxInput`, not a descendant.
 */

const TEST_SUBJ = 'testComboBox';
const PLAYGROUND_STORY_URL =
  `/iframe.html?id=forms-euicombobox--playground&viewMode=story&args=data-test-subj:${TEST_SUBJ}`;

test.describe('EuiComboBoxObject', () => {
  let combo: EuiComboBoxObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_STORY_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    combo = new EuiComboBoxObject(page, TEST_SUBJ);
    await combo.clear();
  });

  test('setSelectedOptions sets the selection to the provided labels', async () => {
    await combo.setSelectedOptions(['Item 2']);

    expect(await combo.getSelectedOptions()).toEqual(['Item 2']);
  });

  test('setSelectedOptions replaces the existing selection', async () => {
    await combo.setSelectedOptions(['Item 1', 'Item 2']);
    expect(await combo.getSelectedOptions()).toEqual(['Item 1', 'Item 2']);

    // Replace, don't add.
    await combo.setSelectedOptions(['Item 3']);
    expect(await combo.getSelectedOptions()).toEqual(['Item 3']);
  });

  test('setSelectedOptions is idempotent when the selection already matches', async () => {
    await combo.setSelectedOptions(['Item 1', 'Item 2']);

    await expect(
      combo.setSelectedOptions(['Item 1', 'Item 2'])
    ).resolves.not.toThrow();
    expect(await combo.getSelectedOptions()).toEqual(['Item 1', 'Item 2']);
  });

  test('clear removes all selected options', async () => {
    await combo.setSelectedOptions(['Item 1', 'Item 2']);

    await combo.clear();

    expect(await combo.getSelectedOptions()).toEqual([]);
  });

  test('clear is a no-op when nothing is selected', async () => {
    await expect(combo.clear()).resolves.not.toThrow();
    expect(await combo.getSelectedOptions()).toEqual([]);
  });

});
