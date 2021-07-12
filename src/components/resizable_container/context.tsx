/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useContext } from 'react';
import { EuiResizableContainerRegistry } from './types';
interface ContainerContextProps {
  registry?: EuiResizableContainerRegistry;
}

const EuiResizableContainerContext = createContext<ContainerContextProps>({});

interface ContextProviderProps extends Required<ContainerContextProps> {
  /**
   * ReactNode to render as this component's content
   */
  children: any;
}

export function EuiResizableContainerContextProvider({
  children,
  registry,
}: ContextProviderProps) {
  return (
    <EuiResizableContainerContext.Provider value={{ registry }}>
      {children}
    </EuiResizableContainerContext.Provider>
  );
}

export const useEuiResizableContainerContext = () => {
  const context = useContext(EuiResizableContainerContext);
  if (!context.registry) {
    throw new Error(
      'useEuiResizableContainerContext must be used within a <EuiResizableContainerContextProvider />'
    );
  }
  return context;
};
