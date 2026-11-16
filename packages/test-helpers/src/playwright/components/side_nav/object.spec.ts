/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiSideNavObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiSideNavObject` against the live component in EUI Storybook.
 * The Playground story has four root items. "Trunk 1" is an accordion item
 * that starts closed, and a deep branch under "Trunk 2" is selected.
 */

const TEST_SUBJ = 'testSideNav';

const PLAYGROUND_URL = storyUrl(
  'navigation-euisidenav--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiSideNavObject', () => {
  let sideNav: EuiSideNavObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    sideNav = new EuiSideNavObject(page, TEST_SUBJ);
    await sideNav.locator.waitFor({ state: 'visible' });
  });

  test.describe('getItems', () => {
    test('lists rendered items only, closed branches are absent', async () => {
      const items = await sideNav.getItems();

      expect(items).toContain('Root item with carets');
      expect(items).toContain('Trunk 1');
      expect(items).not.toContain('Emphasized branch');
    });
  });

  test.describe('item', () => {
    test('matches the exact label, not a label that contains it', async () => {
      await expect(sideNav.item('Trunk 2')).toHaveCount(1);
      await expect(sideNav.item('Trunk')).toHaveCount(0);
    });
  });

  test.describe('getSelected', () => {
    test('reads the selected item', async () => {
      expect(await sideNav.getSelected()).toBe(
        'All parents are open because this branch is selected'
      );
    });
  });

  test.describe('expand', () => {
    test('opens an accordion item and renders its children', async () => {
      await sideNav.expand('Trunk 1');

      await expect(sideNav.item('Emphasized branch')).toBeVisible();
    });

    test('is a no-op on an open item', async () => {
      await sideNav.expand('Trunk 1');
      await sideNav.expand('Trunk 1');

      await expect(sideNav.item('Emphasized branch')).toBeVisible();
    });
  });

  test.describe('select', () => {
    test('clicks the item', async () => {
      await sideNav.expand('Trunk 1');
      await sideNav.expand('Emphasized branch');

      await sideNav.select('Yet another branch');

      await expect(sideNav.item('Yet another branch')).toBeFocused();
    });
  });
});
