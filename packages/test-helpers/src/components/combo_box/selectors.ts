/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * List of available stable selectors for
 * {@link https://eui.elastic.co/docs/components/forms/selection/combo-box/|EuiComboBox}
 */
export const EuiComboBoxSelectors = {
  /**
   * `data-test-subj` identifier of the inner input wrapper element
   */
  INPUT_WRAPPER_TEST_SUBJ: 'comboBoxInput',

  /**
   * `data-test-subj` identifier of the search input field
   */
  SEARCH_INPUT_TEST_SUBJ: 'comboBoxSearchInput',

  /**
   * `data-test-subj` identifier of the options list
   */
  OPTIONS_LIST_TEST_SUBJ: 'comboBoxOptionsList',

  /**
   * `data-test-subj` identifier of the options list toggle button
   */
  OPTIONS_LIST_TOGGLE_BUTTON_TEST_SUBJ: 'comboBoxToggleListButton',

  /**
   * `data-test-subj` identifier of the clear button
   */
  CLEAR_BUTTON_TEST_SUBJ: 'comboBoxClearButton',

  /**
   * CSS selector for the input wrapper in `singleSelection={{ asPlainText: true }}` mode.
   * Present when the combo renders the selection inside the input instead of as pills.
   */
  PLAIN_TEXT_INPUT_WRAP_SELECTOR: '.euiComboBox__inputWrap--plainText',

  /**
   * `data-test-subj` identifier of selected option pills.
   * Only present in non-`asPlainText` mode — in `asPlainText` mode the
   * selection is shown inside the input, not as pills.
   */
  PILL_TEST_SUBJ: 'euiComboBoxPill',

  /**
   * CSS selector for all options in a specific combo box's dropdown.
   *
   * `testSubj` is the consumer's `data-test-subj` on `<EuiComboBox>`. EUI
   * propagates this to the options list as `${testSubj}-optionsList`,
   * letting us disambiguate when multiple combo boxes coexist on one page.
   *
   * To target a specific option by label, compose with Playwright's
   * `getByTitle` to avoid CSS-injection issues with labels that contain
   * special characters (`"`, `]`, `\`):
   *
   * ```ts
   * page
   *   .locator(EuiComboBoxSelectors.optionFor(testSubj))
   *   .and(page.getByTitle(label, { exact: true }))
   * ```
   *
   * Note: the list may be virtualized — type the search string into the
   * input before asserting on a specific option to ensure it is in DOM.
   */
  optionFor: (testSubj: string): string =>
    `[data-test-subj~="${testSubj}-optionsList"] [role="option"]`,

  /**
   * CSS selector for all selected options in a specific combo box's dropdown.
   * See `optionFor` for `testSubj` rationale and label-targeting guidance.
   */
  selectedOptionFor: (testSubj: string): string =>
    `[data-test-subj~="${testSubj}-optionsList"] [role="option"][aria-selected="true"]`,

  /**
   * CSS selector for a specific combo box's options list container (the
   * dropdown portal). Matches whether the list has regular options or an
   * empty-state entry (e.g. "Add X as a custom option" for `onCreateOption`).
   *
   * Use this when you only need to wait for the dropdown to open, not when
   * you need to target a specific option inside it.
   */
  optionsListFor: (testSubj: string): string =>
    `[data-test-subj~="${testSubj}-optionsList"]`,
};
