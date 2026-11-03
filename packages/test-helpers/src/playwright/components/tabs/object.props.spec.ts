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
 * Validates `EuiTabsObject` against `EuiTabbedContent`, where the consumer's
 * subj lands on a wrapper that holds the tab list and the selected panel.
 */

const TEST_SUBJ = 'testTabbedContent';

test.describe('EuiTabsObject (EuiTabbedContent)', () => {
  let tabs: EuiTabsObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(
      storyUrl(
        'navigation-euitabbedcontent--playground',
        `data-test-subj:${TEST_SUBJ}`
      )
    );
    tabs = new EuiTabsObject(page, TEST_SUBJ);
    await tabs.locator.waitFor({ state: 'visible' });
  });

  test('resolves the wrapper and reads only the tab list', async () => {
    await expect(tabs.locator).toHaveAttribute('data-test-subj', TEST_SUBJ);
    expect(await tabs.getTabs()).toEqual(['Tab 1', 'Tab 2', 'Tab 3']);
  });

  test('select switches the tab and the panel', async ({ page }) => {
    await tabs.select('Tab 2');

    expect(await tabs.getSelected()).toBe('Tab 2');
    const tabId = (await tabs.tab('Tab 2').getAttribute('id')) ?? '';
    await expect(page.getByRole('tabpanel')).toHaveAttribute(
      'aria-labelledby',
      tabId
    );
  });
});
