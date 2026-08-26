/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiFilterButtonObject } from './object';
import { storyUrl } from '../../../storybook';

const TEST_SUBJ = 'testFilterButton';

test.describe('EuiFilterButtonObject', () => {
  test.describe('isSelected (e.g. while its popover is open)', () => {
    // Use Storybook's `!`-typed arg syntax for the booleans, not plain
    // `true`/`false` strings. A manually-declared argType with typed options
    // (as opposed to an auto-inferred boolean) can silently reject a plain
    // string and fall back to its own default, with no error to flag it.
    const SELECTED_URL = storyUrl(
      'forms-euifilterbutton--playground',
      `data-test-subj:${TEST_SUBJ};hasActiveFilters:!false;isSelected:!true`
    );

    test('carries the isSelected class, not the hasActiveFilters class', async ({ page }) => {
      await page.goto(SELECTED_URL);
      await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
      const filterButton = new EuiFilterButtonObject(page, TEST_SUBJ);

      await expect(filterButton.locator).toHaveClass(/euiFilterButton-isSelected/);
      await expect(filterButton.locator).not.toHaveClass(/euiFilterButton-hasActiveFilters/);
    });
  });
});
