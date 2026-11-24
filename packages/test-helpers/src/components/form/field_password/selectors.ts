/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/forms/text/password/|EuiFieldPassword}.
 * `*_SELECTOR` values are CSS, `*_TEST_SUBJ` values are `data-test-subj` names EUI sets itself.
 */
export const EuiFieldPasswordSelectors = {
  /** The `<input>` carrying the consumer's `data-test-subj`. Its `type` is `password` or `text`. */
  ROOT_SELECTOR: '.euiFieldPassword',

  /** The form control layout wrapping the input, the prepend and the append slots. */
  LAYOUT_SELECTOR: '.euiFormControlLayout',

  /** The append slot. With `type="dual"` its last button is the visibility toggle. */
  APPEND_SELECTOR: '.euiFormControlLayout__append',
};
