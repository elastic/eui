import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';
import { EuiDataGrid, EuiLink } from '../../../../../src';

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
    name: `${faker.name.lastName()}, ${faker.name.firstName()} ${faker.name.suffix()}`,
    email: <EuiLink href="">{faker.internet.email()}</EuiLink>,
    location: (
      <Fragment>
        {`${faker.address.city()}, `}
        <EuiLink href="https://google.com">{faker.address.country()}</EuiLink>
      </Fragment>
    ),
    date: `${faker.date.past()}`,
    account: faker.finance.account(),
    amount: faker.commerce.price(),
    phone: faker.phone.number(),
    version: faker.system.semver(),
  });
}

export default () => {
  // Pagination
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const onChangeItemsPerPage = useCallback(
    (pageSize) =>
      setPagination((pagination) => ({
        ...pagination,
        pageSize,
        pageIndex: 0,
      })),
    [setPagination]
  );
  const onChangePage = useCallback(
    (pageIndex) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  // Sorting
  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    (sortingColumns) => {
      setSortingColumns(sortingColumns);
    },
    [setSortingColumns]
  );

  // Sort data
  let data = useMemo(() => {
    // the grid itself is responsible for sorting if inMemory is `sorting`

    return [...raw_data].sort((a, b) => {
      for (let i = 0; i < sortingColumns.length; i++) {
        const column = sortingColumns[i];
        const aValue = a[column.id];
        const bValue = b[column.id];

        if (aValue < bValue) return column.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return column.direction === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }, [sortingColumns]);

  // Pagination
  data = useMemo(() => {
    const rowStart = pagination.pageIndex * pagination.pageSize;
    const rowEnd = Math.min(rowStart + pagination.pageSize, data.length);
    return data.slice(rowStart, rowEnd);
  }, [data, pagination]);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId }) => {
      // Because inMemory is not set for pagination, we need to manage it
      // The row index must be adjusted as `data` has already been pruned to the page size
      const adjustedRowIndex =
        rowIndex - pagination.pageIndex * pagination.pageSize;

      return data.hasOwnProperty(adjustedRowIndex)
        ? data[adjustedRowIndex][columnId]
        : null;
    };
  }, [data, pagination.pageIndex, pagination.pageSize]);

  return (
    <div>
      <EuiDataGrid
        aria-label="Data grid enhanced in-memory demo"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        rowCount={raw_data.length}
        renderCellValue={renderCellValue}
        inMemory={{ level: 'enhancements' }}
        sorting={{ columns: sortingColumns, onSort }}
        pagination={{
          ...pagination,
          pageSizeOptions: [10, 50, 100],
          onChangeItemsPerPage: onChangeItemsPerPage,
          onChangePage: onChangePage,
        }}
      />
    </div>
  );
};
