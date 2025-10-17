/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useSyncExternalStore } from 'react';
import { getFlyoutManagerStore } from './store';

// Context to track if we're within a managed flyout
const EuiFlyoutIsManagedContext = createContext<boolean>(false);

/**
 * React provider that marks descendants as being rendered inside
 * an EUI managed flyout. Used by hooks/components to alter behavior
 * (e.g., focus handling) when inside a managed flyout tree.
 *
 * @deprecated This provider is no longer necessary as the managed state
 * is now tracked via the singleton store. Kept for backwards compatibility.
 */
export const EuiFlyoutIsManagedProvider = ({
  isManaged,
  children,
}: {
  isManaged: boolean;
  children: React.ReactNode;
}) => {
  return (
    <EuiFlyoutIsManagedContext.Provider value={isManaged}>
      {children}
    </EuiFlyoutIsManagedContext.Provider>
  );
};

/**
 * Hook that returns `true` when there is an active managed flyout session.
 * Uses the singleton store to work across React roots (e.g., in Kibana with multiple mount points).
 */
export const useIsInManagedFlyout = () => {
  const store = getFlyoutManagerStore();

  return useSyncExternalStore(
    store.subscribe,
    () => store.isManaged(),
    () => false // Server-side rendering snapshot
  );
};
