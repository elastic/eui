/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export { EuiFlyoutChild, type EuiFlyoutChildProps } from './flyout_child';
export { EuiFlyoutMain, type EuiFlyoutMainProps } from './flyout_main';
export {
  addFlyout,
  closeFlyout,
  EuiFlyoutManager,
  EuiManagedFlyoutContext,
  setActiveFlyout,
  setFlyoutWidth,
  useCurrentSession,
  useFlyoutManager,
  useFlyoutWidth,
  useIsFlyoutActive,
  useIsManagedFlyoutContext,
  useIsSessionActive,
  type EuiFlyoutManagerState,
  type EuiManagedFlyoutState,
} from './flyout_manager';
