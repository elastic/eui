/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

import { EuiComboBoxObject } from './object';
import { EuiComboBoxSelectors } from './selectors';

/**
 * Validates `EuiComboBoxObject` against non-default EuiComboBox prop
 * configurations that change the DOM structure or interaction model.
 *
 * Kept in a separate spec so Playwright runs it in a parallel worker and
 * each describe block can navigate to its own Storybook URL without
 * interfering with the default-config tests in `object.spec.ts`.
 */

const TEST_SUBJ = 'testComboBox';

const playgroundUrl = (extraArgs: string) =>
  `/iframe.html?id=forms-euicombobox--playground&viewMode=story&args=data-test-subj:${TEST_SUBJ};${extraArgs}`;

const PLAIN_TEXT_STORY_URL = `/iframe.html?id=forms-euicombobox--as-plain-text&viewMode=story`;
const ON_CREATE_OPTION_STORY_URL = `/iframe.html?id=forms-euicombobox--with-on-create-option&viewMode=story&args=data-test-subj:${TEST_SUBJ}`;

// ---------------------------------------------------------------------------
// singleSelection={true}  — one pill, no multi-select
// ---------------------------------------------------------------------------

test.describe('EuiComboBoxObject — singleSelection=true', () => {
  let combo: EuiComboBoxObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(playgroundUrl('singleSelection:true'));
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    combo = new EuiComboBoxObject(page, TEST_SUBJ);
    await combo.clear();
  });

  test('setSelectedOptions selects a single option', async () => {
    await combo.setSelectedOptions(['Item 2']);

    expect(await combo.getSelectedOptions()).toEqual(['Item 2']);
  });

  test('setSelectedOptions replaces the existing single selection', async () => {
    await combo.setSelectedOptions(['Item 2']);
    await combo.setSelectedOptions(['Item 3']);

    expect(await combo.getSelectedOptions()).toEqual(['Item 3']);
  });

  test('clear removes the single selection', async () => {
    await combo.setSelectedOptions(['Item 2']);
    await combo.clear();

    expect(await combo.getSelectedOptions()).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// singleSelection={{ asPlainText: true }}  — selection in input, no pills
// ---------------------------------------------------------------------------

test.describe('EuiComboBoxObject — singleSelection=asPlainText', () => {
  let combo: EuiComboBoxObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(PLAIN_TEXT_STORY_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    combo = new EuiComboBoxObject(page, TEST_SUBJ);
    await combo.clear();
  });

  test('getSelectedOptions reads the input value when no pills are rendered', async () => {
    await combo.setSelectedOptions(['Item 2']);

    // asPlainText renders no pills — the input value IS the selection.
    expect(await combo.getSelectedOptions()).toEqual(['Item 2']);
  });

  test('setSelectedOptions replaces the existing plain-text selection', async () => {
    await combo.setSelectedOptions(['Item 2']);
    await combo.setSelectedOptions(['Item 3']);

    expect(await combo.getSelectedOptions()).toEqual(['Item 3']);
  });

  test('clear removes the plain-text selection', async () => {
    await combo.setSelectedOptions(['Item 2']);
    await combo.clear();

    expect(await combo.getSelectedOptions()).toEqual([]);
  });

  test('getSelectedOptions returns [] when nothing is selected', async () => {
    expect(await combo.getSelectedOptions()).toEqual([]);
  });

  test('getSelectedOptions returns [] when text is typed but not confirmed', async ({
    page,
  }) => {
    await page
      .getByTestId(EuiComboBoxSelectors.SEARCH_INPUT_TEST_SUBJ)
      .pressSequentially('NonExistent');
    // Close the dropdown via the toggle button. This sets isListOpen=false while
    // keeping hasFocus=true (focus stays inside the combo), which is enough for
    // EUI's markAsInvalid condition to fire — no Escape needed.
    await page
      .getByTestId(EuiComboBoxSelectors.OPTIONS_LIST_TOGGLE_BUTTON_TEST_SUBJ)
      .click();
    await expect
      .poll(() => combo.getSelectedOptions(), {
        message:
          'EuiComboBox: getSelectedOptions should return [] for unconfirmed typed text',
      })
      .toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// isClearable={false}  — no clear button in the DOM
// ---------------------------------------------------------------------------

test.describe('EuiComboBoxObject — isClearable=false', () => {
  let combo: EuiComboBoxObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(playgroundUrl('isClearable:!false'));
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    combo = new EuiComboBoxObject(page, TEST_SUBJ);
    await combo.clear();
  });

  test('clear removes the selection', async () => {
    await combo.setSelectedOptions(['Item 2']);
    await combo.clear();

    expect(await combo.getSelectedOptions()).toEqual([]);
  });

  test('setSelectedOptions replaces the existing selection', async () => {
    await combo.setSelectedOptions(['Item 2']);
    await combo.setSelectedOptions(['Item 3']);

    expect(await combo.getSelectedOptions()).toEqual(['Item 3']);
  });
});

// ---------------------------------------------------------------------------
// singleSelection={{ asPlainText: true }} + isClearable={false}
// — no pills, no clear button; input IS the only selection indicator
// ---------------------------------------------------------------------------

test.describe('EuiComboBoxObject — singleSelection=asPlainText + isClearable=false', () => {
  let combo: EuiComboBoxObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(`${PLAIN_TEXT_STORY_URL}&args=isClearable:!false`);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    combo = new EuiComboBoxObject(page, TEST_SUBJ);
    await combo.clear();
  });

  test('getSelectedOptions returns [] when nothing is selected', async () => {
    expect(await combo.getSelectedOptions()).toEqual([]);
  });

  test('getSelectedOptions returns the selected value', async () => {
    await combo.setSelectedOptions(['Item 2']);

    expect(await combo.getSelectedOptions()).toEqual(['Item 2']);
  });

  test('setSelectedOptions selects an option', async () => {
    await combo.setSelectedOptions(['Item 2']);

    expect(await combo.getSelectedOptions()).toEqual(['Item 2']);
  });

  test('setSelectedOptions replaces the existing selection', async () => {
    await combo.setSelectedOptions(['Item 2']);
    await combo.setSelectedOptions(['Item 3']);

    expect(await combo.getSelectedOptions()).toEqual(['Item 3']);
  });

  test('setSelectedOptions is a no-op when the selection already matches', async () => {
    await combo.setSelectedOptions(['Item 2']);
    await combo.setSelectedOptions(['Item 2']);

    expect(await combo.getSelectedOptions()).toEqual(['Item 2']);
  });

  test('clear removes the selection', async () => {
    await combo.setSelectedOptions(['Item 2']);
    await combo.clear();

    expect(await combo.getSelectedOptions()).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// onCreateOption — created options appear as pills (not in the options array);
// clear() must use clickPillClearButtons, not deselectAllFromDropdown
// ---------------------------------------------------------------------------

test.describe('EuiComboBoxObject — onCreateOption', () => {
  let combo: EuiComboBoxObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(ON_CREATE_OPTION_STORY_URL);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    combo = new EuiComboBoxObject(page, TEST_SUBJ);
    await combo.clear();
  });

  test('getSelectedOptions returns the created option label', async ({
    page,
  }) => {
    await createCustomOption(page, TEST_SUBJ, 'Brand new');

    expect(await combo.getSelectedOptions()).toContain('Brand new');
  });

  test('clear removes a created option', async ({ page }) => {
    await createCustomOption(page, TEST_SUBJ, 'Brand new');
    await combo.clear();

    expect(await combo.getSelectedOptions()).toEqual([]);
  });

  test('setSelectedOptions replaces a created option with a regular one', async ({
    page,
  }) => {
    await createCustomOption(page, TEST_SUBJ, 'Brand new');
    await combo.setSelectedOptions(['Item 3']);

    expect(await combo.getSelectedOptions()).toEqual(['Item 3']);
  });
});

// ---------------------------------------------------------------------------
// onCreateOption + asPlainText — created option lives in the input;
// clear() must use deleteSearchInput (Backspace), not deselectAllFromDropdown
// ---------------------------------------------------------------------------

test.describe('EuiComboBoxObject — onCreateOption + asPlainText', () => {
  let combo: EuiComboBoxObject;

  test.beforeEach(async ({ page }) => {
    await page.goto(`${PLAIN_TEXT_STORY_URL}&args=onCreateOption:!true`);
    await page.getByTestId(TEST_SUBJ).waitFor({ state: 'visible' });
    combo = new EuiComboBoxObject(page, TEST_SUBJ);
  });

  test('getSelectedOptions returns the created option label', async ({
    page,
  }) => {
    await createCustomOption(page, TEST_SUBJ, 'Brand new');

    expect(await combo.getSelectedOptions()).toEqual(['Brand new']);
  });

  test('clear removes a created option', async ({ page }) => {
    await createCustomOption(page, TEST_SUBJ, 'Brand new');
    await combo.clear();

    expect(await combo.getSelectedOptions()).toEqual([]);
  });

  test('setSelectedOptions replaces a created option with a regular one', async ({
    page,
  }) => {
    await createCustomOption(page, TEST_SUBJ, 'Brand new');
    await combo.setSelectedOptions(['Item 3']);

    expect(await combo.getSelectedOptions()).toEqual(['Item 3']);
  });
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Types a value not present in the options list and presses Enter to confirm
 * it as a custom selection. EUI renders an "Add X as a custom option" message
 * (not a `role="option"` element) when no options match — so Enter is the
 * correct interaction, not a locator click.
 */
async function createCustomOption(
  page: Page,
  testSubj: string,
  label: string
): Promise<void> {
  await page
    .getByTestId(EuiComboBoxSelectors.SEARCH_INPUT_TEST_SUBJ)
    .fill(label);
  // Wait for the options list portal to open before pressing Enter.
  await page
    .locator(EuiComboBoxSelectors.optionsListFor(testSubj))
    .waitFor({ state: 'visible' });
  await page
    .getByTestId(EuiComboBoxSelectors.SEARCH_INPUT_TEST_SUBJ)
    .press('Enter');
}
