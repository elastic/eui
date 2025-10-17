/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useContext } from 'react';

// Context to track if we're within a managed flyout
const EuiFlyoutIsManagedContext = createContext<boolean>(false);

/**
 * React provider that marks descendants as being rendered inside
 * an EUI managed flyout. Used by hooks/components to alter behavior
 * (e.g., focus handling) when inside a managed flyout tree.
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
 * Hook that returns `true` when called within an EUI managed flyout subtree.
 */
export const useIsInManagedFlyout = () => useContext(EuiFlyoutIsManagedContext);
