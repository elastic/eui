/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/display/card/|EuiCard}.
 * `*_SELECTOR` values are CSS, `*_TEST_SUBJ` values are `data-test-subj` names EUI sets itself.
 */
export const EuiCardSelectors = {
  /** The panel carrying the consumer's `data-test-subj`. */
  ROOT_SELECTOR: '.euiCard',

  /** The title element, wrapping a link or button when the card is clickable. */
  TITLE_SELECTOR: '.euiCard__title',

  /** The description text, rendered only when `description` is set. */
  DESCRIPTION_SELECTOR: '.euiCard__content > .euiText',

  /** The `selectable` toggle button, a `role="switch"` with `aria-checked`, direct child of the panel. */
  SELECT_BUTTON_SELECTOR: 'button[role="switch"]',
};
