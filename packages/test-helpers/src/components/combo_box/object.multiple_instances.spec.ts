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
 * Validates that `EuiComboBoxObject` correctly scopes all locators when
 * multiple EuiComboBox instances coexist on the same page.
 *
 * Kept in a separate spec so Playwright can run this and `object.spec.ts`
 * in parallel workers.
 */

test.describe('EuiComboBoxObject — multiple instances', () => {
  let combo1: EuiComboBoxObject;
  let combo2: EuiComboBoxObject;

  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=forms-euicombobox--multiple-instances');
    combo1 = new EuiComboBoxObject(page, 'combo1');
    combo2 = new EuiComboBoxObject(page, 'combo2');
    await combo1.clear();
    await combo2.clear();
  });

  test('two combo boxes on the same page are operated independently', async () => {
    // Distinct labels + reverse order so a regression that mis-routed a
    // selection across combos would surface.
    await combo2.setSelectedOptions(['Item 5']);
    await combo1.setSelectedOptions(['Item 2']);

    expect(await combo1.getSelectedOptions()).toEqual(['Item 2']);
    expect(await combo2.getSelectedOptions()).toEqual(['Item 5']);

    // Clearing combo1 must not affect combo2 — guards the `clearButton`
    // getter against a page-level scoping regression.
    await combo1.clear();
    expect(await combo1.getSelectedOptions()).toEqual([]);
    expect(await combo2.getSelectedOptions()).toEqual(['Item 5']);
  });
});
