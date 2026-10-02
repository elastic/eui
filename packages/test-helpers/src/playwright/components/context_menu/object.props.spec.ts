/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiContextMenuObject } from './object';
import { storyUrl } from '../../../storybook';

const TEST_SUBJ = 'testContextMenuPanel';

test.describe('EuiContextMenuObject', () => {
  test.describe('standalone EuiContextMenuPanel', () => {
    // A single panel used without the EuiContextMenu wrapper, validated
    // against its own story rather than assumed from EuiContextMenu's.
    const PANEL_URL = storyUrl(
      'navigation-euicontextmenu-euicontextmenupanel--playground',
      `data-test-subj:${TEST_SUBJ}`
    );

    test('items resolves to the panel\'s items', async ({ page }) => {
      await page.goto(PANEL_URL);
      await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
      const contextMenu = new EuiContextMenuObject(page, TEST_SUBJ);

      const expected = await page.locator('.euiContextMenuItem').count();
      expect(expected).toBeGreaterThan(0);
      await expect(contextMenu.items).toHaveCount(expected);
    });
  });
});
