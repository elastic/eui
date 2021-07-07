/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement } from 'react';
import { EuiDataGridFocusedCell, EuiDataGridSorting } from './data_grid_types';

export interface DataGridFocusContextShape {
  setFocusedCell: (cell: EuiDataGridFocusedCell) => void;
  onFocusUpdate: (
    cell: EuiDataGridFocusedCell,
    updateFocus: Function
  ) => () => void;
}

export const DataGridFocusContext = React.createContext<
  DataGridFocusContextShape
>({
  setFocusedCell: () => {},
  onFocusUpdate: () => () => {},
});

export const DataGridSortingContext = React.createContext<
  EuiDataGridSorting | undefined
>(undefined);

export interface DataGridWrapperRowsContentsShape {
  headerRowHeight: number;
  headerRow: ReactElement;
  footerRow: ReactElement | null;
}
export const DataGridWrapperRowsContext = React.createContext<
  DataGridWrapperRowsContentsShape
>({ headerRow: <div />, headerRowHeight: 0, footerRow: null });
