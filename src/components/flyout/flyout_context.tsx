/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext } from 'react';
import { EuiFlyoutProps } from './flyout_types';

interface FlyoutContextProps {
  paddingSize: EuiFlyoutProps['paddingSize'];
}

export const EuiFlyoutContext = createContext<FlyoutContextProps>({
  paddingSize: 'l',
});

interface ContextProviderProps extends Required<FlyoutContextProps> {
  /**
   * ReactNode to render as this component's content
   */
  children: any;
}

export function EuiFlyoutContextProvider({
  children,
  paddingSize,
}: ContextProviderProps) {
  return (
    <EuiFlyoutContext.Provider value={{ paddingSize }}>
      {children}
    </EuiFlyoutContext.Provider>
  );
}
