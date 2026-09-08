/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/navigation/context-menu/|EuiContextMenu}.
 * `*_SELECTOR` values are CSS.
 */
export const EuiContextMenuSelectors = {
  /**
   * Root element carrying the consumer's `data-test-subj`: either a multi
   * panel `EuiContextMenu`, or a single `EuiContextMenuPanel` used on its
   * own, which is the more common Kibana pattern.
   */
  ROOT_SELECTOR: '.euiContextMenu, .euiContextMenuPanel',

  /**
   * Each panel. Two can exist at once during a panel transition (the
   * outgoing one still animating out, plus the incoming one). Both are
   * rendered outgoing-first in markup, so the last match is always the
   * current panel.
   */
  PANEL_SELECTOR: '.euiContextMenuPanel',

  /** An item inside a panel. */
  ITEM_SELECTOR: '.euiContextMenuItem',
};
