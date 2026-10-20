/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiFieldSearchObject } from './object';
import { storyUrl } from '../../../../storybook';

/**
 * Validates `EuiFieldSearchObject` against the live component in EUI
 * Storybook. The Playground story is uncontrolled, so typed text sticks.
 */

const TEST_SUBJ = 'testFieldSearch';

const PLAYGROUND_URL = storyUrl(
  'forms-euifieldsearch--playground',
  `data-test-subj:${TEST_SUBJ}`
);

test.describe('EuiFieldSearchObject', () => {
  let fieldSearch: EuiFieldSearchObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    fieldSearch = new EuiFieldSearchObject(page, TEST_SUBJ);
    await fieldSearch.locator.waitFor({ state: 'visible' });
  });

  test.describe('setQuery', () => {
    test('replaces the text', async () => {
      await fieldSearch.setQuery('first');
      await fieldSearch.setQuery('second');

      expect(await fieldSearch.getQuery()).toBe('second');
    });
  });

  test.describe('clear', () => {
    test('empties the input', async () => {
      await fieldSearch.setQuery('something');
      await fieldSearch.clear();

      expect(await fieldSearch.getQuery()).toBe('');
    });
  });
});
