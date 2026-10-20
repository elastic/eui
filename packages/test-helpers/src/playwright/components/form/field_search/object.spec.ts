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

/**
 * EUI calls `onSearch` from the native `search` event the input fires on
 * Enter, so recording that event is the observable proof of a submission.
 */
const recordSearchEvents = (fieldSearch: EuiFieldSearchObject) =>
  fieldSearch.locator.evaluate((input) => {
    const submitted: string[] = [];
    input.addEventListener('search', () =>
      submitted.push((input as HTMLInputElement).value)
    );
    (window as unknown as { submitted: string[] }).submitted = submitted;
  });

const submittedQueries = (fieldSearch: EuiFieldSearchObject) =>
  fieldSearch.locator.evaluate(
    () => (window as unknown as { submitted: string[] }).submitted
  );

test.describe('EuiFieldSearchObject', () => {
  let fieldSearch: EuiFieldSearchObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    fieldSearch = new EuiFieldSearchObject(page, TEST_SUBJ);
    await fieldSearch.locator.waitFor({ state: 'visible' });
    await recordSearchEvents(fieldSearch);
  });

  test('setQuery and clear each submit a search', async () => {
    await fieldSearch.setQuery('logs');
    await fieldSearch.clear();

    expect(await submittedQueries(fieldSearch)).toEqual(['logs', '']);
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

test.describe('EuiFieldSearchObject (incremental)', () => {
  test('setQuery still submits a search', async ({ page }) => {
    await page.goto(`${PLAYGROUND_URL};incremental:!true`);
    const fieldSearch = new EuiFieldSearchObject(page, TEST_SUBJ);
    await fieldSearch.locator.waitFor({ state: 'visible' });
    await recordSearchEvents(fieldSearch);

    await fieldSearch.setQuery('logs');

    expect(await submittedQueries(fieldSearch)).toEqual(['logs']);
  });
});
