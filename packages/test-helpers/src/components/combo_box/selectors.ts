/**
 * List of available stable selectors for
 * {@link https://eui.elastic.co/#/forms/combo-box|EuiComboBox}
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
   * CSS selector to find all options (currently rendered on the screen).
   *
   * Note: Because the list of options might be virtualized, when searching
   * for a specific option, type in the searched string into the search input
   * before running any assertions to ensure the option is in DOM.
   */
  OPTION: '[data-test-subj="comboBoxOptionsList"] button[role="option"]',

  /**
   * CSS selector to find all selected options (currently rendered on the screen)
   *
   * Note: Because the list of options might be virtualized, when searching
   * for a specific option, type in the searched string into the search input
   * before running any assertions to ensure the option is in DOM.
   */
  SELECTED_OPTION: '[data-test-subj="comboBoxOptionsList"] button[role="option"][aria-selected="true"]',
};
