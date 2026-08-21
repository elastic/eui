/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiDraggableObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiDraggableObject` against the live component in EUI
 * Storybook. `WithStableTestSubjects` is a test-helpers-only fixture story
 * (added alongside this object): two draggable items with per-item
 * `data-test-subj`s that persist across a reorder — EUI's own generic
 * examples default every item to the same `data-test-subj`, which can't
 * distinguish an item's identity from its position after reordering.
 */

const ITEM_1 = 'draggableItem1';
const ITEM_2 = 'draggableItem2';

const STORY_URL = storyUrl('display-euidroppable--with-stable-test-subjects');

test.describe('EuiDraggableObject', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STORY_URL);
    await page.getByTestId(ITEM_1).waitFor({ state: 'visible' });
  });

  test.describe('reorder', () => {
    test('moves an item later by a positive step count', async ({ page }) => {
      const item1 = new EuiDraggableObject(page, ITEM_1);

      await item1.reorder(1);

      const items = page.locator('[data-rfd-draggable-id]');
      await expect(items.nth(0)).toHaveAttribute('data-test-subj', ITEM_2);
      await expect(items.nth(1)).toHaveAttribute('data-test-subj', ITEM_1);
    });

    test('moves an item earlier by a negative step count', async ({ page }) => {
      const item2 = new EuiDraggableObject(page, ITEM_2);

      await item2.reorder(-1);

      const items = page.locator('[data-rfd-draggable-id]');
      await expect(items.nth(0)).toHaveAttribute('data-test-subj', ITEM_2);
      await expect(items.nth(1)).toHaveAttribute('data-test-subj', ITEM_1);
    });

    test('the item keeps its own data-test-subj after moving', async ({ page }) => {
      const item1 = new EuiDraggableObject(page, ITEM_1);

      await item1.reorder(1);

      // Re-resolving by the original test-subj must still find exactly one
      // element — its identity, not its position, is what `data-test-subj`
      // tracks.
      await expect(page.getByTestId(ITEM_1)).toHaveCount(1);
    });

    test('rejects a disabled draggable (its handle carries no rfd attribute)', async ({
      page,
    }) => {
      await page.goto(storyUrl('display-euidraggable--playground', 'isDragDisabled:true'));
      await page.getByTestId('draggable').waitFor({ state: 'visible' });
      const disabledItem = new EuiDraggableObject(page, 'draggable');

      await expect(disabledItem.reorder(1)).rejects.toThrow(/does not/);
    });
  });
});
