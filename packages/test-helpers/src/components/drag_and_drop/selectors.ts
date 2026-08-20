/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Stable selectors for
 * {@link https://eui.elastic.co/docs/components/drag-and-drop/|EuiDraggable}.
 * `*_SELECTOR` values are CSS.
 */
export const EuiDraggableSelectors = {
  /**
   * Attribute `@hello-pangea/dnd` (which `EuiDraggable` wraps) spreads onto an
   * enabled drag handle. Used to verify `testSubj` actually points at a handle,
   * not a fixed EUI class — the handle markup itself is consumer-defined.
   */
  HANDLE_SELECTOR: '[data-rfd-drag-handle-draggable-id]',
};
