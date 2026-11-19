/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/forms/selection/checkboxes-and-radios/|EuiCheckbox}.
 * `*_SELECTOR` values are CSS, `*_TEST_SUBJ` values are `data-test-subj` names EUI sets itself.
 */
export const EuiCheckboxSelectors = {
  /** The `<input type="checkbox">` carrying the consumer's `data-test-subj`. */
  ROOT_SELECTOR: '.euiCheckbox__input',

  /** The wrapper around the input and the label. */
  WRAPPER_SELECTOR: '.euiCheckbox',

  /** The `<label>` next to the input, rendered only with `label`. */
  LABEL_SELECTOR: '.euiCheckbox__label',
};
