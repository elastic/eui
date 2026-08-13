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
 * Validates `EuiSelectableObject` against the live component in EUI Storybook.
 * The Playground story is a multi-select list (not searchable) with `Mimas`
 * checked and `Enceladus is disabled` disabled. The list is virtualized, so the
 * specs assert on specific options rather than an exact total. `data-test-subj`
 * is injected via Storybook's `args` URL parameter onto the `.euiSelectable`
 * root.
 */

const TEST_SUBJ = 'testSelectable';

const PLAYGROUND_URL = storyUrl('forms-euiselectable--playground', `data-test-subj:${TEST_SUBJ}`);

test.describe('EuiSelectableObject', () => {
  let selectable: EuiSelectableObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    selectable = new EuiSelectableObject(page, TEST_SUBJ);
  });

  test.describe('options', () => {
    test('exposes the rendered options', async () => {
      await expect(selectable.options).not.toHaveCount(0);
    });
  });

  test.describe('selectOption', () => {
    test('locates an option by its exact label and checks it', async () => {
      await selectable.selectOption('Dione');

      await expect(selectable.options.filter({ hasText: 'Dione' })).toHaveAttribute(
        'aria-checked',
        'true'
      );
    });

    test('does not match on a label that is a substring of another option', async () => {
      // "Titan" is a substring of the "...Titaness..." option's label; selecting it
      // should not touch the longer option.
      await selectable.selectOption('Titan');

      await expect(
        selectable.options.filter({ hasText: 'Titaness' })
      ).not.toHaveAttribute('aria-checked', 'true');
    });

    test('does not match an option whose label merely starts with the same words', async () => {
      // "Enceladus" is a whitespace-delimited prefix of "Enceladus is disabled", which
      // is also disabled — selecting the shorter label must throw, not silently no-op
      // on the disabled option.
      await expect(selectable.selectOption('Enceladus')).rejects.toThrow();
    });

    test('is a no-op when the option is already checked', async () => {
      await selectable.selectOption('Mimas');

      await expect(selectable.options.filter({ hasText: 'Mimas' })).toHaveAttribute(
        'aria-checked',
        'true'
      );
    });
  });
});
