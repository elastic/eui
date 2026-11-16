/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/navigation/pagination/|EuiPagination}.
 * `*_SELECTOR` values are CSS, `*_TEST_SUBJ` values are `data-test-subj` names EUI sets itself.
 */
export const EuiPaginationSelectors = {
  /** The `<nav>` root carrying the consumer's `data-test-subj`. */
  ROOT_SELECTOR: '.euiPagination',

  /** A numbered page button. Not rendered in the compressed variant. */
  PAGE_BUTTON_SELECTOR: '.euiPaginationButton',

  /** The numbered page button of the active page. */
  ACTIVE_PAGE_BUTTON_SELECTOR: '.euiPaginationButton[aria-current="page"]',

  /** The "page of total" text of the compressed variant, with one `<span>` per number. */
  COMPRESSED_TEXT_SELECTOR: '.euiPagination__compressedText',

  /** Prefix of a page button's test subj, followed by the 0-based page index. */
  PAGE_BUTTON_TEST_SUBJ_PREFIX: 'pagination-button-',

  FIRST_BUTTON_TEST_SUBJ: 'pagination-button-first',
  PREVIOUS_BUTTON_TEST_SUBJ: 'pagination-button-previous',
  NEXT_BUTTON_TEST_SUBJ: 'pagination-button-next',
  LAST_BUTTON_TEST_SUBJ: 'pagination-button-last',
};
