/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { createContext, useContext } from 'react';
import { EuiResizableContainerRegistry } from './types';
interface ContextProps {
  registry?: EuiResizableContainerRegistry;
}

const EuiResizablePanelContext = createContext<ContextProps>({});

interface ContextProviderProps extends Required<ContextProps> {
  /**
   * ReactNode to render as this component's content
   */
  children: any;
}

export function EuiResizablePanelContextProvider({
  children,
  registry,
}: ContextProviderProps) {
  return (
    <EuiResizablePanelContext.Provider value={{ registry }}>
      {children}
    </EuiResizablePanelContext.Provider>
  );
}

export const useEuiResizablePanelContext = () => {
  const context = useContext(EuiResizablePanelContext);
  if (!context.registry) {
    throw new Error(
      'useEuiResizablePanelContext must be used within a <EuiResizablePanelContextProvider />'
    );
  }
  return context;
};
