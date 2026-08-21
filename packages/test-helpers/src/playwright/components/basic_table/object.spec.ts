/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiBasicTableObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiBasicTableObject` against the live component in EUI Storybook.
 * The Playground story renders a selection checkbox column, several
 * field-data columns, and paginates at 3 rows per page — exercising the
 * checkbox-offset column resolution and confirming `rows` reflects only the
 * current page. `data-test-subj` is injected via Storybook's `args` URL
 * parameter onto the `.euiBasicTable` root.
 */

const TEST_SUBJ = 'testBasicTable';

const PLAYGROUND_URL = storyUrl(
  'tabular-content-euibasictable--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiBasicTableObject', () => {
  let table: EuiBasicTableObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    table = new EuiBasicTableObject(page, TEST_SUBJ);
  });

  test.describe('rows', () => {
    test('exposes only the current page of data rows', async () => {
      // Playground paginates at 3 rows per page.
      await expect(table.rows).toHaveCount(3);
    });
  });

  test.describe('cells', () => {
    test('reads a field-data column past the leading selection checkbox', async () => {
      const cells = await table.cells('firstName');

      await expect(cells).toHaveCount(3);
    });

    test('reads a different field-data column correctly (not off-by-one)', async () => {
      const firstNameCells = await table.cells('firstName');
      const lastNameCells = await table.cells('lastName');

      const [firstNames, lastNames] = await Promise.all([
        firstNameCells.allTextContents(),
        lastNameCells.allTextContents(),
      ]);

      expect(firstNames).not.toEqual(lastNames);
    });

    test('rejects an unknown field', async () => {
      await expect(table.cells('doesNotExist')).rejects.toThrow(/no column with field/);
    });
  });
});
