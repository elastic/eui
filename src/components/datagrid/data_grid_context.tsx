import React from 'react';
import { EuiDataGridFocusedCell } from './data_grid_types';

export const DataGridContext = React.createContext({
  onFocusUpdate: (_cell: EuiDataGridFocusedCell, _updateFocus: Function) => {},
});
