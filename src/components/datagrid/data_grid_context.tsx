/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import {
  DataGridFocusContextShape,
  DataGridWrapperRowsContentsShape,
  EuiDataGridSorting,
} from './data_grid_types';

export const DataGridFocusContext = React.createContext<
  DataGridFocusContextShape
>({
  setFocusedCell: () => {},
  onFocusUpdate: () => () => {},
});

export const DataGridSortingContext = React.createContext<
  EuiDataGridSorting | undefined
>(undefined);

export const DataGridWrapperRowsContext = React.createContext<
  DataGridWrapperRowsContentsShape
>({ headerRow: <div />, headerRowHeight: 0, footerRow: null });
