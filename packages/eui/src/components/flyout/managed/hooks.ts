/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useContext } from 'react';
import {
  ManagedFlyoutContext,
  ManagedFlyoutIsRenderedContext,
} from './context';
import type { RenderManagedFlyoutParams } from './types';

/**
 * Hook to determine if a flyout is rendered in the tree.
 */
export const useIsManagedFlyoutRendered = () =>
  useContext(ManagedFlyoutIsRenderedContext);

/**
 * Hook to access the ManagedFlyout context.
 * Throws if not within a ManagedFlyoutProvider.
 */
export const useFlyoutManager = () => {
  const ctx = useContext(ManagedFlyoutContext);
  if (!ctx) {
    throw new Error(
      'useFlyoutManager must be used within a ManagedFlyoutProvider'
    );
  }
  return ctx;
};

export const useAllManagedFlyouts = () => {
  return useFlyoutManager().flyouts;
};

/**
 * Hook to get a flyout renderer callback.
 */
export const useCreateManagedFlyoutRenderer = (
  params?: RenderManagedFlyoutParams
) => useFlyoutManager().createManagedFlyoutRenderer(params);

/**
 * Hook to check if a flyout with the given id is added to the manager.
 */
export const useIsManagedFlyoutAdded = (id: string) => {
  const { flyouts } = useFlyoutManager();
  return flyouts.some((f) => f.id === id);
};

/**
 * Hook to check if a flyout with the given id is currently active.
 */
export const useIsManagedFlyoutActive = (id: string) => {
  const { flyouts, activeFlyoutId } = useFlyoutManager();
  return activeFlyoutId === id && flyouts.some((f) => f.id === id);
};
