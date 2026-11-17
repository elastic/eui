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
 * Validates `EuiPaginationObject` against the live component in EUI
 * Storybook. The Playground story is stateful, starts on page index 5 of 10
 * and renders the numbered variant.
 */

const TEST_SUBJ = 'testPagination';

const PLAYGROUND_URL = storyUrl(
  'navigation-euipagination-euipagination--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiPaginationObject', () => {
  let pagination: EuiPaginationObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    pagination = new EuiPaginationObject(page, TEST_SUBJ);
    await pagination.locator.waitFor({ state: 'visible' });
  });

  test.describe('getActivePage', () => {
    test('reads the 0-based active page', async () => {
      expect(await pagination.getActivePage()).toBe(5);
    });
  });

  test.describe('getPageCount', () => {
    test('reads the total page count', async () => {
      expect(await pagination.getPageCount()).toBe(10);
    });
  });

  test.describe('goToPage', () => {
    test('clicks a rendered page button', async () => {
      await pagination.goToPage(6);

      expect(await pagination.getActivePage()).toBe(6);
    });

    test('reaches a page whose button is not rendered', async () => {
      await pagination.goToPage(0);
      // From page 0 EUI renders pages 0 to 4 plus the last page, so page 7 has no button.
      await pagination.goToPage(7);

      expect(await pagination.getActivePage()).toBe(7);
    });

    test('is a no-op on the active page', async () => {
      await pagination.goToPage(5);

      expect(await pagination.getActivePage()).toBe(5);
    });

    test('rejects an index out of range', async () => {
      await expect(pagination.goToPage(10)).rejects.toThrow(/out of range/);
    });
  });

  test.describe('next and previous', () => {
    test('step one page at a time', async () => {
      await pagination.next();
      expect(await pagination.getActivePage()).toBe(6);

      await pagination.previous();
      expect(await pagination.getActivePage()).toBe(5);
    });
  });
});
