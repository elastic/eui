import React, { useState, useCallback } from 'react';
import { fake } from 'faker';

import { EuiDataGrid, EuiAvatar } from '../../../../src/components/';
import { EuiButton } from '../../../../src/components/button';

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
    cellActions: [
      {
        iconType: 'heart',
        label: 'Send love',
        callback: (rowIndex, colIndex) =>
          alert(`Love sent from row ${rowIndex + 1}, column "${colIndex}"`),
      },
    ],
  },
  {
    id: 'city',
    isSortable: true,
    cellActions: [
      {
        iconType: 'cheer',
        label: 'Cheer the city',
        callback: (rowIndex, columnId) =>
          alert(`Cheers sent from row ${rowIndex + 1}, column "${columnId}"`),
        inPopoverButton: (rowIndex, columnId) => (
          <EuiButton
            onClick={() =>
              alert(
                `Cheers sent in Popover to row "${rowIndex +
                  1}" column "${columnId}"`
              )
            }>
            Cheer
          </EuiButton>
        ),
      },
    ],
  },
  {
    id: 'country',
    cellActions: [
      {
        iconType: 'heart',
        label: 'Love this city',
        callback: (rowIndex, colIndex) =>
          alert(`Love sent from row ${rowIndex + 1}, column "${colIndex}"`),
      },
      {
        iconType: 'brush',
        label: 'Paint this city',
        callback: (rowIndex, colIndex) =>
          alert(`Paint sent from row ${rowIndex + 1}, column "${colIndex}"`),
      },
    ],
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
        imageUrl={fake('{{internet.avatar}}')}
        name={fake('{{name.lastName}}, {{name.firstName}}')}
      />
    ),
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: fake('{{internet.email}}'),
    city: fake('{{address.city}}'),
    country: fake('{{address.country}}'),
    account: fake('{{finance.account}}'),
  });
}

export default () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  );

  const setPageIndex = useCallback(
    pageIndex => setPagination({ ...pagination, pageIndex }),
    [pagination, setPagination]
  );
  const setPageSize = useCallback(
    pageSize => setPagination({ ...pagination, pageSize, pageIndex: 0 }),
    [pagination, setPagination]
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
        pageSizeOptions: [5, 10, 25],
        onChangeItemsPerPage: setPageSize,
        onChangePage: setPageIndex,
      }}
    />
  );
};
