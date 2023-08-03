import React, { useState, useCallback } from 'react';
import { faker } from '@faker-js/faker';

import { EuiDataGrid, EuiPanel, EuiLink } from '../../../../../src/components';

const columns = [
  {
    id: 'name',
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

for (let i = 1; i < 20; i++) {
  data.push({
    name: `${faker.name.lastName()}, ${faker.name.firstName()} ${faker.name.suffix()}`,
    email: faker.internet.email(),
    city: <EuiLink href="http://google.com">{faker.address.city()}</EuiLink>,
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
      setPagination(
        (pagination) => ({ ...pagination, pageSize, pageIndex: 0 }),
        []
      ),
    []
  );

  return (
    <EuiPanel
      style={{ maxWidth: 400, height: 300, overflow: 'hidden' }}
      paddingSize="none"
    >
      <EuiDataGrid
        aria-label="Container constrained data grid demo"
        columns={columns}
        columnVisibility={{
          visibleColumns: visibleColumns,
          setVisibleColumns: setVisibleColumns,
        }}
        rowCount={data.length}
        gridStyle={{
          border: 'horizontal',
          header: 'underline',
        }}
        renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
        pagination={{
          ...pagination,
          onChangeItemsPerPage: setPageSize,
          onChangePage: setPageIndex,
        }}
      />
    </EuiPanel>
  );
};
