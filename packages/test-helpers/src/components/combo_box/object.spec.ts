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

  test('selectOption adds a pill for the chosen label', async () => {
    await combo.selectOption('Item 2');

    expect(await combo.getSelectedOptions()).toEqual(['Item 2']);
  });

  test('selectOption is idempotent when the label is already selected', async () => {
    await combo.selectOption('Item 1');

    await expect(combo.selectOption('Item 1')).resolves.not.toThrow();
    expect(await combo.getSelectedOptions()).toEqual(['Item 1']);
  });

  test('clear removes all selected options', async () => {
    await combo.selectOption('Item 1');
    await combo.selectOption('Item 2');

    await combo.clear();

    expect(await combo.getSelectedOptions()).toEqual([]);
  });

  test('clear is a no-op when nothing is selected', async () => {
    await expect(combo.clear()).resolves.not.toThrow();
    expect(await combo.getSelectedOptions()).toEqual([]);
  });

  test('two combo boxes on the same page are operated independently', async ({
    page,
  }) => {
    await page.goto('/iframe.html?id=forms-euicombobox--multiple-instances');
    const combo1 = new EuiComboBoxObject(page, 'combo1');
    const combo2 = new EuiComboBoxObject(page, 'combo2');
    await combo1.clear();
    await combo2.clear();

    // Distinct labels + reverse order so a regression that mis-routed a
    // selection across combos would surface.
    await combo2.selectOption('Item 5');
    await combo1.selectOption('Item 2');

    expect(await combo1.getSelectedOptions()).toEqual(['Item 2']);
    expect(await combo2.getSelectedOptions()).toEqual(['Item 5']);

    // Clearing combo1 must not affect combo2 — guards the `clearButton`
    // getter against a page-level scoping regression.
    await combo1.clear();
    expect(await combo1.getSelectedOptions()).toEqual([]);
    expect(await combo2.getSelectedOptions()).toEqual(['Item 5']);
  });
});
