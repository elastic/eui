import React, { useState, ReactNode } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiDataGridColumnCellAction,
  EuiDataGridColumn,
  RenderCellValue as RenderCellValueType,
} from '../../../../../src/components';

const cellActions1: EuiDataGridColumnCellAction[] = [
  ({ Component }) => (
    <Component onClick={() => {}} iconType="timeline">
      Add to timeline
    </Component>
  ),
];
const cellActions2: EuiDataGridColumnCellAction[] = [
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
const cellActions3 = [...cellActions2, ...cellActions1];
const cellActions5: EuiDataGridColumnCellAction[] = [
  ...cellActions3,
  ({ Component }) => (
    <Component onClick={() => {}} iconType="starEmpty">
      Custom action 1
    </Component>
  ),
  ({ Component }) => (
    <Component onClick={() => {}} iconType="starEmpty">
      Custom action 2
    </Component>
  ),
];

const columns: EuiDataGridColumn[] = [
  {
    id: 'default',
    cellActions: cellActions1,
  },
  {
    id: 'datetime',
    cellActions: cellActions2,
  },
  {
    id: 'json',
    schema: 'json',
    cellActions: cellActions3,
    visibleCellActions: 3,
  },
  {
    id: 'custom',
    schema: 'favoriteFranchise',
    cellActions: cellActions5,
  },
];

const data: Array<{ [key: string]: ReactNode }> = [];
for (let i = 1; i < 5; i++) {
  data.push({
    default: `${faker.person.lastName()}, ${faker.person.firstName()} ${faker.person.suffix()}`,
    datetime: `${faker.date.past()}`,
    json: JSON.stringify([
      {
        numeric: faker.finance.accountNumber(),
        currency: faker.finance.amount(),
        date: `${faker.date.past()}`,
      },
    ]),
    custom: i % 2 === 0 ? 'Star Wars' : 'Star Trek',
  });
}

const renderCellValue: RenderCellValueType = ({ rowIndex, columnId }) =>
  data[rowIndex][columnId];

export default () => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  return (
    <EuiDataGrid
      aria-label="Data grid example of cellActions within popovers"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={data.length}
      renderCellValue={renderCellValue}
    />
  );
};
