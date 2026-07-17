/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  createContext,
  useRef,
  type PropsWithChildren,
  useContext,
} from 'react';
import { createEuiTableStore, EuiTableStore } from './store';

const EuiTableStoreContext = createContext<EuiTableStore | null>(null);

/**
 * @internal
 */
export const EuiTableStoreProvider = ({ children }: PropsWithChildren) => {
  const store = useRef<EuiTableStore | null>(null);
  if (!store.current) {
    store.current = createEuiTableStore();
  }

  return (
    <EuiTableStoreContext.Provider value={store.current}>
      {children}
    </EuiTableStoreContext.Provider>
  );
};

/**
 * @internal
 */
export const useEuiTableColumnDataStore = () => {
  const store = useContext(EuiTableStoreContext);
  if (!store) {
    throw new Error(
      '[useEuiTableColumnDataStore] Store context not found. This hook must be used within EuiTable!'
    );
  }

  return store;
};
