/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useContext } from 'react';
import type { HeaderCellRegistry } from './types';

interface StickyHeaderContextProps {
  registry?: HeaderCellRegistry;
  /**
   * Offset from top for sticky positioning
   */
  stickyHeaderOffset?: number;
  /**
   * Internal flag to prevent sticky renderer cells from re-registering
   * @internal
   */
  _isInStickyRenderer?: boolean;
}

const EuiTableStickyHeaderContext = createContext<StickyHeaderContextProps>({});

interface ContextProviderProps extends StickyHeaderContextProps {
  /**
   * ReactNode to render as this component's content
   */
  children: React.ReactNode;
}

export function EuiTableStickyHeaderContextProvider({
  children,
  registry,
  stickyHeaderOffset,
  _isInStickyRenderer,
}: ContextProviderProps) {
  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({ registry, stickyHeaderOffset, _isInStickyRenderer }),
    [registry, stickyHeaderOffset, _isInStickyRenderer]
  );
  
  return (
    <EuiTableStickyHeaderContext.Provider value={value}>
      {children}
    </EuiTableStickyHeaderContext.Provider>
  );
}

/**
 * Hook to access the sticky header context.
 * Returns undefined if not within a sticky header enabled table.
 */
export const useEuiTableStickyHeaderContext = () => {
  return useContext(EuiTableStickyHeaderContext);
};
