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

const TEST_SUBJ = 'testContextMenu';

const PLAYGROUND_URL = storyUrl('navigation-euicontextmenu-euicontextmenu--playground', `data-test-subj:${TEST_SUBJ}`);

test.describe('EuiContextMenuObject', () => {
  let contextMenu: EuiContextMenuObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    contextMenu = new EuiContextMenuObject(page, TEST_SUBJ);
  });

  test.describe('items', () => {
    test('resolves to the current panel\'s items', async () => {
      await expect(contextMenu.items.filter({ hasText: 'Handle an onClick' })).toHaveCount(1);
    });

    test('resolves to only the new panel\'s items after navigating, not both during the transition', async () => {
      await contextMenu.items.filter({ hasText: 'Nest panels' }).click();

      await expect(contextMenu.items.filter({ hasText: 'PDF reports' })).toHaveCount(1);
      await expect(contextMenu.items.filter({ hasText: 'Handle an onClick' })).toHaveCount(0);
    });
  });
});
