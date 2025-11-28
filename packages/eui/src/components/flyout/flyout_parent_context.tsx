/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useContext } from 'react';

/**
 * Context to track if we're inside a parent flyout's children.
 * This allows nested flyouts to automatically inherit the session
 * without requiring explicit `session="inherit"` prop.
 */
const EuiFlyoutParentContext = createContext<boolean>(false);

/**
 * Provider that wraps a flyout's children to indicate they're inside a parent flyout.
 * Nested flyouts can use this to automatically default to session inheritance.
 */
export const EuiFlyoutParentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EuiFlyoutParentContext.Provider value={true}>
      {children}
    </EuiFlyoutParentContext.Provider>
  );
};

/**
 * Hook that returns `true` when called within a parent flyout's children.
 * Used to automatically determine if a nested flyout should inherit the session.
 */
export const useIsInsideParentFlyout = () => useContext(EuiFlyoutParentContext);
