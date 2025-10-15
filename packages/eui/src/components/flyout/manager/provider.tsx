/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useContext, useMemo } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { useApplyFlyoutLayoutMode } from './layout_mode';
import { FlyoutManagerApi } from './types';
import { getFlyoutManagerStore } from './store';

/**
 * React context that exposes the Flyout Manager API (state + actions).
 */
export const EuiFlyoutManagerContext = createContext<FlyoutManagerApi | null>(
  null
);

/**
 * Provides the Flyout Manager API via context and runs layout-mode logic.
 */
export const EuiFlyoutManager: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getState, subscribe, ...rest } = getFlyoutManagerStore();
  const state = useSyncExternalStore(subscribe, getState, getState);

  const api: FlyoutManagerApi = useMemo(
    () => ({ state, ...rest }),
    [state, rest]
  );

  return (
    <EuiFlyoutManagerContext.Provider value={api}>
      <EuiFlyoutManagerContainer>{children}</EuiFlyoutManagerContainer>
    </EuiFlyoutManagerContext.Provider>
  );
};

const EuiFlyoutManagerContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useApplyFlyoutLayoutMode();
  return <>{children}</>;
};

/** Hook to access the Flyout Manager API from context. */
export const useFlyoutManager = (): FlyoutManagerApi | null =>
  useContext(EuiFlyoutManagerContext);
