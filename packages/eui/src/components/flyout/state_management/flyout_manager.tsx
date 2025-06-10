/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';

import { initialFlyoutState, flyoutReducer } from './flyout_reducer';
import { FlyoutAction, FlyoutState } from './types';

interface FlyoutContextProps {
  state: FlyoutState;
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

export const FlyoutManager: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(flyoutReducer, initialFlyoutState);

  return (
    <FlyoutContext.Provider value={{ state, dispatch }}>
      {children}
    </FlyoutContext.Provider>
  );
};
