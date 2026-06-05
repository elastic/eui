/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type EuiFlyoutCloseEvent = MouseEvent | TouchEvent | KeyboardEvent;

/**
 * Describes the source that triggered a flyout close. Passed to `onClose` via
 * the optional `meta` argument so consumers can react differently per source.
 *
 * - `close-button`: the default/X close button (base flyout and managed menu)
 * - `escape`: the Escape key
 * - `outside-click`: a click on the overlay mask or outside the flyout
 * - `navigation-back`: a managed flyout closed because the user pressed Back
 * - `navigation-cascade`: a managed flyout closed because a parent navigated
 *   away or the main flyout closed (e.g. a tab switch)
 */
export type EuiFlyoutCloseReason =
  | 'close-button'
  | 'escape'
  | 'outside-click'
  | 'navigation-back'
  | 'navigation-cascade';

/**
 * Optional metadata passed as the second argument to a flyout's `onClose`
 * callback, describing why the flyout closed.
 */
export interface EuiFlyoutCloseMeta {
  reason: EuiFlyoutCloseReason;
}
