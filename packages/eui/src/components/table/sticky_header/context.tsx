/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, PropsWithChildren, useContext } from 'react';

const EuiTableWithinStickyHeaderContext = createContext<boolean>(false);

/**
 * @internal
 */
export const EuiTableWithinStickyHeaderProvider = ({
  children,
}: PropsWithChildren) => (
  <EuiTableWithinStickyHeaderContext.Provider value={true}>
    {children}
  </EuiTableWithinStickyHeaderContext.Provider>
);

/**
 * @internal
 */
export const useEuiTableWithinStickyHeader = () => {
  return useContext(EuiTableWithinStickyHeaderContext);
};
