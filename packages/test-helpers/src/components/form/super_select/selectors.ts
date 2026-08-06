/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/forms/selection/super-select/|EuiSuperSelect}.
 * `*_SELECTOR` values are CSS.
 */
export const EuiSuperSelectSelectors = {
  /**
   * Root element (the control `<button>` carrying the consumer's
   * `data-test-subj` — EUI spreads rest props onto it).
   */
  ROOT_SELECTOR: '.euiSuperSelectControl',

  /**
   * The popover wrapper around the control. The hidden form input holding the
   * committed value is a sibling of the button inside it.
   */
  WRAPPER_SELECTOR: '.euiSuperSelect',

  /**
   * The options listbox. It renders in a popover portal, but EUI keeps at most
   * one super-select dropdown open at a time, so a page-level lookup is safe.
   */
  LISTBOX_SELECTOR: '.euiSuperSelect__listbox[role="listbox"]',

  /** The hidden form input holding the committed `value`. */
  HIDDEN_INPUT_SELECTOR: 'input[type="hidden"]',

  /**
   * An option addressed by its `value` — EUI renders every option with
   * `id={String(value)}`.
   */
  optionByValue: (value: string): string => `[role="option"][id="${value}"]`,
};
