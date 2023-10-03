import React, { useCallback, useState } from 'react';
import { css } from '@emotion/react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiDataGridSorting,
  EuiDataGridColumnSortingConfig,
  EuiDataGridToolbarProps,
  EuiButtonEmpty,
  EuiFormRow,
  EuiRange,
  EuiFlexGroup,
  EuiFlexItem,
  euiScreenReaderOnly,
} from '../../../../../src';

const raw_data: Array<{ [key: string]: string }> = [];
for (let i = 0; i < 5; i++) {
  raw_data.push({
    name: `${faker.person.lastName()}, ${faker.person.firstName()}`,
    email: faker.internet.email(),
    location: `${faker.location.city()}, ${faker.location.country()}`,
    date: `${faker.date.past()}`,
    amount: faker.commerce.price({ min: 1, max: 1000, dec: 2, symbol: '$' }),
  });
}
const columns = [
  { id: 'name', displayAsText: 'Name' },
  { id: 'email', displayAsText: 'Email address' },
  { id: 'location', displayAsText: 'Location' },
  { id: 'date', displayAsText: 'Date' },
  { id: 'amount', displayAsText: 'Amount' },
];

// Custom toolbar renderer
const renderCustomToolbar: EuiDataGridToolbarProps['renderCustomToolbar'] = ({
  hasRoomForGridControls,
  columnControl,
  columnSortingControl,
  displayControl,
  fullScreenControl,
  keyboardShortcutsControl,
}) => {
  const mobileStyles =
    !hasRoomForGridControls &&
    css`
      .euiDataGrid__controlBtn .euiButtonEmpty__text {
        ${euiScreenReaderOnly()}
      }
    `;
  return (
    <EuiFlexGroup
      responsive={false}
      gutterSize="s"
      justifyContent="spaceBetween"
      alignItems="center"
      css={mobileStyles}
    >
      <EuiFlexItem grow={false}>
        {hasRoomForGridControls && (
          <EuiButtonEmpty size="xs" color="primary">
            Custom left side
          </EuiButtonEmpty>
        )}
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>{columnControl}</EuiFlexItem>
          <EuiFlexItem grow={false}>{columnSortingControl}</EuiFlexItem>
          <EuiFlexItem grow={false}>{keyboardShortcutsControl}</EuiFlexItem>
          <EuiFlexItem grow={false}>{displayControl}</EuiFlexItem>
          <EuiFlexItem grow={false}>{fullScreenControl}</EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

// Some additional custom settings to show in the Display popover
const AdditionalDisplaySettings = () => {
  const [exampleSettingValue, setExampleSettingValue] = useState<number>(10);

  return (
    <EuiFormRow label="Example additional setting" display="columnCompressed">
      <EuiRange
        compressed
        fullWidth
        showInput
        min={1}
        max={100}
        step={1}
        value={exampleSettingValue}
        data-test-subj="exampleAdditionalSetting"
        onChange={(event) => {
          setExampleSettingValue(Number(event.currentTarget.value));
        }}
      />
    </EuiFormRow>
  );
};

export default () => {
  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  );

  // Sorting
  const [sortingColumns, setSortingColumns] = useState<
    EuiDataGridColumnSortingConfig[]
  >([]);
  const onSort = useCallback<EuiDataGridSorting['onSort']>((sortingColumns) => {
    setSortingColumns(sortingColumns);
  }, []);

  return (
    <EuiDataGrid
      aria-label="Data grid custom toolbar demo"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      sorting={{ columns: sortingColumns, onSort }}
      rowCount={raw_data.length}
      renderCellValue={({ rowIndex, columnId }) => raw_data[rowIndex][columnId]}
      gridStyle={{ border: 'none', header: 'underline' }}
      renderCustomToolbar={renderCustomToolbar}
      toolbarVisibility={{
        showDisplaySelector: {
          allowResetButton: false,
          additionalDisplaySettings: <AdditionalDisplaySettings />,
        },
      }}
    />
  );
};
