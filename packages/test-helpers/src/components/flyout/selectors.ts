/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/containers/flyout/|EuiFlyout}.
 */
export const EuiFlyoutSelectors = {
  /** Root element carrying the consumer's `data-test-subj`. CSS. */
  ROOT_SELECTOR: '.euiFlyout',

  /** `data-test-subj` EUI sets on its own close button. Absent with `hideCloseButton` or a rendered flyout menu. */
  CLOSE_BUTTON_TEST_SUBJ: 'euiFlyoutCloseButton',
};
