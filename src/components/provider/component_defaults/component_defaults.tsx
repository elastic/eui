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
import type { EuiTablePaginationProps } from '../../table';

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
   * Provide global settings for EuiTablePagination's props that affect page size
   * / the rows per page selection.
   *
   * These defaults will be inherited all table and grid components that utilize EuiTablePagination.
   */
  EuiTablePagination?: Pick<
    EuiTablePaginationProps,
    'itemsPerPage' | 'itemsPerPageOptions' | 'showPerPageOptions'
  >;
};

/**
 * The above types are external/consumer facing and have many optional props
 * The below types reflect props EUI provides defaults for and should always
 * be present within the internal context
 */
type _EuiComponentDefaults = Required<EuiComponentDefaults> & {
  EuiTablePagination: Required<EuiComponentDefaults['EuiTablePagination']>;
};

export const EUI_COMPONENT_DEFAULTS: _EuiComponentDefaults = {
  EuiPortal: {},
  EuiFocusTrap: {},
  EuiTablePagination: {
    itemsPerPage: 50,
    itemsPerPageOptions: [10, 20, 50, 100],
    showPerPageOptions: true,
  },
};

/*
 * Context
 */
export const EuiComponentDefaultsContext = createContext<_EuiComponentDefaults>(
  EUI_COMPONENT_DEFAULTS
);

/*
 * Component
 */
export const EuiComponentDefaultsProvider: FunctionComponent<{
  componentDefaults?: EuiComponentDefaults;
}> = ({ componentDefaults = EUI_COMPONENT_DEFAULTS, children }) => {
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
