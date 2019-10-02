import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fake } from 'faker';

import {
  EuiButton,
  EuiDataGrid,
  EuiButtonIcon,
  EuiLink,
  EuiPopover,
} from '../../../../src/components/';
import { iconTypes } from '../../../../src-docs/src/views/icon/icons';
import { EuiRadioGroup } from '../../../../src/components/form/radio';

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

for (let i = 1; i < 1000; i++) {
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
    amount: fake('{{finance.currencySymbol}}{{finance.amount}}'),
    phone: fake('{{phone.phoneNumber}}'),
    version: fake('{{system.semver}}'),
  });
}

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // ** Pagination config
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 });
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

  const [inMemoryLevel, setInMemoryLevel] = useState('');

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

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId, setCellProps }) => {
      let adjustedRowIndex = rowIndex;

      // If we are doing the pagination (instead of leaving that to the grid)
      // then the row index must be adjusted as `data` has already been pruned to the page size
      if (inMemoryLevel !== 'sorting' && inMemoryLevel !== 'pagination') {
        adjustedRowIndex =
          rowIndex - pagination.pageIndex * pagination.pageSize;
      }

      useEffect(() => {
        if (columnId === 'amount') {
          if (data.hasOwnProperty(adjustedRowIndex)) {
            const numeric = parseFloat(
              data[adjustedRowIndex][columnId].match(/\d+\.\d+/)[0],
              10
            );
            setCellProps({
              style: {
                backgroundColor: `rgba(0, ${(numeric / 1000) * 255}, 0, 0.2)`,
              },
            });
          }
        }
      }, [adjustedRowIndex, columnId, setCellProps]);

      return data.hasOwnProperty(adjustedRowIndex)
        ? data[adjustedRowIndex][columnId]
        : null;
    };
  }, [data, inMemoryLevel]);

  const inMemoryProps = {};
  if (inMemoryLevel !== '') {
    inMemoryProps.inMemory = {
      level: inMemoryLevel,
    };
  }

  return (
    <div>
      <EuiPopover
        isOpen={isPopoverOpen}
        button={
          <EuiButton onClick={() => setIsPopoverOpen(state => !state)}>
            inMemory options
          </EuiButton>
        }
        closePopover={() => setIsPopoverOpen(false)}>
        <EuiRadioGroup
          compressed={true}
          options={[
            {
              id: '',
              label: 'off',
              value: '',
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
            setInMemoryLevel(value === '' ? undefined : value);
            setIsPopoverOpen(false);
          }}
        />
      </EuiPopover>

      <EuiDataGrid
        aria-label="Data grid demo"
        columns={columns}
        rowCount={raw_data.length}
        renderCellValue={renderCellValue}
        {...inMemoryProps}
        sorting={{ columns: sortingColumns, onSort }}
        pagination={{
          ...pagination,
          pageSizeOptions: [10, 25, 50, 100],
          onChangeItemsPerPage: onChangeItemsPerPage,
          onChangePage: onChangePage,
        }}
      />
    </div>
  );
};
