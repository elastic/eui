import React, { useState, useCallback, useMemo } from 'react';
import { faker } from '@faker-js/faker';

import { EuiDataGrid, EuiIcon } from '../../../../../src';

const columns = [
  { id: 'name' },
  { id: 'email' },
  { id: 'city' },
  { id: 'country' },
  { id: 'account' },
];
const data = [];
for (let i = 1; i <= 5; i++) {
  data.push({
    name: `${faker.name.lastName()}, ${faker.name.firstName()} ${faker.name.suffix()}`,
    email: faker.internet.email(),
    city: faker.address.city(),
    country: faker.address.country(),
    account: faker.finance.account(),
  });
}

const GRID_STYLES_KEY = 'euiDataGridStyles';
const INITIAL_STYLES = JSON.stringify({ stripes: true });

const ROW_HEIGHTS_KEY = 'euiDataGridRowHeightsOptions';
const INITIAL_ROW_HEIGHTS = JSON.stringify({});

export default () => {
  const [densitySize, setDensitySize] = useState('');
  const responsiveIcon = useCallback(
    () => <EuiIcon type="user" size={densitySize} />,
    [densitySize]
  );
  const responsiveIconWidth = useMemo(() => {
    if (densitySize === 'l') return 44;
    if (densitySize === 's') return 24;
    return 32;
  }, [densitySize]);
  const leadingControlColumns = useMemo(
    () => [
      {
        id: 'icon',
        width: responsiveIconWidth,
        headerCellRender: responsiveIcon,
        rowCellRender: responsiveIcon,
      },
    ],
    [responsiveIcon, responsiveIconWidth]
  );

  const storedRowHeightsOptions = useMemo(
    () =>
      JSON.parse(localStorage.getItem(ROW_HEIGHTS_KEY) || INITIAL_ROW_HEIGHTS),
    []
  );
  const storeRowHeightsOptions = useCallback((updatedRowHeights) => {
    console.log(updatedRowHeights);
    localStorage.setItem(ROW_HEIGHTS_KEY, JSON.stringify(updatedRowHeights));
  }, []);

  const storedGridStyles = useMemo(
    () => JSON.parse(localStorage.getItem(GRID_STYLES_KEY) || INITIAL_STYLES),
    []
  );
  const storeGridStyles = useCallback((updatedStyles) => {
    console.log(updatedStyles);
    localStorage.setItem(GRID_STYLES_KEY, JSON.stringify(updatedStyles));
    setDensitySize(updatedStyles.fontSize);
  }, []);

  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  return (
    <EuiDataGrid
      aria-label="DataGrid demonstrating display selector callbacks"
      leadingControlColumns={leadingControlColumns}
      rowHeightsOptions={{
        ...storedRowHeightsOptions,
        onChange: storeRowHeightsOptions,
      }}
      gridStyle={{
        ...storedGridStyles,
        onChange: storeGridStyles,
      }}
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={data.length}
      renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
    />
  );
};
