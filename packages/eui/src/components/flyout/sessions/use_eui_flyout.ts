/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEffect, useRef } from 'react';
import { useEuiFlyoutSessionContext } from './flyout_provider';
import type {
  EuiFlyoutSessionApi,
  EuiFlyoutSessionOpenChildOptions,
  EuiFlyoutSessionOpenGroupOptions,
  EuiFlyoutSessionOpenMainOptions,
} from './types';

/**
 * Hook for accessing the flyout API
 * @public
 */
export function useEuiFlyoutSession(): EuiFlyoutSessionApi {
  const { state, dispatch, onUnmount } = useEuiFlyoutSessionContext();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // When there is no active flyout, we should call the onUnmount callback.
    // Ensure this is not called on the initial render, only on subsequent state changes.
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (state.activeFlyoutGroup === null) {
      onUnmount?.();
    }
  }, [state.activeFlyoutGroup, onUnmount]);

  const openFlyout = (options: EuiFlyoutSessionOpenMainOptions) => {
    dispatch({
      type: 'OPEN_MAIN_FLYOUT',
      payload: options,
    });
  };

  const openChildFlyout = (options: EuiFlyoutSessionOpenChildOptions) => {
    if (!state.activeFlyoutGroup || !state.activeFlyoutGroup.isMainOpen) {
      console.warn(
        'useEuiFlyoutApi: Cannot open child flyout when main flyout is not open.'
      );
      return;
    }
    dispatch({
      type: 'OPEN_CHILD_FLYOUT',
      payload: options,
    });
  };

  const openFlyoutGroup = (options: EuiFlyoutSessionOpenGroupOptions) => {
    dispatch({
      type: 'OPEN_FLYOUT_GROUP',
      payload: options,
    });
  };

  const closeChildFlyout = () => {
    dispatch({ type: 'CLOSE_CHILD_FLYOUT' });
  };

  const goBack = () => {
    dispatch({ type: 'GO_BACK' });
  };

  const closeSession = () => {
    dispatch({ type: 'CLOSE_SESSION' });
  };

  const isFlyoutOpen = !!state.activeFlyoutGroup?.isMainOpen;

  const isChildFlyoutOpen = !!state.activeFlyoutGroup?.isChildOpen;

  const canGoBack = !!state.history.length;

  return {
    openFlyout,
    openChildFlyout,
    openFlyoutGroup,
    closeChildFlyout,
    goBack,
    closeSession,
    isFlyoutOpen,
    isChildFlyoutOpen,
    canGoBack,
  };
}
