/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useContext } from 'react';

/**
 * Context to track if we're inside an EuiPopover panel's children.
 * Allows descendant components to opt out of inherited contexts that
 * should not cross the popover boundary (e.g. EuiButtonGroupContext).
 */
const EuiPopoverBoundaryContext = createContext<boolean>(false);

/**
 * Wrap a popover's panel children to mark them as inside a popover boundary.
 */
export const EuiPopoverBoundaryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EuiPopoverBoundaryContext.Provider value={true}>
      {children}
    </EuiPopoverBoundaryContext.Provider>
  );
};

/**
 * Returns `true` when called within an EuiPopover panel.
 */
export const useIsInsideEuiPopover = () =>
  useContext(EuiPopoverBoundaryContext);
