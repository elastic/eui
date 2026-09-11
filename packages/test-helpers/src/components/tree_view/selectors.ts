/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/navigation/tree-view/|EuiTreeView}.
 * `*_SELECTOR` values are CSS.
 */
export const EuiTreeViewSelectors = {
  ROOT_SELECTOR: '.euiTreeView',

  /** Node buttons of this level only. A nested tree renders its own `.euiTreeView` inside a node. */
  ITEM_SELECTOR: '> li > .euiTreeView__nodeInner',
};
