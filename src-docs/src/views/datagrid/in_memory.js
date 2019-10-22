import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiLink,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components/';
import { EuiRadioGroup } from '../../../../src/components/form/radio';
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

  const [inMemoryLevel, setInMemoryLevel] = useState('off');

  // Sort data
  let data = useMemo(() => {
    // the grid itself is responsible for sorting if inMemory is `sorting`
    if (inMemoryLevel === 'sorting') {
      return raw_data;
    }

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
  }, [raw_data, sortingColumns, inMemoryLevel]);

  // Pagination
  data = useMemo(() => {
    // the grid itself is responsible for sorting if inMemory is sorting or pagination
    if (inMemoryLevel === 'sorting' || inMemoryLevel === 'pagination') {
      return data;
    }

    const rowStart = pagination.pageIndex * pagination.pageSize;
    const rowEnd = Math.min(rowStart + pagination.pageSize, data.length);
    return data.slice(rowStart, rowEnd);
  }, [data, pagination, inMemoryLevel]);

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  ); // initialize to the full set of columns

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId }) => {
      let adjustedRowIndex = rowIndex;

      // If we are doing the pagination (instead of leaving that to the grid)
      // then the row index must be adjusted as `data` has already been pruned to the page size
      if (inMemoryLevel !== 'sorting' && inMemoryLevel !== 'pagination') {
        adjustedRowIndex =
          rowIndex - pagination.pageIndex * pagination.pageSize;
      }

      return data.hasOwnProperty(adjustedRowIndex)
        ? data[adjustedRowIndex][columnId]
        : null;
    };
  }, [data, inMemoryLevel]);

  const inMemoryProps = {};
  if (inMemoryLevel !== 'off') {
    inMemoryProps.inMemory = {
      level: inMemoryLevel,
    };
  }

  return (
    <div>
      <EuiRadioGroup
        compressed={true}
        options={[
          {
            id: 'off',
            label: 'undefined (off)',
            value: 'off',
          },
          {
            id: 'enhancements',
            label: 'only enhancements',
            value: 'enhancements',
          },
          {
            id: 'pagination',
            label: 'only pagination',
            value: 'pagination',
          },
          {
            id: 'sorting',
            label: 'sorting and pagination',
            value: 'sorting',
          },
        ]}
        idSelected={inMemoryLevel}
        onChange={(id, value) => {
          setInMemoryLevel(value);
        }}
      />
      <EuiSpacer />

      <EuiDataGrid
        aria-label="Data grid demo"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        rowCount={raw_data.length}
        renderCellValue={renderCellValue}
        {...inMemoryProps}
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
