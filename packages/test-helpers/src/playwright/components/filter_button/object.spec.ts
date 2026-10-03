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

/**
 * Validates `EuiFilterButtonObject` against the live component in EUI
 * Storybook. The Playground story renders a single `EuiFilterButton` with
 * `hasActiveFilters`, `numFilters` and a `chevronSingleDown` icon by default.
 * `data-test-subj` is injected via Storybook's `args` URL parameter, landing
 * on the button itself.
 */

const TEST_SUBJ = 'testFilterButton';

const PLAYGROUND_URL = storyUrl('forms-euifilterbutton--playground', `data-test-subj:${TEST_SUBJ}`);

test.describe('EuiFilterButtonObject', () => {
  let filterButton: EuiFilterButtonObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    filterButton = new EuiFilterButtonObject(page, TEST_SUBJ);
  });

  test.describe('locator', () => {
    test('carries the hasActiveFilters class the Playground story sets', async () => {
      await expect(filterButton.locator).toHaveClass(/euiFilterButton-hasActiveFilters/);
    });
  });

  test.describe('notificationBadge', () => {
    test('shows the numFilters count the Playground story sets', async () => {
      await expect(filterButton.notificationBadge).toHaveText('5');
    });
  });
});
