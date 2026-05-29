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
 * Validates that `EuiComboBoxObject` correctly scopes all locators when
 * multiple EuiComboBox instances coexist on the same page.
 *
 * Kept in a separate spec so Playwright can run this and `object.spec.ts`
 * in parallel workers.
 */

test.describe('EuiComboBoxObject — multiple instances', () => {
  let comboBox1: EuiComboBoxObject;
  let comboBox2: EuiComboBoxObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(storyUrl('forms-euicombobox--multiple-instances'));
    comboBox1 = new EuiComboBoxObject(page, 'combo1');
    comboBox2 = new EuiComboBoxObject(page, 'combo2');
    await comboBox1.clear();
    await comboBox2.clear();
  });

  test('two combo boxes on the same page are operated independently', async () => {
    // Distinct labels + reverse order so a regression that mis-routed a
    // selection across combos would surface.
    await comboBox2.setSelectedOptions(['Item 5']);
    await comboBox1.setSelectedOptions(['Item 2']);

    expect(await comboBox1.getSelectedOptions()).toEqual(['Item 2']);
    expect(await comboBox2.getSelectedOptions()).toEqual(['Item 5']);

    // Clearing comboBox1 must not affect comboBox2 — guards the `clearButton`
    // getter against a page-level scoping regression.
    await comboBox1.clear();
    expect(await comboBox1.getSelectedOptions()).toEqual([]);
    expect(await comboBox2.getSelectedOptions()).toEqual(['Item 5']);
  });
});
