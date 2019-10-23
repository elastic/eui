import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { fake } from 'faker';

import { EuiDataGrid, EuiLink } from '../../../../src/components/';

const columns = [
  {
    id: 'name',
  },
  {
    id: 'email',
  },
  {
    id: 'location',
  },
  {
    id: 'account',
  },
  {
    id: 'date',
  },
  {
    id: 'amount',
  },
  {
    id: 'phone',
  },
  {
    id: 'version',
  },
];

const raw_data = [];

for (let i = 1; i < 100; i++) {
  raw_data.push({
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: <EuiLink href="">{fake('{{internet.email}}')}</EuiLink>,
    location: (
      <Fragment>
        {`${fake('{{address.city}}')}, `}
        <EuiLink href="https://google.com">
          {fake('{{address.country}}')}
        </EuiLink>
      </Fragment>
    ),
    date: fake('{{date.past}}'),
    account: fake('{{finance.account}}'),
    amount: fake('${{commerce.price}}'),
    phone: fake('{{phone.phoneNumber}}'),
    version: fake('{{system.semver}}'),
  });
}

export default () => {
  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const onChangeItemsPerPage = useCallback(
    pageSize => setPagination(pagination => ({ ...pagination, pageSize })),
    [setPagination]
  );
  const onChangePage = useCallback(
    pageIndex => setPagination(pagination => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  // ** Sorting config
  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    sortingColumns => {
      setSortingColumns(sortingColumns);
    },
    [setSortingColumns]
  );

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  ); // initialize to the full set of columns

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId }) => {
      return raw_data.hasOwnProperty(rowIndex)
        ? raw_data[rowIndex][columnId]
        : null;
    };
  }, [raw_data]);

  return (
    <EuiDataGrid
      aria-label="Data grid demo"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={raw_data.length}
      renderCellValue={renderCellValue}
      inMemory={{ level: 'sorting' }}
      sorting={{ columns: sortingColumns, onSort }}
      pagination={{
        ...pagination,
        pageSizeOptions: [10, 50, 100],
        onChangeItemsPerPage: onChangeItemsPerPage,
        onChangePage: onChangePage,
      }}
    />
  );
};
