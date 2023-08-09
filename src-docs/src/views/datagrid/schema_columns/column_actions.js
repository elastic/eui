import React, { useState, useCallback } from 'react';
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
    isSortable: true,
    actions: {
      showHide: false,
    },
  },
  {
    id: 'email',
    isSortable: true,
    actions: {
      additional: [
        {
          iconType: 'heart',
          label: 'Send Email',
          size: 'xs',
          onClick: () => {},
        },
      ],
    },
  },
  {
    id: 'city',
    isSortable: true,
    actions: {
      showHide: {
        iconType: 'cross',
        label: 'Remove column',
      },
    },
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
        name={`${faker.name.lastName()}, ${faker.name.firstName()}`}
      />
    ),
    name: `${faker.name.lastName()}, ${faker.name.firstName()} ${faker.name.suffix()}`,
    email: faker.internet.email(),
    city: faker.address.city(),
    country: faker.address.country(),
    account: faker.finance.account(),
  });
}

export default () => {
  const [pagination, setPagination] = useState({ pageIndex: 0 });

  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const setPageIndex = useCallback(
    (pageIndex) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    []
  );
  const setPageSize = useCallback(
    (pageSize) =>
      setPagination((pagination) => ({
        ...pagination,
        pageSize,
        pageIndex: 0,
      })),
    []
  );

  return (
    <EuiDataGrid
      aria-label="DataGrid demonstrating column sizing constraints"
      columns={columns}
      columnVisibility={{
        visibleColumns: visibleColumns,
        setVisibleColumns: setVisibleColumns,
      }}
      rowCount={data.length}
      renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
      pagination={{
        ...pagination,
        onChangeItemsPerPage: setPageSize,
        onChangePage: setPageIndex,
      }}
    />
  );
};
