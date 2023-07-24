/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  createContext,
  useContext,
  useMemo,
  FunctionComponent,
} from 'react';

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

// This type must be manually kept in sync with EuiComponentDefaults, until we
// decide to extend this architecture / extrapolate component defaults to *all*
// props across *all* components
type EuiComponentDefaultsSupportedComponents = {
  EuiPortal: EuiPortalProps;
  EuiFocusTrap: EuiFocusTrapProps;
  EuiTablePagination: EuiTablePaginationProps;
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
}> = ({ componentDefaults: configuredDefaults, children }) => {
  // Merge consumer configured component props with baseline EUI component props
  const componentDefaults: _EuiComponentDefaults = useMemo(() => {
    if (!configuredDefaults) return EUI_COMPONENT_DEFAULTS;

    const mergedDefaults: _EuiComponentDefaults = { ...EUI_COMPONENT_DEFAULTS };

    Object.entries(configuredDefaults).forEach(
      ([componentName, componentProps]) => {
        Object.entries(componentProps as any).forEach(
          ([propName, propValue]) => {
            if (propValue !== undefined) {
              // @ts-ignore Object.entries is inherently untyped, but we don't need it to be here
              mergedDefaults[componentName][propName] = propValue;
            }
          }
        );
      }
    );

    return mergedDefaults;
  }, [configuredDefaults]);

  return (
    <EuiComponentDefaultsContext.Provider value={componentDefaults}>
      {children}
    </EuiComponentDefaultsContext.Provider>
  );
};

/*
 * Hooks
 */
export const useEuiComponentDefaults = () => {
  return useContext(EuiComponentDefaultsContext);
};

// Merge individual component props with component defaults
export const usePropsWithComponentDefaults = <
  TComponentName extends keyof EuiComponentDefaults
>(
  componentName: TComponentName,
  props: EuiComponentDefaultsSupportedComponents[TComponentName]
): EuiComponentDefaultsSupportedComponents[TComponentName] => {
  const context = useContext(EuiComponentDefaultsContext);

  const componentDefaults = context[componentName] ?? emptyDefaults;

  return useMemo(
    () => ({
      ...componentDefaults,
      ...props,
    }),
    [componentDefaults, props]
  );
};
