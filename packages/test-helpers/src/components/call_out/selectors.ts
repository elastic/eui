/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/display/callout/|EuiCallOut}.
 * `*_SELECTOR` values are CSS, `*_TEST_SUBJ` values are `data-test-subj` names EUI sets itself.
 */
export const EuiCallOutSelectors = {
  /** The panel root carrying the consumer's `data-test-subj`. */
  ROOT_SELECTOR: '.euiCallOut',

  /** The title element, rendered only with a `title`. */
  TITLE_SELECTOR: '.euiCallOutHeader__title',

  /** The `text` block, rendered only with a `text`. */
  TEXT_SELECTOR: '.euiCallOut__text',

  /** Prefix of the root class that carries the color, e.g. `euiCallOut--warning`. */
  COLOR_CLASS_PREFIX: 'euiCallOut--',

  /** The dismiss button, rendered only with `onDismiss`. */
  DISMISS_BUTTON_TEST_SUBJ: 'euiDismissCalloutButton',

  /**
   * The dismiss button by its test subj, or by its cross icon when
   * `dismissButtonProps` replaced the test subj.
   */
  DISMISS_BUTTON_SELECTOR:
    '[data-test-subj="euiDismissCalloutButton"], button:has([data-euiicon-type="cross"])',
};
