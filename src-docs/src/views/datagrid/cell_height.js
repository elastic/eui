import React, { useState, useCallback } from 'react';
import { fake } from 'faker';

import { EuiDataGrid, EuiAvatar, EuiMark } from '../../../../src/components/';

const columns = [
  {
    id: 'avatar',
    initialWidth: 80,
    isResizable: false,
    isExpandable: false,
  },
  {
    id: 'team',
    initialWidth: 100,
  },
  {
    id: 'members',
    isExpandable: false,
    isTruncating: false,
  },
];

const data = [];

for (let i = 1; i < 100; i++) {
  const subdata = [];
  for (let x = 1; x < 50; x++) {
    subdata.push(
      <>
        {fake('{{name.firstName}}')}{' '}
        <EuiMark>{fake('{{name.lastName}}')}</EuiMark>,{' '}
      </>
    );
  }

  data.push({
    avatar: (
      <EuiAvatar
        size="xl"
        name={fake('{{name.lastName}}, {{name.firstName}}')}
      />
    ),
    team: fake('{{company.companyName}}'),
    members: (
      <div>
        {subdata.map((sub, idx) => (
          <span key={idx}>{sub}</span>
        ))}
      </div>
    ),
  });
}

export default () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

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
      defaultColumnHeight={126}
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
