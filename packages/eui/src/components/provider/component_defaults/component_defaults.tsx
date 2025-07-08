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
  PropsWithChildren,
} from 'react';

import type { EuiPortalProps } from '../../portal';
import type { EuiFocusTrapProps } from '../../focus_trap';
import type { EuiTablePaginationProps, EuiTableProps } from '../../table';
import type { EuiFlyoutProps } from '../../flyout';

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
  /**
   * Provide a global configuration for EuiTable's `responsiveBreakpoint` prop. Defaults to `'s'`.
   *
   * Defaults will be inherited by all `EuiBasicTable`s and `EuiInMemoryTable`s.
   */
  EuiTable?: Pick<EuiTableProps, 'responsiveBreakpoint'>;

  /**
   * Provide a global configuration for `EuiFlyout`s.
   * Defaults will be inherited by all `EuiFlyout`s.
   */
  EuiFlyout?: Pick<
    EuiFlyoutProps,
    'includeSelectorInFocusTrap' | 'includeFixedHeadersInFocusTrap'
  >;
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
export type EuiComponentDefaultsProviderProps = PropsWithChildren & {
  componentDefaults?: EuiComponentDefaults;
};
export const EuiComponentDefaultsProvider: FunctionComponent<
  EuiComponentDefaultsProviderProps
> = ({ componentDefaults = emptyDefaults, children }) => {
  return (
    <EuiComponentDefaultsContext.Provider value={componentDefaults}>
      {children}
    </EuiComponentDefaultsContext.Provider>
  );
};

/*
 * Hooks
 */
export const useComponentDefaults = () => {
  return useContext(EuiComponentDefaultsContext);
};

// Merge individual component props with component defaults
export const usePropsWithComponentDefaults = <
  TComponentName extends keyof EuiComponentDefaults,
  TComponentProps
>(
  componentName: TComponentName,
  props: TComponentProps
): TComponentProps => {
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

/*
 * Utilities
 */

/**
 * Used only to generate prop type definitions (via `@elastic/eui-docgen`) to document `EuiComponentDefaults` in a props table.
 *
 * @see https://github.com/elastic/eui/issues/8388
 */
export const EuiProviderComponentDefaultsProps: FunctionComponent<
  EuiComponentDefaults
> = () => <></>;
