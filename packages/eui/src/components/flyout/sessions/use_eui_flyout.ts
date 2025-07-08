/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEffect, useRef } from 'react';
import { EuiFlyoutSize } from '../flyout';
import { useEuiFlyoutSessionContext } from './flyout_provider';
import { EuiFlyoutSessionConfig } from './types';

/**
 * Options that control a main flyout in a session
 */
export interface EuiFlyoutSessionOpenMainOptions<Meta = unknown> {
  size: EuiFlyoutSize;
  flyoutProps?: EuiFlyoutSessionConfig['mainFlyoutProps'];
  meta?: Meta;
}

/**
 * Options that control a child flyout in a session
 */
export interface EuiFlyoutSessionOpenChildOptions<Meta = unknown> {
  size: 's' | 'm';
  flyoutProps?: EuiFlyoutSessionConfig['childFlyoutProps'];
  meta?: Meta;
}

/**
 * Options for opening both a main flyout and child flyout simultaneously
 */
export interface EuiFlyoutSessionOpenGroupOptions<Meta = unknown> {
  main: {
    size: EuiFlyoutSize;
    flyoutProps?: EuiFlyoutSessionConfig['mainFlyoutProps'];
  };
  child: {
    size: 's' | 'm';
    flyoutProps?: EuiFlyoutSessionConfig['childFlyoutProps'];
  };
  meta?: Meta; // Shared meta for both flyouts
}

/**
 * Hook for accessing the flyout API
 * @public
 */
export function useEuiFlyoutSession() {
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
      payload: {
        main: {
          size: options.main.size,
          flyoutProps: options.main.flyoutProps,
        },
        child: {
          size: options.child.size,
          flyoutProps: options.child.flyoutProps,
        },
        meta: options.meta,
      },
    });
  };

  const closeChildFlyout = () => {
    dispatch({ type: 'CLOSE_CHILD_FLYOUT' });
  };

  const goBack = () => {
    dispatch({ type: 'GO_BACK' });
  };

  const canGoBack = !!state.history.length;

  const isFlyoutOpen = !!state.activeFlyoutGroup?.isMainOpen;

  const isChildFlyoutOpen = !!state.activeFlyoutGroup?.isChildOpen;

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' });
  };

  return {
    openFlyout,
    openChildFlyout,
    openFlyoutGroup,
    closeChildFlyout,
    goBack,
    canGoBack,
    isFlyoutOpen,
    isChildFlyoutOpen,
    clearHistory,
  };
}
