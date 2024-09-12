import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

import { EuiDataGrid, EuiAvatar } from '../../../../../src/components';

const columns = [
  {
    id: 'avatar',
    initialWidth: 40,
    isResizable: false,
    actions: false,
  },
  {
    id: 'name',
    initialWidth: 100,
  },
  {
    id: 'email',
  },
  {
    id: 'city',
  },
  {
    id: 'country',
  },
  {
    id: 'account',
  },
];

const data = [];

for (let i = 1; i < 5; i++) {
  data.push({
    avatar: (
      <EuiAvatar
        size="s"
        name={`${faker.person.lastName()}, ${faker.person.firstName()}`}
      />
    ),
    name: `${faker.person.lastName()}, ${faker.person.firstName()} ${faker.person.suffix()}`,
    email: faker.internet.email(),
    city: faker.location.city(),
    country: faker.location.country(),
    account: faker.finance.accountNumber(),
  });
}

export default () => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  return (
    <EuiDataGrid
      aria-label="DataGrid demonstrating column reordering on drag"
      columns={columns}
      columnVisibility={{
        visibleColumns: visibleColumns,
        setVisibleColumns: setVisibleColumns,
      }}
      rowCount={data.length}
      renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
      columnDragDrop
    />
  );
};
