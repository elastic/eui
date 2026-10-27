/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/navigation/tabs/|EuiTabs}.
 * `*_SELECTOR` values are CSS.
 */
export const EuiTabsSelectors = {
  /** The tab list. `EuiTabbedContent` puts the consumer's subj on a wrapper whose first child is the list. */
  ROOT_SELECTOR: '.euiTabs, :has(> .euiTabs)',

  /** A tab, an `<a>` or `<button>` with `role="tab"`. */
  TAB_SELECTOR: '.euiTab',

  /** The selected tab. */
  SELECTED_TAB_SELECTOR: '.euiTab-isSelected',

  /** The label span inside a tab, without `prepend` or `append` content. */
  TAB_CONTENT_SELECTOR: '.euiTab__content',
};
