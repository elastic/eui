/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/display/toast/|EuiGlobalToastList}.
 * `*_SELECTOR` values are CSS; `*_TEST_SUBJ` values are `data-test-subj` names.
 */
export const EuiGlobalToastListSelectors = {
  /** Root element (the list carrying the consumer's `data-test-subj`). */
  ROOT_SELECTOR: '.euiGlobalToastList',

  /** A toast inside the list. */
  TOAST_SELECTOR: '.euiToast',

  CLOSE_BUTTON_TEST_SUBJ: 'toastCloseButton',
};
