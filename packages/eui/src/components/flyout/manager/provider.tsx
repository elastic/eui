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
  console.log(`[FLYOUT DEBUG] registerCallback: ${flyoutId} (${callbackType})`);
  const existing = callbacksRegistry.get(flyoutId) || {};
  callbacksRegistry.set(flyoutId, { ...existing, [callbackType]: callback });
};

export const unregisterCallback = (
  flyoutId: string,
  callbackType: 'onClose' | 'onActive'
) => {
  console.log(
    `[FLYOUT DEBUG] unregisterCallback: ${flyoutId} (${callbackType})`
  );
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

export const callCallback = (
  flyoutId: string,
  callbackType: 'onClose' | 'onActive'
) => {
  console.log(`[FLYOUT DEBUG] callCallback: ${flyoutId} (${callbackType})`);
  const callbacks = callbacksRegistry.get(flyoutId);
  if (callbacks?.[callbackType]) {
    console.log(
      `[FLYOUT DEBUG] executing ${callbackType} callback for: ${flyoutId}`
    );
    queueMicrotask(() => callbacks[callbackType]!());
  } else {
    console.log(
      `[FLYOUT DEBUG] no ${callbackType} callback found for: ${flyoutId}`
    );
  }
};

// Legacy function names for backward compatibility
export const registerUnregisterCallback = (
  flyoutId: string,
  callback: () => void
) => registerCallback(flyoutId, 'onClose', callback);
export const unregisterUnregisterCallback = (flyoutId: string) =>
  unregisterCallback(flyoutId, 'onClose');
export const callUnregisterCallback = (flyoutId: string) =>
  callCallback(flyoutId, 'onClose');
export const registerOnActiveCallback = (
  flyoutId: string,
  callback: () => void
) => registerCallback(flyoutId, 'onActive', callback);
export const unregisterOnActiveCallback = (flyoutId: string) =>
  unregisterCallback(flyoutId, 'onActive');
export const callOnActiveCallback = (flyoutId: string) =>
  callCallback(flyoutId, 'onActive');

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
