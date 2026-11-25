/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/forms/selection/radio-and-radio-group/|EuiRadioGroup}.
 * `*_SELECTOR` values are CSS, `*_TEST_SUBJ` values are `data-test-subj` names EUI sets itself.
 */
export const EuiRadioGroupSelectors = {
  /** The group wrapper carrying the consumer's `data-test-subj`, a `<div>` or a `<fieldset>` with `legend`. */
  ROOT_SELECTOR: '.euiRadioGroup',

  /** One radio in the group, the wrapper around its input and label. */
  ITEM_SELECTOR: '.euiRadioGroup__item',

  /** The `<input type="radio">` of an item. */
  INPUT_SELECTOR: '.euiRadio__input',

  /** The `<label>` of an item. */
  LABEL_SELECTOR: '.euiRadio__label',
};
