import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components/';

const raw_data = [];

for (let i = 1; i < 20; i++) {
  raw_data.push({
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    date: fake('{{date.past}}'),
    amount: fake('${{commerce.price}}'),
    phone: fake('{{phone.phoneNumber}}'),
    version: fake('{{system.semver}}'),
  });
}

const columns = [
  {
    id: 'name',
    displayAsText: 'Name',
    defaultSortDirection: 'asc',
  },
  {
    id: 'date',
    defaultSortDirection: 'desc',
  },
  {
    id: 'amount',
  },
  {
    id: 'phone',
    isSortable: false,
  },
  {
    id: 'version',
    defaultSortDirection: 'desc',
  },
];

const footerCellValues = {
  amount: `Total: $${raw_data.reduce(
    (acc, { amount }) => acc + Number(amount.split('$')[1]),
    0
  )}`,
  version: `Latest: ${
    raw_data.map(({ version }) => version).sort()[raw_data.length - 1]
  }`,
};

export default () => {
  // ** Pagination config
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

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  ); // initialize to the full set of columns

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId, setCellProps }) => {
      useEffect(() => {
        if (columnId === 'amount') {
          if (raw_data.hasOwnProperty(rowIndex)) {
            const numeric = parseFloat(
              raw_data[rowIndex][columnId].match(/\d+\.\d+/)[0],
              10
            );
            setCellProps({
              style: {
                backgroundColor: `rgba(0, 255, 0, ${numeric * 0.0002})`,
              },
            });
          }
        }
      }, [rowIndex, columnId, setCellProps]);

      return raw_data.hasOwnProperty(rowIndex)
        ? raw_data[rowIndex][columnId]
        : null;
    };
  }, []);

  const renderFooterCellValue = useCallback(
    ({ columnId }) => footerCellValues[columnId] || null,
    []
  );

  // Footer row
  const [showFooterRow, setShowFooterRow] = useState(true);

  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem>
        <EuiSwitch
          label="Show footer row"
          checked={showFooterRow}
          onChange={(e) => setShowFooterRow(e.target.checked)}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiDataGrid
          aria-label="Data grid footer row demo"
          columns={columns}
          columnVisibility={{ visibleColumns, setVisibleColumns }}
          rowCount={raw_data.length}
          renderCellValue={renderCellValue}
          renderFooterCellValue={
            showFooterRow ? renderFooterCellValue : undefined
          }
          pagination={{
            ...pagination,
            pageSizeOptions: [10, 15, 20],
            onChangeItemsPerPage: onChangeItemsPerPage,
            onChangePage: onChangePage,
          }}
          onColumnResize={(eventData) => {
            console.log(eventData);
          }}
          gridStyle={{
            border: 'horizontal',
            rowHover: 'highlight',
            header: 'underline',
          }}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
