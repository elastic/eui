import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiLink,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components/';
import { EuiButtonIcon } from '../../../../src/components/button/button_icon';

const columns = [
  {
    id: 'name',
  },
  {
    id: 'email',
    display: (
      // This is an example of an icon next to a title that still respects text truncate
      <EuiFlexGroup gutterSize="xs">
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

  // Sort data
  const data = useMemo(() => {
    // the grid itself is responsible for sorting if inMemory is `sorting`
    return raw_data;
  }, [raw_data, sortingColumns]);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  ); // initialize to the full set of columns

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId, setCellProps }) => {
      let adjustedRowIndex = rowIndex;

      adjustedRowIndex = rowIndex - pagination.pageIndex * pagination.pageSize;

      useEffect(() => {
        if (columnId === 'amount') {
          if (data.hasOwnProperty(adjustedRowIndex)) {
            const numeric = parseFloat(
              data[adjustedRowIndex][columnId].match(/\d+\.\d+/)[0],
              10
            );
            setCellProps({
              style: {
                backgroundColor: `rgba(0, 255, 0, ${numeric * 0.0002})`,
              },
            });
          }
        }
      }, [adjustedRowIndex, columnId, setCellProps]);

      return data.hasOwnProperty(adjustedRowIndex)
        ? data[adjustedRowIndex][columnId]
        : null;
    };
  }, [data]);

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
