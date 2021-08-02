import React, { useState, useCallback } from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiImage,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components/';

const columns = [
  {
    id: 'default',
  },
  {
    id: 'boolean',
    isExpandable: false,
  },
  {
    id: 'numeric',
  },
  {
    id: 'currency',
  },
  {
    id: 'datetime',
    schema: 'datetime',
  },
  {
    id: 'json',
  },
  {
    id: 'custom',
    schema: 'favoriteFranchise',
  },
];

const storeData = [];

for (let i = 1; i < 5; i++) {
  let json;
  let franchise;
  if (i < 3) {
    franchise = 'Star Wars';
    json = JSON.stringify([
      {
        default: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
        boolean: fake('{{random.boolean}}'),
        numeric: fake('{{finance.account}}'),
        currency: fake('${{finance.amount}}'),
        date: fake('{{date.past}}'),
        custom: fake('{{date.past}}'),
      },
    ]);
  } else {
    franchise = 'Star Trek';
    json = JSON.stringify([
      {
        name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
      },
    ]);
  }

  storeData.push({
    default: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    boolean: fake('{{random.boolean}}'),
    numeric: fake('{{finance.account}}'),
    currency: fake('${{finance.amount}}'),
    datetime: fake('{{date.past}}'),
    json: json,
    custom: franchise,
  });
}

const Franchise = (props) => {
  return (
    <div>
      <EuiTitle size="s">
        <h3>{props.name} is the best!</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      {props.name === 'Star Wars' ? (
        <EuiImage
          allowFullScreen
          size="m"
          hasShadow
          caption="Random star wars image"
          alt="Random star wars image"
          url="https://source.unsplash.com/600x600/?starwars"
        />
      ) : (
        <EuiImage
          allowFullScreen
          size="m"
          hasShadow
          caption="Random star trek image"
          alt="Random trek image"
          url="https://source.unsplash.com/600x600/?startrek"
        />
      )}
    </div>
  );
};

const DataGridSchema = () => {
  const [data, setData] = useState(storeData);

  const [sortingColumns, setSortingColumns] = useState([
    { id: 'custom', direction: 'asc' },
  ]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const setSorting = (sortingColumns) => {
    const sortedData = [...data].sort((a, b) => {
      for (let i = 0; i < sortingColumns.length; i++) {
        const column = sortingColumns[i];
        const aValue = a[column.id];
        const bValue = b[column.id];

        if (aValue < bValue) return column.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return column.direction === 'asc' ? 1 : -1;
      }

      return 0;
    });

    setData(sortedData);
    setSortingColumns(sortingColumns);
  };

  const setPageIndex = useCallback(
    (pageIndex) => {
      setPagination({ ...pagination, pageIndex });
    },
    [pagination, setPagination]
  );

  const setPageSize = useCallback(
    (pageSize) => {
      setPagination({ ...pagination, pageIndex: 0, pageSize });
    },
    [pagination, setPagination]
  );

  const handleVisibleColumns = (visibleColumns) =>
    setVisibleColumns(visibleColumns);

  return (
    <EuiDataGrid
      aria-label="Top EUI contributors"
      columns={columns}
      columnVisibility={{
        visibleColumns: visibleColumns,
        setVisibleColumns: handleVisibleColumns,
      }}
      rowCount={data.length}
      inMemory={{ level: 'sorting' }}
      renderCellValue={({ rowIndex, columnId, isDetails }) => {
        const value = data[rowIndex][columnId];

        if (columnId === 'custom' && isDetails) {
          return <Franchise name={value} />;
        }

        return value;
      }}
      sorting={{ columns: sortingColumns, onSort: setSorting }}
      pagination={{
        ...pagination,
        pageSizeOptions: [5, 10, 25],
        onChangeItemsPerPage: setPageSize,
        onChangePage: setPageIndex,
      }}
      schemaDetectors={[
        {
          type: 'favoriteFranchise',
          textTransform: 'capitalize',
          detector(value) {
            return value.toLowerCase() === 'star wars' ||
              value.toLowerCase() === 'star trek'
              ? 1
              : 0;
          },
          comparator(a, b, direction) {
            const aValue = a.toLowerCase() === 'star wars';
            const bValue = b.toLowerCase() === 'star wars';
            if (aValue < bValue) return direction === 'asc' ? 1 : -1;
            if (aValue > bValue) return direction === 'asc' ? -1 : 1;
            return 0;
          },
          sortTextAsc: 'Star wars-Star trek',
          sortTextDesc: 'Star trek-Star wars',
          icon: 'starFilled',
          color: '#800080',
        },
      ]}
      popoverContents={{
        numeric: ({ cellContentsElement }) => {
          // want to process the already-rendered cell value
          const stringContents = cellContentsElement.textContent;

          // extract the groups-of-three digits that are right-aligned
          return stringContents.replace(/((\d{3})+)$/, (match) =>
            // then replace each group of xyz digits with ,xyz
            match.replace(/(\d{3})/g, ',$1')
          );
        },
      }}
    />
  );
};
export default DataGridSchema;
