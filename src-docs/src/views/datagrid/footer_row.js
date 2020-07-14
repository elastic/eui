import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiLink,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
  EuiSwitch,
} from '../../../../src/components/';

const raw_data = [];

for (let i = 1; i < 20; i++) {
  raw_data.push({
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: <EuiLink href="">{fake('{{internet.email}}')}</EuiLink>,
    location: (
      <>
        {`${fake('{{address.city}}')}, `}
        <EuiLink href="https://google.com">
          {fake('{{address.country}}')}
        </EuiLink>
      </>
    ),
    date: fake('{{date.past}}'),
    account: fake('{{finance.account}}'),
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
    id: 'email',
    display: (
      // This is an example of an icon next to a title that still respects text truncate
      <EuiFlexGroup gutterSize="xs" responsive={false}>
        <EuiFlexItem className="eui-textTruncate">
          <div className="eui-textTruncate">email</div>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            aria-label="Column header email"
            iconType="gear"
            color="text"
            onClick={() => alert('Email Icon Clicked!')}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    ),
  },
  {
    id: 'location',
  },
  {
    id: 'account',
  },
  {
    id: 'date',
    defaultSortDirection: 'desc',
  },
  {
    id: 'amount',
    footerCellValue: `Total: $${raw_data.reduce(
      (acc, { amount }) => acc + Number(amount.split('$')[1]),
      0
    )}`,
  },
  {
    id: 'phone',
    isSortable: false,
  },
  {
    id: 'version',
    defaultSortDirection: 'desc',
    initialWidth: 65,
    isResizable: false,
    footerCellValue: `Latest: ${
      raw_data.map(({ version }) => version).sort()[raw_data.length - 1]
    }`,
  },
];

export default () => {
  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const onChangeItemsPerPage = useCallback(
    pageSize =>
      setPagination(pagination => ({ ...pagination, pageSize, pageIndex: 0 })),
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

  const renderFooterCellValue = useMemo(() => {
    return ({ columnId }) => {
      return columns.find(col => col.id === columnId).footerCellValue || null;
    };
  }, []);

  // Footer row
  const [showFooterRow, setShowFooterRow] = useState(false);

  return (
    <EuiDataGrid
      aria-label="Data grid demo"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={raw_data.length}
      renderCellValue={renderCellValue}
      renderFooterCellValue={showFooterRow ? renderFooterCellValue : undefined}
      inMemory={{ level: 'sorting' }}
      sorting={{ columns: sortingColumns, onSort }}
      pagination={{
        ...pagination,
        pageSizeOptions: [10, 15, 20],
        onChangeItemsPerPage: onChangeItemsPerPage,
        onChangePage: onChangePage,
      }}
      onColumnResize={eventData => {
        console.log(eventData);
      }}
      toolbarVisibility={{
        additionalControls: (
          <EuiSwitch
            label="Show footer row"
            checked={showFooterRow}
            onChange={e => setShowFooterRow(e.target.checked)}
          />
        ),
      }}
    />
  );
};
