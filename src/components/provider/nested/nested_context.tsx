/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useContext, PropsWithChildren } from 'react';

/**
 * This util creates a context for EuiProviders to use and determine if they're
 * the only (top-most) EuiProvider in the app. If they aren't (i.e., they're
 * nested within another EuiProvider) we should throw a warning and not
 * render instantiate the nested EuiProvider.
 */

export const EuiNestedProviderContext = createContext<boolean>(false);

export const EuiProviderNestedCheck = ({ children }: PropsWithChildren<{}>) => (
  <EuiNestedProviderContext.Provider value={true}>
    {children}
  </EuiNestedProviderContext.Provider>
);

export const useIsNestedEuiProvider = () => {
  return !!useContext(EuiNestedProviderContext);
};
