/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiTableObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiTableObject` against the live component in EUI Storybook.
 * The Playground story renders 3 header cells, 20 body rows and a footer row.
 * `data-test-subj` is injected via Storybook's `args` URL parameter onto
 * the `<table>`.
 */

const TEST_SUBJ = 'testTable';

const PLAYGROUND_URL = storyUrl(
  'tabular-content-euitable-euitable--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiTableObject', () => {
  let table: EuiTableObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    table = new EuiTableObject(page, TEST_SUBJ);
    await table.locator.waitFor({ state: 'visible' });
  });

  test.describe('rows', () => {
    test('exposes the body rows only, not the header or footer row', async () => {
      await expect(table.rows).toHaveCount(20);
    });
  });

  test.describe('headerCells', () => {
    test('exposes the header cells in column order', async () => {
      await expect(table.headerCells).toHaveCount(3);
      await expect(table.headerCells.first()).toHaveText('Column 1');
    });
  });

  test.describe('column', () => {
    test('reads one column across every row', async () => {
      const column = table.column(1);

      await expect(column).toHaveCount(20);
      await expect(column.first()).toHaveText('Row 1, Cell 2');
      await expect(column.last()).toHaveText('Row 20, Cell 2');
    });
  });

  test.describe('cell', () => {
    test('reads one cell by row and column position', async () => {
      await expect(table.cell(2, 0)).toHaveText('Row 3, Cell 1');
    });
  });
});
