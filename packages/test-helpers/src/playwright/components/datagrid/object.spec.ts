/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiDataGridObject } from './object';
import { EuiDataGridSelectors } from '../../../components/datagrid/selectors';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiDataGridObject` against the live component in EUI Storybook.
 * The Playground story renders 3 columns (`name`, `email`, `account`) and
 * 10 rows; `data-test-subj` is injected via Storybook's `args` URL parameter
 * onto the `.euiDataGrid` element itself, matching the component-type guard.
 */

const TEST_SUBJ = 'testDataGrid';

const PLAYGROUND_URL = storyUrl(
  'tabular-content-euidatagrid--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiDataGridObject', () => {
  let dataGrid: EuiDataGridObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    dataGrid = new EuiDataGridObject(page, TEST_SUBJ);
  });

  test.describe('rows', () => {
    test('counts the rendered rows', async () => {
      await expect(dataGrid.rows).toHaveCount(10);
    });
  });

  test.describe('cell', () => {
    test('locates a cell by row index and column id', async () => {
      await expect(dataGrid.cell(0, 'name')).toBeVisible();
      await expect(dataGrid.cell(0, 'name')).not.toHaveText('');
    });
  });

  test.describe('cells', () => {
    test('locates every rendered cell of a column', async () => {
      await expect(dataGrid.cells('name')).toHaveCount(10);
    });

    test('excludes the column header cell', async () => {
      const headerText = await dataGrid.locator
        .locator(EuiDataGridSelectors.headerCellFor('name'))
        .innerText();
      const cellTexts = await dataGrid.cells('name').allInnerTexts();
      expect(cellTexts).not.toContain(headerText);
    });
  });

  test.describe('doActionOnColumn', () => {
    test('hides a column via its header actions', async () => {
      await expect(dataGrid.cells('email')).toHaveCount(10);

      await dataGrid.doActionOnColumn('email', 'Hide column');

      await expect(dataGrid.cells('email')).toHaveCount(0);
    });
  });

  test.describe('fullscreen', () => {
    test('enters and exits fullscreen mode', async ({ page }) => {
      await dataGrid.openFullScreenMode();
      await expect(
        page.locator(EuiDataGridSelectors.FULL_SCREEN_ROOT_SELECTOR)
      ).toBeVisible();
      // The grid keeps its rows across the mode change.
      await expect(dataGrid.rows).toHaveCount(10);

      await dataGrid.closeFullScreenMode();
      await expect(
        page.locator(EuiDataGridSelectors.FULL_SCREEN_ROOT_SELECTOR)
      ).toHaveCount(0);
      await expect(dataGrid.rows).toHaveCount(10);
    });
  });
});
