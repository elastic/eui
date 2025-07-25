/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';

import { EuiFlyoutMenu } from '../flyout_menu';
import { EuiFlyout, EuiFlyoutChild } from '../index';
import { flyoutReducer, initialFlyoutState } from './flyout_reducer';
import { ManagedFlyoutMenu } from './managed_flyout_menu';
import {
  EuiFlyoutSessionAction,
  EuiFlyoutSessionHistoryState,
  EuiFlyoutSessionProviderComponentProps,
  EuiFlyoutSessionRenderContext,
} from './types';

interface FlyoutSessionContextProps {
  state: EuiFlyoutSessionHistoryState;
  dispatch: React.Dispatch<EuiFlyoutSessionAction>;
  onUnmount?: EuiFlyoutSessionProviderComponentProps['onUnmount'];
  historyFilter: EuiFlyoutSessionProviderComponentProps['historyFilter'];
}

const EuiFlyoutSessionContext = createContext<FlyoutSessionContextProps | null>(
  null
);

/**
 * Accesses the state data and dispatch function from the context of EuiFlyoutSessionProvider
 * Use this if you need to debug the state or need direct access to the dispatch function, otherwise use useEuiFlyoutSession hook.
 */
export const useEuiFlyoutSessionContext = () => {
  const context = useContext(EuiFlyoutSessionContext);
  if (!context) {
    throw new Error(
      'useEuiFlyoutSessionContext must be used within a EuiFlyoutSessionProvider'
    );
  }
  return context;
};

/**
 * FlyoutProvider is a component that provides a context for Flyout components.
 * It is used to manage the state of the Flyout and its child.
 * It also renders the Flyout and FlyoutChild components.
 *
 * @param children - The children of the FlyoutProvider component.
 * @param renderMainFlyoutContent - A function that renders the content of the main Flyout.
 * @param renderChildFlyoutContent - A function that renders the content of the child Flyout.
 * @returns The FlyoutProvider component.
 */
export const EuiFlyoutSessionProvider: React.FC<
  EuiFlyoutSessionProviderComponentProps
> = ({
  children,
  renderMainFlyoutContent,
  renderChildFlyoutContent,
  historyFilter,
  onUnmount,
}) => {
  const wrappedReducer = useCallback(
    (
      state: EuiFlyoutSessionHistoryState<any>,
      action: EuiFlyoutSessionAction<any>
    ) => {
      const nextState = flyoutReducer(state, action);

      if (!historyFilter) return nextState;

      const filteredHistory = historyFilter(
        nextState.history || [],
        nextState.activeFlyoutGroup
      );

      return {
        ...nextState,
        history: filteredHistory,
      };
    },
    [historyFilter]
  );

  const [state, dispatch] = useReducer(wrappedReducer, initialFlyoutState);
  const { activeFlyoutGroup } = state;

  const handleClose = () => {
    dispatch({ type: 'CLOSE_SESSION' });
  };

  const handleCloseChild = () => {
    dispatch({ type: 'CLOSE_CHILD_FLYOUT' });
  };

  const handleGoBack = () => {
    dispatch({ type: 'GO_BACK' });
  };

  const handleGoToHistoryItem = (index: number) => {
    dispatch({ type: 'GO_TO_HISTORY_ITEM', index });
  };

  let mainFlyoutContentNode: React.ReactNode = null;
  let childFlyoutContentNode: React.ReactNode = null;

  if (activeFlyoutGroup) {
    const renderContext: EuiFlyoutSessionRenderContext = {
      activeFlyoutGroup,
      meta: activeFlyoutGroup.meta,
    };
    mainFlyoutContentNode = renderMainFlyoutContent(renderContext);

    if (activeFlyoutGroup.isChildOpen && renderChildFlyoutContent) {
      childFlyoutContentNode = renderChildFlyoutContent(renderContext);
    } else if (activeFlyoutGroup.isChildOpen && !renderChildFlyoutContent) {
      console.warn(
        'EuiFlyoutSessionProvider: A child flyout is open, but renderChildFlyoutContent was not provided.'
      );
    }
  }

  const config = activeFlyoutGroup?.config;
  const flyoutPropsMain = config?.mainFlyoutProps || {};
  const flyoutPropsChild = config?.childFlyoutProps || {};

  return (
    <EuiFlyoutSessionContext.Provider
      value={{ state, dispatch, historyFilter, onUnmount }}
    >
      {children}
      {activeFlyoutGroup?.isMainOpen && (
        <EuiFlyout
          onClose={handleClose}
          size={config?.mainSize}
          ownFocus={!activeFlyoutGroup.isChildOpen}
          {...flyoutPropsMain}
        >
          {config?.isManaged && (
            <ManagedFlyoutMenu
              handleGoBack={handleGoBack}
              handleGoToHistoryItem={handleGoToHistoryItem}
              historyItems={state.history ?? []}
              {...{
                title: !config?.hideMainTitle ? config?.mainTitle : undefined,
              }}
            />
          )}
          {mainFlyoutContentNode}
          {activeFlyoutGroup.isChildOpen && childFlyoutContentNode && (
            <EuiFlyoutChild
              onClose={handleCloseChild}
              size={config?.childSize}
              {...flyoutPropsChild}
            >
              <EuiFlyoutMenu title={config?.childTitle} />
              {childFlyoutContentNode}
            </EuiFlyoutChild>
          )}
        </EuiFlyout>
      )}
    </EuiFlyoutSessionContext.Provider>
  );
};
