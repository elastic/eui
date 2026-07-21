/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/forms/selection/combo-box/|EuiComboBox}.
 * `*_SELECTOR` values are CSS; `*_TEST_SUBJ` values are `data-test-subj` names.
 */
export const EuiComboBoxSelectors = {
  /** Root element (outer `.euiComboBox` wrapper carrying the consumer's `data-test-subj`). */
  ROOT_SELECTOR: '.euiComboBox',

  /** Inner input wrapper. */
  INPUT_WRAPPER_TEST_SUBJ: 'comboBoxInput',

  /** Search input field. */
  SEARCH_INPUT_TEST_SUBJ: 'comboBoxSearchInput',

  /** Options list. */
  OPTIONS_LIST_TEST_SUBJ: 'comboBoxOptionsList',

  /** Options list toggle button. */
  OPTIONS_LIST_TOGGLE_BUTTON_TEST_SUBJ: 'comboBoxToggleListButton',

  /** Clear button. */
  CLEAR_BUTTON_TEST_SUBJ: 'comboBoxClearButton',

  /** Input wrapper in `singleSelection={{ asPlainText: true }}` mode (no pills). */
  PLAIN_TEXT_INPUT_WRAP_SELECTOR: '.euiComboBox__inputWrap--plainText',

  /**
   * Selected option pills. Read by class, not `data-test-subj`: EUI spreads an
   * option's own `data-test-subj` onto its pill after the `euiComboBoxPill`
   * default, so a per-option subj would override it; the class always holds.
   */
  PILL_SELECTOR: '.euiComboBoxPill',

  /**
   * Options in a specific combo's dropdown. EUI propagates the consumer's
   * `data-test-subj` to the list as `${testSubj}-optionsList`, so this scopes to
   * one combo when several coexist. The list may be virtualized — type to filter
   * before asserting on a specific option.
   */
  optionFor: (testSubj: string): string =>
    `[data-test-subj~="${testSubj}-optionsList"] [role="option"]`,

  /** Selected options in a specific combo's dropdown (see `optionFor`). */
  selectedOptionFor: (testSubj: string): string =>
    `[data-test-subj~="${testSubj}-optionsList"] [role="option"][aria-selected="true"]`,

  /** A specific combo's options list container (the dropdown portal). */
  optionsListFor: (testSubj: string): string =>
    `[data-test-subj~="${testSubj}-optionsList"]`,
};
