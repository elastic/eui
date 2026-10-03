/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiSelectableObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiSelectableObject` against non-default props. The `WithSearch`
 * story renders a searchable selectable, exercising `search()`. `Mimas` is used
 * as the search term because it is a unique label (unlike `Titan`, which is a
 * substring of another option).
 */

const TEST_SUBJ = 'testSelectable';

const WITH_SEARCH_URL = storyUrl('forms-euiselectable--with-search', `data-test-subj:${TEST_SUBJ}`);

test.describe('EuiSelectableObject (searchable)', () => {
  let selectable: EuiSelectableObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(WITH_SEARCH_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    selectable = new EuiSelectableObject(page, TEST_SUBJ);
  });

  test.describe('search', () => {
    test('filters the options to those matching the term', async () => {
      // A label match does not resolve on a searched list (EUI injects highlight
      // markers into the accessible name), so assert on the filtered count.
      await selectable.search('Mimas');

      await expect(selectable.options).toHaveCount(1);
    });

    test('clearing the search restores the other options', async () => {
      await selectable.search('Mimas');
      await expect(selectable.options).toHaveCount(1);

      await selectable.search('');

      await expect(selectable.options.filter({ hasText: 'Titan' })).not.toHaveCount(0);
    });
  });
});
