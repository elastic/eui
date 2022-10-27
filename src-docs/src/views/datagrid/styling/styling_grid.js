import React, { useState, useCallback } from 'react';
import { faker } from '@faker-js/faker';

import { EuiDataGrid, EuiAvatar } from '../../../../../src/components';

const columns = [
  {
    id: 'avatar',
    initialWidth: 40,
  },
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

for (let i = 1; i < 6; i++) {
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

const footerCellValues = {
  name: '5 accounts',
};

const renderFooterCellValue = ({ columnId }) =>
  footerCellValues[columnId] || null;

const DataGridStyle = ({
  border = 'none',
  fontSize = 'm',
  cellPadding = 'm',
  stripes = true,
  rowHover = 'highlight',
  header = 'underline',
  footer = 'overline',
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const setPageIndex = useCallback(
    (pageIndex) => {
      setPagination({ ...pagination, pageIndex });
    },
    [pagination, setPagination]
  );

  const setPageSize = useCallback(
    (pageSize) => {
      setPagination({ ...pagination, pageSize, pageIndex: 0 });
    },
    [pagination, setPagination]
  );

  const handleVisibleColumns = (visibleColumns) =>
    setVisibleColumns(visibleColumns);

  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    (sortingColumns) => setSortingColumns(sortingColumns),
    [setSortingColumns]
  );

  return (
    <EuiDataGrid
      aria-label="Data grid styling demo"
      columns={columns}
      columnVisibility={{
        visibleColumns: visibleColumns,
        setVisibleColumns: handleVisibleColumns,
      }}
      sorting={{ columns: sortingColumns, onSort }}
      rowCount={data.length}
      gridStyle={{
        border: border,
        fontSize: fontSize,
        cellPadding: cellPadding,
        stripes: stripes,
        rowHover: rowHover,
        header: header,
        footer: footer,
      }}
      renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
      renderFooterCellValue={renderFooterCellValue}
      pagination={{
        ...pagination,
        pageSizeOptions: [5, 10, 25],
        onChangeItemsPerPage: setPageSize,
        onChangePage: setPageIndex,
      }}
    />
  );
};

export default DataGridStyle;
