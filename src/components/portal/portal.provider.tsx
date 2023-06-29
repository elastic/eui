/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren, useContext } from 'react';
import { EuiPortalInsertion } from './portal.types';

const PortalContext = React.createContext<EuiPortalInsertion | undefined>(
  undefined
);

export function usePortalInsertion() {
  return useContext(PortalContext);
}

export type PortalProviderProps = PropsWithChildren<{
  insert: EuiPortalInsertion;
}>;

export function PortalProvider(props: PortalProviderProps) {
  return (
    <PortalContext.Provider value={props.insert}>
      {props.children}
    </PortalContext.Provider>
  );
}
