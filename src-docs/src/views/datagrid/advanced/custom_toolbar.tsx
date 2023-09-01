import React, { useCallback, useState } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiDataGridColumnCellActionProps,
  EuiButtonIcon,
  EuiDataGridPaginationProps,
  EuiDataGridSorting,
  EuiDataGridColumnSortingConfig,
  EuiPopover,
  EuiDataGridCustomToolbarProps,
  EuiFormRow,
  EuiRange,
} from '../../../../../src';

const raw_data: Array<{ [key: string]: string }> = [];
for (let i = 1; i < 100; i++) {
  raw_data.push({
    name: `${faker.name.lastName()}, ${faker.name.firstName()}`,
    email: faker.internet.email(),
    location: `${faker.address.city()}, ${faker.address.country()}`,
    date: `${faker.date.past()}`,
    amount: faker.commerce.price(1, 1000, 2, '$'),
  });
}

const columns = [
  {
    id: 'name',
    displayAsText: 'Name',
    cellActions: [
      ({ Component }: EuiDataGridColumnCellActionProps) => (
        <Component
          onClick={() => alert('action')}
          iconType="faceHappy"
          aria-label="Some action"
        >
          Some action
        </Component>
      ),
    ],
  },
  {
    id: 'email',
    displayAsText: 'Email address',
    initialWidth: 130,
  },
  {
    id: 'location',
    displayAsText: 'Location',
  },
  {
    id: 'date',
    displayAsText: 'Date',
  },
  {
    id: 'amount',
    displayAsText: 'Amount',
  },
];

export default () => {
  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  );

  // Pagination
  const [pagination, setPagination] = useState({ pageIndex: 0 });
  const onChangePage = useCallback<EuiDataGridPaginationProps['onChangePage']>(
    (pageIndex) => {
      setPagination((pagination) => ({ ...pagination, pageIndex }));
    },
    []
  );
  const onChangePageSize = useCallback<
    EuiDataGridPaginationProps['onChangeItemsPerPage']
  >((pageSize) => {
    setPagination((pagination) => ({ ...pagination, pageSize }));
  }, []);

  // Sorting
  const [sortingColumns, setSortingColumns] = useState<
    EuiDataGridColumnSortingConfig[]
  >([]);
  const onSort = useCallback<EuiDataGridSorting['onSort']>((sortingColumns) => {
    setSortingColumns(sortingColumns);
  }, []);
  const [isDisplaySelectorOpen, setIsDisplaySelectorOpen] = useState(false);

  // Custom toolbar body renderer
  const RenderCustomToolbar = ({
    fullScreenSelector,
    keyboardShortcuts,
    rowHeightsControls,
    densityControls,
    columnSelector,
    columnSorting,
  }: EuiDataGridCustomToolbarProps) => {
    return (
      <div className="euiDataGrid__controls" data-test-subj="dataGridControls">
        <div className="euiDataGrid__leftControls">
          Always look at the left side of grid!
        </div>
        <div className="euiDataGrid__rightControls">
          {fullScreenSelector}
          {keyboardShortcuts}
          <EuiPopover
            button={
              <EuiButtonIcon
                iconType="controlsHorizontal"
                aria-label="Custom grid controls"
                onClick={() => setIsDisplaySelectorOpen(true)}
              />
            }
            isOpen={isDisplaySelectorOpen}
            data-test-subj="dataGridDisplaySelectorPopover"
            closePopover={() => setIsDisplaySelectorOpen(false)}
            anchorPosition="downRight"
            panelPaddingSize="s"
            panelClassName="euiDataGrid__displayPopoverPanel"
          >
            {rowHeightsControls}
            {densityControls}

            <EuiFormRow label="Random Sample Size" display="columnCompressed">
              <EuiRange
                compressed
                fullWidth
                showInput
                min={1}
                max={100}
                step={1}
                value={10}
                data-test-subj="randomSampleSize"
              />
            </EuiFormRow>
          </EuiPopover>
          {columnSorting}
          {columnSelector}
        </div>
      </div>
    );
  };

  return (
    <>
      <EuiDataGrid
        aria-label="Data grid custom body renderer demo"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        sorting={{ columns: sortingColumns, onSort }}
        inMemory={{ level: 'sorting' }}
        pagination={{
          ...pagination,
          onChangePage: onChangePage,
          onChangeItemsPerPage: onChangePageSize,
        }}
        rowCount={raw_data.length}
        renderCellValue={({ rowIndex, columnId }) =>
          raw_data[rowIndex][columnId]
        }
        renderCustomToolbar={RenderCustomToolbar}
        height={undefined}
        gridStyle={{ border: 'none', header: 'underline' }}
      />
    </>
  );
};
