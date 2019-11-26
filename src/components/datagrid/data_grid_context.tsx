import React from 'react';

export const DataGridContext = React.createContext({
  onFocusUpdate: (_cell: [number, number], _updateFocus: Function) => {},
});
