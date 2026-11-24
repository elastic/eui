/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/display/badge/|EuiBadge}.
 * `*_SELECTOR` values are CSS, `*_TEST_SUBJ` values are `data-test-subj` names EUI sets itself.
 */
export const EuiBadgeSelectors = {
  /** The badge element, a `<span>`, or a `<button>` or `<a>` when clickable. Carries the consumer's `data-test-subj` unless `iconOnClick` is combined with `onClick` or `href`. */
  ROOT_SELECTOR: '.euiBadge',

  /** The inner `<button>` or `<a>` that carries the consumer's `data-test-subj` when `iconOnClick` is combined with `onClick` or `href`. */
  CHILD_BUTTON_SELECTOR: '.euiBadge__childButton',

  /** The text wrapper, rendered only with children. */
  TEXT_SELECTOR: '.euiBadge__text',

  /** The icon button, rendered only with `iconOnClick`. */
  ICON_BUTTON_SELECTOR: '.euiBadge__iconButton',
};
