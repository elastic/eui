import React, { useCallback, useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiCheckbox,
  EuiButtonIcon,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../../src';

const raw_data = [];

for (let i = 1; i < 20; i++) {
  raw_data.push({
    name: `${faker.name.lastName()}, ${faker.name.firstName()} ${faker.name.suffix()}`,
    date: `${faker.date.past()}`,
    amount: `$${faker.commerce.price()}`,
    phone: faker.phone.number(),
    version: faker.system.semver(),
  });
}

const RenderCellValue = ({ rowIndex, columnId, setCellProps }) => {
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

const leadingControlColumns = [
  {
    id: 'selection',
    width: 32,
    // Check state doesn't actually work - this is just a static example
    headerCellRender: () => (
      <EuiCheckbox
        id="selectAllHeader"
        aria-label="Select all rows"
        onChange={() => {}}
      />
    ),
    rowCellRender: ({ rowIndex }) => (
      <EuiCheckbox
        id={`selectRow${rowIndex}`}
        aria-label="Select this row"
        onChange={() => {}}
      />
    ),
    footerCellRender: () => (
      <EuiCheckbox
        id="selectAllFooter"
        aria-label="Select all rows"
        onChange={() => {}}
      />
    ),
  },
];
const trailingControlColumns = [
  {
    id: 'actions',
    width: 36,
    headerCellRender: () => (
      <span className="euiScreenReaderOnly">Actions</span>
    ),
    rowCellRender: () => (
      <EuiButtonIcon aria-label="Show actions" iconType="boxesHorizontal" />
    ),
  },
];

const footerCellValues = {
  amount: `Total: ${raw_data
    .reduce((acc, { amount }) => acc + Number(amount.split('$')[1]), 0)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
  version: `Latest: ${
    raw_data.map(({ version }) => version).sort()[raw_data.length - 1]
  }`,
};

const RenderFooterCellValue = ({ columnId, setCellProps }) => {
  const value = footerCellValues[columnId];

  useEffect(() => {
    // Turn off the cell expansion button if the footer cell is empty
    if (!value) setCellProps({ isExpandable: false });
  }, [value, setCellProps]);

  return value || null;
};

export default () => {
  // Pagination
  const [pagination, setPagination] = useState({ pageIndex: 0 });
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
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
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
          leadingControlColumns={leadingControlColumns}
          trailingControlColumns={trailingControlColumns}
          rowCount={raw_data.length}
          renderCellValue={RenderCellValue}
          renderFooterCellValue={
            showFooterRow ? RenderFooterCellValue : undefined
          }
          pagination={{
            ...pagination,
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
