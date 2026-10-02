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
 * Validates `EuiBasicTableObject` against non-default configurations. The
 * `EmptyTable` story renders zero items with a "No users found" message —
 * EUI still renders that as a single `.euiTableRow`, so this is what proves
 * `rows` correctly excludes it instead of reporting a count of 1.
 */

const TEST_SUBJ = 'testBasicTable';

const EMPTY_TABLE_URL = storyUrl(
  'tabular-content-euibasictable--empty-table',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiBasicTableObject (empty)', () => {
  test('rows excludes the "no items found" placeholder row', async ({ page }) => {
    await page.goto(EMPTY_TABLE_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    const table = new EuiBasicTableObject(page, TEST_SUBJ);

    await expect(table.rows).toHaveCount(0);
  });
});
