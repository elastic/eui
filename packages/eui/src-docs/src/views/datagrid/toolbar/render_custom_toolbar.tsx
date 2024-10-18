import React, { useCallback, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiDataGridSorting,
  EuiDataGridColumnSortingConfig,
  EuiDataGridToolbarProps,
  EuiDataGridToolbarControl,
  EuiDataGridStyle,
  EuiDataGridStyleBorders,
  EuiDataGridDisplaySelectorCustomRender,
  EuiSpacer,
  EuiHorizontalRule,
  EuiFormRow,
  EuiButtonGroup,
  EuiFlexGroup,
  EuiFlexItem,
  euiScreenReaderOnly,
  RenderCellValue,
  EuiSwitch,
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
      .euiDataGridToolbarControl__text {
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
      className="euiDataGrid__controls"
    >
      <EuiFlexItem grow={false}>
        {hasRoomForGridControls && (
          <EuiDataGridToolbarControl
            iconType="brush"
            badgeContent={10}
            onClick={() => {}}
          >
            Custom left side
          </EuiDataGridToolbarControl>
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

const renderCellValue: RenderCellValue = ({ rowIndex, columnId }) =>
  raw_data[rowIndex][columnId];

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

  // Custom display settings
  const [borders, setGridBorders] = useState<EuiDataGridStyleBorders>('none');
  const [rowStripes, setRowStripes] = useState(false);
  const gridStyle: EuiDataGridStyle = useMemo(
    () => ({
      border: borders,
      header: borders === 'none' ? 'underline' : 'shade',
      stripes: rowStripes,
    }),
    [borders, rowStripes]
  );
  const customDisplayControls: EuiDataGridDisplaySelectorCustomRender =
    useCallback(
      ({ densityControl, rowHeightControl }) => {
        return (
          <>
            <EuiSpacer size="xs" />
            <EuiSwitch
              label="Show row stripes"
              checked={rowStripes}
              onChange={() => setRowStripes(!rowStripes)}
            />
            <EuiHorizontalRule margin="s" />
            {densityControl}
            <EuiFormRow label="Border" display="columnCompressed">
              <EuiButtonGroup
                isFullWidth
                buttonSize="compressed"
                legend="Border"
                options={[
                  { id: 'all', label: 'All' },
                  { id: 'horizontal', label: 'Horizontal only' },
                  { id: 'none', label: 'None' },
                ]}
                idSelected={borders}
                onChange={(id) => setGridBorders(id as EuiDataGridStyleBorders)}
              />
            </EuiFormRow>
            {rowHeightControl}
          </>
        );
      },
      [borders, rowStripes]
    );

  return (
    <EuiDataGrid
      aria-label="Data grid custom toolbar demo"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      sorting={{ columns: sortingColumns, onSort }}
      rowCount={raw_data.length}
      renderCellValue={renderCellValue}
      gridStyle={gridStyle}
      renderCustomToolbar={renderCustomToolbar}
      toolbarVisibility={{
        showDisplaySelector: {
          allowResetButton: false,
          customRender: customDisplayControls,
        },
      }}
    />
  );
};
