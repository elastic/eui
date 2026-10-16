/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import { test, expect } from '@playwright/test';

import { EuiPaginationObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiPaginationObject` against the compressed variant, which
 * renders "page of total" text and arrows instead of numbered buttons.
 */

const TEST_SUBJ = 'testPagination';

test.describe('EuiPaginationObject (compressed)', () => {
  let pagination: EuiPaginationObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(
      storyUrl(
        'navigation-euipagination-euipagination--playground',
        `data-test-subj:${TEST_SUBJ};compressed:!true`
      )
    );
    pagination = new EuiPaginationObject(page, TEST_SUBJ);
    await pagination.locator.waitFor({ state: 'visible' });
  });

  test('reads the active page and page count from the text', async () => {
    expect(await pagination.getActivePage()).toBe(5);
    expect(await pagination.getPageCount()).toBe(10);
  });

  test('goToPage steps through the arrows', async () => {
    await pagination.goToPage(8);

    expect(await pagination.getActivePage()).toBe(8);
  });

  test('next and previous step one page at a time', async () => {
    await pagination.next();
    expect(await pagination.getActivePage()).toBe(6);

    await pagination.previous();
    expect(await pagination.getActivePage()).toBe(5);
  });
});
