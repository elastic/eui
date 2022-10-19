import React, { useState, ReactNode } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiDataGridCellValueElementProps,
  EuiDataGridColumnCellAction,
  EuiDataGridColumn,
  EuiTitle,
} from '../../../../../src';

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
    id: 'default',
    cellActions,
  },
  {
    id: 'datetime',
    cellActions,
  },
  {
    id: 'json',
    schema: 'json',
    cellActions,
  },
  {
    id: 'custom',
    schema: 'favoriteFranchise',
    cellActions,
  },
];

const data: Array<{ [key: string]: ReactNode }> = [];
for (let i = 1; i < 5; i++) {
  data.push({
    default: `${faker.name.lastName()}, ${faker.name.firstName()} ${faker.name.suffix()}`,
    datetime: `${faker.date.past()}`,
    json: JSON.stringify([
      {
        numeric: faker.finance.account(),
        currency: faker.finance.amount(),
        date: `${faker.date.past()}`,
      },
    ]),
    custom: i % 2 === 0 ? 'Star Wars' : 'Star Trek',
  });
}

const RenderCellValue = ({
  rowIndex,
  columnId,
  schema,
  isDetails,
}: EuiDataGridCellValueElementProps) => {
  let value = data[rowIndex][columnId];

  if (schema === 'favoriteFranchise' && isDetails) {
    value = (
      <EuiTitle size="xs">
        <h3>{value} is the best!</h3>
      </EuiTitle>
    );
  }

  return value;
};

export default () => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  return (
    <EuiDataGrid
      aria-label="Data grid example of renderCellValue.isDetails"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={data.length}
      renderCellValue={RenderCellValue}
    />
  );
};
