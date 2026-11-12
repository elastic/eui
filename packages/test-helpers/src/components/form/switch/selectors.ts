/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/forms/selection/switch/|EuiSwitch}.
 * `*_SELECTOR` values are CSS, `*_TEST_SUBJ` values are `data-test-subj` names EUI sets itself.
 */
export const EuiSwitchSelectors = {
  /** The `<button role="switch">` carrying the consumer's `data-test-subj`. */
  ROOT_SELECTOR: '.euiSwitch__button',

  /** The wrapper around the button and the label. */
  WRAPPER_SELECTOR: '.euiSwitch',

  /** The visible label, rendered only with `showLabel`. */
  LABEL_SELECTOR: '.euiSwitch__label',
};
