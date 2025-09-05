/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useContext } from 'react';
import { useFlyoutManagerReducer } from './hooks';
import { useApplyFlyoutLayoutMode } from './layout_mode';
import { FlyoutManagerApi } from './types';

// Callback registry for unregister callbacks - keeps state serializable
const unregisterCallbacks = new Map<string, () => void>();

// Helper functions to manage the callback registry
export const registerUnregisterCallback = (
  flyoutId: string,
  callback: () => void
) => {
  unregisterCallbacks.set(flyoutId, callback);
};

export const unregisterUnregisterCallback = (flyoutId: string) => {
  unregisterCallbacks.delete(flyoutId);
};

export const callUnregisterCallback = (flyoutId: string) => {
  const callback = unregisterCallbacks.get(flyoutId);
  if (callback) {
    queueMicrotask(() => callback());
  }
};

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
  const api = useFlyoutManagerReducer();
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
