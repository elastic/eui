import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

import { EuiDataGrid } from '../../../../../src';

const columns = [
  {
    id: 'default',
  },
  {
    id: 'boolean',
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
  storeData.push({
    default: `${faker.name.lastName()}, ${faker.name.firstName()} ${faker.name.suffix()}`,
    boolean: `${faker.datatype.boolean()}`,
    numeric: faker.finance.account(),
    currency: faker.finance.amount(),
    datetime: `${faker.date.past()}`,
    json: JSON.stringify([
      {
        default: `${faker.name.lastName()}, ${faker.name.firstName()} ${faker.name.suffix()}`,
        boolean: `${faker.datatype.boolean()}`,
        numeric: faker.finance.account(),
        currency: faker.finance.amount(),
        date: `${faker.date.past()}`,
        custom: `${faker.date.past()}`,
      },
    ]),
    custom: i % 2 === 0 ? 'Star Wars' : 'Star Trek',
  });
}

const commaSeparateNumbers = (numberString) => {
  // extract the groups-of-three digits that are right-aligned
  return numberString.replace(/((\d{3})+)$/, (match) =>
    // then replace each group of xyz digits with ,xyz
    match.replace(/(\d{3})/g, ',$1')
  );
};

export default () => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const [data, setData] = useState(storeData);
  const [sortingColumns, setSortingColumns] = useState([
    { id: 'custom', direction: 'asc' },
  ]);

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

  return (
    <EuiDataGrid
      aria-label="Data grid schema example"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={data.length}
      inMemory={{ level: 'sorting' }}
      renderCellValue={({ rowIndex, columnId, schema }) => {
        let value = data[rowIndex][columnId];

        if (schema === 'numeric') {
          value = commaSeparateNumbers(value);
        }

        return value;
      }}
      sorting={{ columns: sortingColumns, onSort: setSorting }}
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
    />
  );
};
