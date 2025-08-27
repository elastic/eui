/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useContext, useId, useReducer, useRef } from 'react';

import { warnOnce } from '../../../services';

import { flyoutManagerReducer, initialState } from './reducer';
import {
  addFlyout as addFlyoutAction,
  closeFlyout as closeFlyoutAction,
  setActiveFlyout as setActiveFlyoutAction,
  setFlyoutWidth as setFlyoutWidthAction,
} from './actions';
import {
  type EuiFlyoutLevel,
  type EuiFlyoutManagerState,
  type FlyoutManagerApi,
} from './types';
import { EuiFlyoutManagerContext } from './provider';
import { LEVEL_MAIN } from './const';
import { useFlyout } from './selectors';

export {
  useIsFlyoutActive,
  useHasActiveSession,
  useCurrentSession,
  useCurrentMainFlyout,
  useCurrentChildFlyout,
  useFlyoutWidth,
  useParentFlyoutSize,
  useHasChildFlyout,
} from './selectors';

export { useFlyoutLayoutMode } from './layout_mode';

export { useIsInManagedFlyout } from './context';

// Convenience selector for a flyout's activity stage
export type { EuiFlyoutActivityStage } from './types';

/**
 * Hook that provides the flyout manager reducer and bound action creators.
 * Accepts an optional initial state (mainly for tests or custom setups).
 */
export function useFlyoutManagerReducer(
  initial: EuiFlyoutManagerState = initialState
): FlyoutManagerApi {
  const [state, dispatch] = useReducer(flyoutManagerReducer, initial);

  const addFlyout = useCallback(
    (flyoutId: string, level: EuiFlyoutLevel = LEVEL_MAIN, size?: string) =>
      dispatch(addFlyoutAction(flyoutId, level, size)),
    []
  );
  const closeFlyout = useCallback(
    (flyoutId: string) => dispatch(closeFlyoutAction(flyoutId)),
    []
  );
  const setActiveFlyout = useCallback(
    (flyoutId: string | null) => dispatch(setActiveFlyoutAction(flyoutId)),
    []
  );
  const setFlyoutWidth = useCallback(
    (flyoutId: string, width: number) =>
      dispatch(setFlyoutWidthAction(flyoutId, width)),
    []
  );

  return {
    state,
    dispatch,
    addFlyout,
    closeFlyout,
    setActiveFlyout,
    setFlyoutWidth,
  };
}

/** Access the flyout manager context (state and actions). */
export const useFlyoutManager = () => useContext(EuiFlyoutManagerContext);

/**
 * Stable flyout ID utility. Uses the passed `id` if provided, otherwise
 * generates a deterministic ID for the component's lifetime.
 */
export const useFlyoutId = (flyoutId?: string) => {
  const defaultId = useId();
  const existingFlyout = useFlyout(flyoutId);
  const id = flyoutId && !!existingFlyout ? flyoutId : `flyout-${defaultId}`;
  const componentIdRef = useRef<string>(id);

  if (existingFlyout) {
    warnOnce(
      `flyout-id-${flyoutId}`,
      `Flyout with ID ${flyoutId} already registered; using new ID ${id}`
    );
  }

  return componentIdRef.current;
};
