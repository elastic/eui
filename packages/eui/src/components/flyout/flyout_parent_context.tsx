/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useContext, useMemo } from 'react';

/**
 * Context shared from a parent flyout to its children.
 * Carries the parent's `container` element so child flyouts can inherit it
 * without needing an explicit prop, and a flag indicating we're inside a
 * parent flyout (used for automatic session inheritance).
 */
interface EuiFlyoutParentContextValue {
  isInsideParent: boolean;
  container?: HTMLElement;
}

const EuiFlyoutParentContext = createContext<EuiFlyoutParentContextValue>({
  isInsideParent: false,
});

/**
 * Provider that wraps a flyout's children to share parent flyout state.
 * Child flyouts inherit the `container` element automatically.
 */
export const EuiFlyoutParentProvider = ({
  children,
  container,
}: {
  children: React.ReactNode;
  container?: HTMLElement;
}) => {
  const value = useMemo(
    () => ({ isInsideParent: true, container }),
    [container]
  );
  return (
    <EuiFlyoutParentContext.Provider value={value}>
      {children}
    </EuiFlyoutParentContext.Provider>
  );
};

/**
 * Hook that returns `true` when called within a parent flyout's children.
 * Used to automatically determine if a nested flyout should inherit the session.
 */
export const useIsInsideParentFlyout = () =>
  useContext(EuiFlyoutParentContext).isInsideParent;

/**
 * Hook that returns the parent flyout's `container` element, if any.
 * Child flyouts use this to inherit the container without an explicit prop.
 */
export const useParentFlyoutContainer = () =>
  useContext(EuiFlyoutParentContext).container;
