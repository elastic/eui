/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/containers/modal/|EuiModal}
 * and `EuiConfirmModal`. `*_SELECTOR` values are CSS.
 */
export const EuiModalSelectors = {
  /** Root element carrying the consumer's `data-test-subj`. Matches `EuiConfirmModal` too, which renders `EuiModal` underneath. */
  ROOT_SELECTOR: '.euiModal',

  /** The close button. No `data-test-subj`, only an i18n `aria-label`, so read by this stable class instead. */
  CLOSE_BUTTON_SELECTOR: '.euiModal__closeIcon',
};
