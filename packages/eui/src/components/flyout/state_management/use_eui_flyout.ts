/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiFlyoutSize } from '../flyout';
import { useEuiFlyout } from './flyout_manager';
import { EuiManagedFlyoutConfig } from './types';

export interface EuiOpenMainManagedFlyoutOptions<Meta> {
  size: EuiFlyoutSize;
  flyoutProps?: EuiManagedFlyoutConfig['mainFlyoutProps'];
  onUnmount?: () => void;
  meta: Meta;
}

export interface EuiOpenChildManagedFlyoutOptions<Meta> {
  size: 's' | 'm';
  flyoutProps?: EuiManagedFlyoutConfig['childFlyoutProps'];
  onUnmount?: () => void;
  meta: Meta;
}

/**
 * Hook for accessing the flyout API
 *
 * Usage:
 * Wrap your app in the `<EuiFlyoutManager>` component, to access the flyout API
 */
export function useEuiFlyoutApi<Meta>() {
  const { state, dispatch } = useEuiFlyout();

  const openFlyout = (options: EuiOpenMainManagedFlyoutOptions<Meta>) => {
    dispatch({
      type: 'OPEN_MAIN_FLYOUT',
      payload: options,
    });
  };

  const closeFlyout = () => {
    dispatch({ type: 'CLOSE_CURRENT_FLYOUT' });
  };

  const nextFlyout = (options: EuiOpenMainManagedFlyoutOptions<Meta>) => {
    openFlyout(options);
  };

  const openChildFlyout = (options: EuiOpenChildManagedFlyoutOptions<Meta>) => {
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

  const goBack = () => {
    closeFlyout();
  };

  const canGoBack = !!state.activeFlyoutGroup;

  const isFlyoutOpen = !!state.activeFlyoutGroup?.isMainOpen;

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' });
  };

  return {
    openFlyout,
    closeFlyout,
    nextFlyout,
    openChildFlyout,
    goBack,
    canGoBack,
    isFlyoutOpen,
    clearHistory,
  };
}
