/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useContext, FunctionComponent } from 'react';

import type { EuiPortalProps } from '../../portal';
import type { EuiFocusTrapProps } from '../../focus_trap';

export type EuiComponentDefaults = {
  /**
   * Provide a global configuration for EuiPortal's default insertion position.
   */
  EuiPortal?: Pick<EuiPortalProps, 'insert'>;
  /**
   * Provide a global configuration for EuiFocusTrap's `gapMode` and `crossFrame` props
   */
  EuiFocusTrap?: Pick<EuiFocusTrapProps, 'gapMode' | 'crossFrame'>;
  /**
   * TODO
   */
  EuiPagination?: unknown;
};

// Declaring as a static const for reference integrity/reducing rerenders
const emptyDefaults = {};

/*
 * Context
 */
export const EuiComponentDefaultsContext =
  createContext<EuiComponentDefaults>(emptyDefaults);

/*
 * Component
 */
export const EuiComponentDefaultsProvider: FunctionComponent<{
  componentDefaults?: EuiComponentDefaults;
}> = ({ componentDefaults = emptyDefaults, children }) => {
  return (
    <EuiComponentDefaultsContext.Provider value={componentDefaults}>
      {children}
    </EuiComponentDefaultsContext.Provider>
  );
};

/*
 * Hook
 */
export const useEuiComponentDefaults = () => {
  return useContext(EuiComponentDefaultsContext);
};
