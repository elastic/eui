/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiTreeViewObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiTreeViewObject` against the live component in EUI Storybook.
 * The Playground story has two top level nodes, the first expanded with
 * nested children, so it covers the direct child scoping of `items`.
 */

const TEST_SUBJ = 'testTreeView';

const PLAYGROUND_URL = storyUrl(
  'navigation-euitreeview-euitreeview--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiTreeViewObject', () => {
  let treeView: EuiTreeViewObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    treeView = new EuiTreeViewObject(page, TEST_SUBJ);
  });

  test('items returns only this level, not nested nodes', async () => {
    const allNodes = treeView.locator.locator('.euiTreeView__nodeInner');
    const topLevel = treeView.items;

    await expect(topLevel).toHaveCount(2);
    expect(await allNodes.count()).toBeGreaterThan(2);
  });

  test('items reflect expanded state through aria-expanded', async () => {
    const first = treeView.items.first();

    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await first.click();
    await expect(first).toHaveAttribute('aria-expanded', 'false');
  });
});
