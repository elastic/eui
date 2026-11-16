/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { test, expect } from '@playwright/test';

import { EuiSearchBarObject } from './object';
import { storyUrl } from '../../../storybook';

/**
 * Validates `EuiSearchBarObject` against the live component in EUI
 * Storybook. Nested args cannot be set through the URL, so the story sets
 * `box['data-test-subj']` itself. Its constant `query` prop does not reset
 * text typed into the box.
 */

const TEST_SUBJ = 'searchBarBox';

const PLAYGROUND_URL = storyUrl(
  'forms-euisearchbar-euisearchbar--with-box-test-subj'
);

/**
 * The search bar submits through the native `search` event of its input,
 * so recording that event is the observable proof of a submission. Chromium
 * dispatches it asynchronously, so assertions on it must poll.
 */
const recordSearchEvents = (searchBar: EuiSearchBarObject) =>
  searchBar.locator.evaluate((input) => {
    const submitted: string[] = [];
    input.addEventListener('search', () =>
      submitted.push((input as HTMLInputElement).value)
    );
    (window as unknown as { submitted: string[] }).submitted = submitted;
  });

const submittedQueries = (searchBar: EuiSearchBarObject) =>
  searchBar.locator.evaluate(
    () => (window as unknown as { submitted: string[] }).submitted
  );

test.describe('EuiSearchBarObject', () => {
  let searchBar: EuiSearchBarObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYGROUND_URL);
    searchBar = new EuiSearchBarObject(page, TEST_SUBJ);
    await searchBar.locator.waitFor({ state: 'visible' });
    await recordSearchEvents(searchBar);
  });

  test('resolves the search box input through the box subj', async () => {
    await expect(searchBar.locator).toHaveAttribute('type', 'search');
  });

  test('setQuery submits a query and keeps it in the box', async () => {
    await searchBar.setQuery('type:visualization');

    await expect
      .poll(() => submittedQueries(searchBar))
      .toEqual(['type:visualization']);
    expect(await searchBar.getQuery()).toBe('type:visualization');
  });

  test('clear submits an empty query and empties the box', async () => {
    await searchBar.setQuery('status:open');
    await expect
      .poll(() => submittedQueries(searchBar))
      .toEqual(['status:open']);

    await searchBar.clear();

    await expect
      .poll(() => submittedQueries(searchBar))
      .toEqual(['status:open', '']);
    expect(await searchBar.getQuery()).toBe('');
  });
});
