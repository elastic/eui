import React, { useState, useCallback } from 'react';
import { fake } from 'faker';

import { EuiDataGrid, EuiAvatar } from '../../../../src/components/';

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
      ({ rowIndex, columnId, Component, closePopover }) => {
        const row = ++rowIndex;
        return (
          <Component
            onClick={() => {
              alert(`Love sent from row ${row}, column "${columnId}"`);
              closePopover();
            }}
            iconType="heart"
            aria-label={`Send love to ${row}, column "${columnId}" `}
          >
            Send love
          </Component>
        );
      },
    ],
  },
  {
    id: 'city',
    isSortable: true,
    cellActions: [
      ({ rowIndex, columnId, Component, isExpanded }) => {
        const row = ++rowIndex;
        const message = isExpanded
          ? `Cheers sent in Popover to row "${row}" column "${columnId}"`
          : `Cheers sent from row ${row}, column "${columnId}"`;

        return (
          <Component
            onClick={() => alert(message)}
            iconType="cheer"
            aria-label={message}
          >
            Cheer
          </Component>
        );
      },
    ],
  },
  {
    id: 'country',
    cellActions: [
      ({ rowIndex, columnId, Component }) => {
        const row = ++rowIndex;
        const label = `Love sent from row ${row}, column "${columnId}"`;
        return (
          <Component
            onClick={() =>
              alert(`Love sent from row ${row}, column "${columnId}"`)
            }
            iconType="heart"
            aria-label={label}
          >
            Love this city
          </Component>
        );
      },
      ({ rowIndex, columnId, Component }) => {
        const row = ++rowIndex;
        const label = `Paint country at row ${row}, column "${columnId}"`;
        return (
          <Component
            onClick={() =>
              alert(`Paint sent from row ${row}, column "${columnId}"`)
            }
            iconType="brush"
            aria-label={label}
          >
            Paint this city
          </Component>
        );
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
    (pageIndex) => setPagination({ ...pagination, pageIndex }),
    [pagination, setPagination]
  );
  const setPageSize = useCallback(
    (pageSize) => setPagination({ ...pagination, pageSize, pageIndex: 0 }),
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
