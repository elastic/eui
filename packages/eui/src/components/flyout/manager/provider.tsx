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
import { callbackManager } from './callback_manager';

// Callback registry - keeps state serializable
const callbacksRegistry = new Map<
  string,
  {
    onClose?: () => void;
    onActive?: () => void;
  }
>();

// Helper functions to manage the callback registry
export const registerCallback = (
  flyoutId: string,
  callbackType: 'onClose' | 'onActive',
  callback: () => void
) => {
  const existing = callbacksRegistry.get(flyoutId) || {};
  callbacksRegistry.set(flyoutId, { ...existing, [callbackType]: callback });
};

const unregisterCallback = (
  flyoutId: string,
  callbackType: 'onClose' | 'onActive'
) => {
  const existing = callbacksRegistry.get(flyoutId);
  if (existing) {
    const { [callbackType]: removed, ...rest } = existing;
    if (Object.keys(rest).length === 0) {
      callbacksRegistry.delete(flyoutId);
    } else {
      callbacksRegistry.set(flyoutId, rest);
    }
  }
};

/**
 * Batch unregister multiple callbacks for a flyout with proper timing.
 * This is the recommended way to unregister callbacks as it handles timing internally.
 */
export const unregisterCallbacks = (flyoutId: string) => {
  // Use callback manager to ensure proper coordination
  callbackManager.unregisterCallbacks(flyoutId).then(() => {
    unregisterCallback(flyoutId, 'onClose');
    unregisterCallback(flyoutId, 'onActive');
  });
};

export const callCallback = (
  flyoutId: string,
  callbackType: 'onClose' | 'onActive'
) => {
  const callbacks = callbacksRegistry.get(flyoutId);
  if (callbacks?.[callbackType]) {
    callbackManager.executeCallback(
      flyoutId,
      callbackType,
      callbacks[callbackType]!
    );
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
