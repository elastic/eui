/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/forms/layouts/row/|EuiFormRow}.
 * `*_SELECTOR` values are CSS, `*_TEST_SUBJ` values are `data-test-subj` names EUI sets itself.
 */
export const EuiFormRowSelectors = {
  /** The row element carrying the consumer's `data-test-subj`. */
  ROOT_SELECTOR: '.euiFormRow',

  /** The wrapper around the label, rendered only with `label`. */
  LABEL_WRAPPER_SELECTOR: '.euiFormRow__labelWrapper',

  /** The label, rendered only with `label`. */
  LABEL_SELECTOR: '.euiFormRow__label',

  /** The text next to the label, rendered only with `labelAppend`. */
  LABEL_APPEND_SELECTOR: '.euiFormRow__labelAppend',

  /** The wrapper around the field, the errors and the help texts. */
  FIELD_WRAPPER_SELECTOR: '.euiFormRow__fieldWrapper',

  /** One help text, rendered per `helpText` entry. */
  HELP_TEXT_SELECTOR: '.euiFormHelpText',

  /** One error, rendered per `error` entry while `isInvalid`. */
  ERROR_TEXT_SELECTOR: '.euiFormErrorText',
};
