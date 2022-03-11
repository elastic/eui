import React, { useEffect, useState, ReactNode } from 'react';
// @ts-ignore - faker does not have type declarations
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiDataGridColumnCellAction,
  EuiDataGridColumn,
} from '../../../../src/components';

const cellActions: EuiDataGridColumnCellAction[] = [
  ({ Component }) => (
    <Component iconType="plusInCircle" aria-label="Filter in">
      Filter in
    </Component>
  ),
  ({ Component }) => (
    <Component iconType="minusInCircle" aria-label="Filter out">
      Filter out
    </Component>
  ),
];

const columns: EuiDataGridColumn[] = [
  {
    id: 'firstName',
    cellActions,
  },
  {
    id: 'lastName',
    isExpandable: false,
    cellActions,
  },
  {
    id: 'suffix',
    isExpandable: false,
  },
  {
    id: 'boolean',
    isExpandable: true, // Overridden by setCellProps for specific cells
  },
];

const data: Array<{ [key: string]: ReactNode }> = [];
for (let i = 1; i < 5; i++) {
  data.push({
    firstName: fake('{{name.firstName}}'),
    lastName: fake('{{name.lastName}}'),
    suffix: fake('{{name.suffix}}'),
    boolean: fake('{{random.boolean}}'),
  });
}

export default () => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  return (
    <EuiDataGrid
      aria-label="Data grid example of isExpandable false"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={data.length}
      renderCellValue={({ rowIndex, columnId, setCellProps }) => {
        const value = data[rowIndex][columnId];

        useEffect(() => {
          if (columnId === 'boolean' && value === 'false') {
            setCellProps({ isExpandable: false });
          }
        }, [columnId, value, setCellProps]);

        return value;
      }}
    />
  );
};
