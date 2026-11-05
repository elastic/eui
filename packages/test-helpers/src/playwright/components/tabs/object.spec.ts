/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiTabsObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiTabsObject` against the live component in EUI Storybook.
 * The Playground story is stateful with three tabs and the first selected.
 */

const TEST_SUBJ = 'testTabs';

const PLAYGROUND_URL = storyUrl(
  'navigation-euitabs-euitabs--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiTabsObject', () => {
  let tabs: EuiTabsObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    tabs = new EuiTabsObject(page, TEST_SUBJ);
    await tabs.locator.waitFor({ state: 'visible' });
  });

  test.describe('tabs and getTabs', () => {
    test('list the tabs in order', async () => {
      await expect(tabs.tabs).toHaveCount(3);
      expect(await tabs.getTabs()).toEqual(['Tab 1', 'Tab 2', 'Tab 3']);
    });
  });

  test.describe('tab', () => {
    test('matches the exact label only', async () => {
      await expect(tabs.tab('Tab 2')).toHaveCount(1);
      await expect(tabs.tab('Tab')).toHaveCount(0);
    });
  });

  test.describe('select and getSelected', () => {
    test('select a tab and read it back', async () => {
      expect(await tabs.getSelected()).toBe('Tab 1');

      await tabs.select('Tab 3');

      expect(await tabs.getSelected()).toBe('Tab 3');
    });
  });
});
