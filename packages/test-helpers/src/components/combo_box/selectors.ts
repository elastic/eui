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
   * `data-test-subj` identifier of the outer (main) element
   */
  TEST_SUBJ: 'comboBoxInput',

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
   * `data-test-subj` identifier of all selected options (pills)
   */
  SELECTED_OPTIONS_TEST_SUBJ: 'euiComboBoxPill',

  /**
   * CSS selector for options in a specific combo box's dropdown — all
   * options if `label` is omitted, or the option matching that label.
   *
   * `testSubj` is the consumer's `data-test-subj` on `<EuiComboBox>`. EUI
   * propagates this to the options list as `${testSubj}-optionsList`,
   * letting us disambiguate when multiple combo boxes coexist on one page.
   *
   * `title` is set by EUI to the exact label string and avoids
   * accessible-name mismatches caused by option icons.
   *
   * Note: the list may be virtualized — type the search string into the
   * input before asserting on a specific option to ensure it is in DOM.
   */
  optionFor: (testSubj: string, label?: string): string => {
    const base = `[data-test-subj~="${testSubj}-optionsList"] button[role="option"]`;
    return label ? `${base}[title="${label}"]` : base;
  },

  /**
   * CSS selector for selected options in a specific combo box's dropdown —
   * all selected if `label` is omitted, or the selected option matching
   * that label. See `optionFor` for `testSubj` and `title` rationale.
   */
  selectedOptionFor: (testSubj: string, label?: string): string => {
    const base = `[data-test-subj~="${testSubj}-optionsList"] button[role="option"][aria-selected="true"]`;
    return label ? `${base}[title="${label}"]` : base;
  },
};
