import React, { useCallback, useMemo, useState } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiAvatar,
  EuiCheckbox,
} from '../../../../src/components/';

const columns = [
  {
    id: 'avatar',
    initialWidth: 65,
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

for (let i = 1; i < 500; i++) {
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

export default function DataGrid() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });
  const setPageIndex = useCallback(
    pageIndex => setPagination({ ...pagination, pageIndex }),
    [pagination, setPagination]
  );
  const setPageSize = useCallback(
    pageSize => setPagination({ ...pagination, pageSize }),
    [pagination, setPagination]
  );

  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  );

  const [selectedRows, setSelectedRows] = useState(new Set());

  const leadingColumns = useMemo(
    () => [
      {
        id: 'selection',
        width: 31,
        headerCellRender: () => {
          const isIndeterminate =
            selectedRows.size > 0 && selectedRows.size < data.length;
          return (
            <EuiCheckbox
              id="selection-toggle"
              indeterminate={isIndeterminate}
              checked={selectedRows.size > 0}
              onChange={e => {
                if (isIndeterminate) {
                  // clear selection
                  setSelectedRows(new Set());
                } else {
                  if (e.target.checked) {
                    // select everything
                    setSelectedRows(new Set(data.map((_, index) => index)));
                  } else {
                    // clear selection
                    setSelectedRows(new Set());
                  }
                }
              }}
            />
          );
        },
        rowCellRender: ({ rowIndex }) => (
          <EuiCheckbox
            id={`selection-checkbox-${rowIndex}`}
            checked={selectedRows.has(rowIndex)}
            onChange={e => {
              const nextSelectedRows = new Set(selectedRows);
              if (e.target.checked) {
                nextSelectedRows.add(rowIndex);
              } else {
                nextSelectedRows.delete(rowIndex);
              }
              setSelectedRows(nextSelectedRows);
            }}
          />
        ),
        popoverContent: () => <div>Close me, quick!</div>,
      },
    ],
    [selectedRows, setSelectedRows]
  );

  return (
    <div>
      <EuiDataGrid
        aria-label="Top EUI contributors"
        leadingColumns={leadingColumns}
        columns={columns}
        columnVisibility={{
          visibleColumns,
          setVisibleColumns,
        }}
        rowCount={data.length}
        renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
        pagination={{
          ...pagination,
          pageSizeOptions: [5, 15, 25],
          onChangeItemsPerPage: setPageSize,
          onChangePage: setPageIndex,
        }}
      />
    </div>
  );
}
