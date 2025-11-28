/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Convenience re-exports of bound action creators for external usage.
 */
export {
  addFlyout as addFlyoutAction,
  closeFlyout as closeFlyoutAction,
  setActiveFlyout as setActiveFlyoutAction,
  setFlyoutWidth as setFlyoutWidthAction,
  setPushPadding as setPushPaddingAction,
  setActivityStage as setActivityStageAction,
} from './actions';

/** Reducer and default state for the flyout manager. */
export { flyoutManagerReducer, initialState } from './reducer';

/** Provider component exposing the Flyout Manager API via context. */
export { EuiFlyoutManager } from './provider';

/**
 * Hooks for reading manager state and derived information.
 */
/**
 * Selectors and derived state hooks for managed flyouts.
 */
export {
  useCurrentChildFlyout,
  useCurrentMainFlyout,
  useCurrentSession,
  useFlyoutId,
  useFlyoutLayoutMode,
  useFlyoutManager,
  useFlyoutWidth,
  useHasChildFlyout,
  useIsFlyoutActive,
  useIsInManagedFlyout,
  useHasActiveSession,
  useParentFlyoutSize,
  usePushPaddingOffsets,
  useHasPushPadding,
} from './hooks';

export { EuiFlyoutChild, type EuiFlyoutChildProps } from './flyout_child';
export { EuiFlyoutMain, type EuiFlyoutMainProps } from './flyout_main';

/** Utility functions for flyout sizing and layout. */
export { getWidthFromSize } from './layout_mode';
