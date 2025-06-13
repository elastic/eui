/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useContext, useReducer } from 'react';

import { EuiFlyout, EuiFlyoutChild } from '../index';

import { initialFlyoutState, flyoutReducer } from './flyout_reducer';
import {
  FlyoutAction,
  FlyoutHistoryState,
  FlyoutRenderContext,
  FlyoutManagerComponentProps,
} from './types';

interface FlyoutContextProps {
  state: FlyoutHistoryState;
  dispatch: React.Dispatch<FlyoutAction>;
}

const FlyoutContext = createContext<FlyoutContextProps | undefined>(undefined);

export const useFlyout = () => {
  const context = useContext(FlyoutContext);
  if (!context) {
    throw new Error('useFlyout must be used within a FlyoutManager');
  }
  return context;
};

export const FlyoutManager: React.FC<FlyoutManagerComponentProps> = ({
  children,
  renderFlyoutContent,
}) => {
  const [state, dispatch] = useReducer(flyoutReducer, initialFlyoutState);
  const { activeFlyoutGroup } = state;

  const handleClose = () => {
    dispatch({ type: 'CLOSE_CURRENT_FLYOUT' });
  };

  let mainFlyoutContentNode: React.ReactNode = null;
  let childFlyoutContentNode: React.ReactNode = null;

  if (activeFlyoutGroup) {
    const mainRenderContext: FlyoutRenderContext = {
      flyoutSpecificProps: activeFlyoutGroup.config.mainFlyoutProps || {},
      flyoutSize: activeFlyoutGroup.config.mainSize,
      flyoutType: 'main',
      dispatch,
      activeFlyoutGroup,
      onClose: handleClose,
      meta: activeFlyoutGroup.meta,
    };
    mainFlyoutContentNode = renderFlyoutContent(mainRenderContext);

    if (activeFlyoutGroup.isChildOpen) {
      const childRenderContext: FlyoutRenderContext = {
        flyoutSpecificProps: activeFlyoutGroup.config.childFlyoutProps || {},
        flyoutSize: activeFlyoutGroup.config.childSize,
        flyoutType: 'child',
        dispatch,
        activeFlyoutGroup,
        onClose: handleClose,
        meta: activeFlyoutGroup.meta,
      };
      childFlyoutContentNode = renderFlyoutContent(childRenderContext);
    }
  }

  const config = activeFlyoutGroup?.config;

  const flyoutPropsMain = config?.mainFlyoutProps || {};
  const flyoutPropsChild = config?.childFlyoutProps || {};

  return (
    <FlyoutContext.Provider value={{ state, dispatch }}>
      {children}
      {activeFlyoutGroup?.isMainOpen && (
        <EuiFlyout
          onClose={handleClose}
          size={activeFlyoutGroup.config.mainSize}
          ownFocus={!activeFlyoutGroup.isChildOpen}
          {...flyoutPropsMain}
        >
          {mainFlyoutContentNode}
          {activeFlyoutGroup.isChildOpen && childFlyoutContentNode && (
            <EuiFlyoutChild
              onClose={handleClose}
              size={activeFlyoutGroup.config.childSize}
              {...flyoutPropsChild}
            >
              {childFlyoutContentNode}
            </EuiFlyoutChild>
          )}
        </EuiFlyout>
      )}
    </FlyoutContext.Provider>
  );
};
