import React, { useCallback, useMemo, useState, useRef } from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiFormRow,
  EuiFieldNumber,
  EuiButton,
  EuiDataGrid,
  EuiDataGridRefProps,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiText,
} from '../../../../../src';

const raw_data: Array<{ [key: string]: string }> = [];
for (let i = 1; i < 100; i++) {
  raw_data.push({
    name: `${faker.name.lastName()}, ${faker.name.firstName()}`,
    email: faker.internet.email(),
    location: `${faker.address.city()}, ${faker.address.country()}`,
    account: faker.finance.account(),
    date: `${faker.date.past()}`,
  });
}

export default () => {
  const dataGridRef = useRef<EuiDataGridRefProps | null>(null);

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lastFocusedCell, setLastFocusedCell] = useState({
    rowIndex: 0,
    colIndex: 0,
  });

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    dataGridRef.current!.setFocusedCell(lastFocusedCell); // Set the data grid focus back to the cell that opened the modal
  }, [lastFocusedCell]);

  const showModal = useCallback(({ rowIndex, colIndex }) => {
    setIsModalVisible(true);
    dataGridRef.current!.closeCellPopover(); // Close any open cell popovers
    setLastFocusedCell({ rowIndex, colIndex }); // Store the cell that opened this modal
  }, []);

  const openModalAction = useCallback(
    ({ Component, rowIndex, colIndex }) => {
      return (
        <Component
          onClick={() => showModal({ rowIndex, colIndex })}
          iconType="faceHappy"
          aria-label="Open modal"
        >
          Open modal
        </Component>
      );
    },
    [showModal]
  );

  // Columns
  const columns = useMemo(
    () => [
      {
        id: 'name',
        displayAsText: 'Name',
        cellActions: [openModalAction],
      },
      {
        id: 'email',
        displayAsText: 'Email address',
        initialWidth: 130,
        cellActions: [openModalAction],
      },
      {
        id: 'location',
        displayAsText: 'Location',
        cellActions: [openModalAction],
      },
      {
        id: 'account',
        displayAsText: 'Account',
        cellActions: [openModalAction],
      },
      {
        id: 'date',
        displayAsText: 'Date',
        cellActions: [openModalAction],
      },
    ],
    [openModalAction]
  );

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map(({ id }) => id)
  );

  // Pagination
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 });
  const onChangePage = useCallback((pageIndex) => {
    setPagination((pagination) => ({ ...pagination, pageIndex }));
  }, []);
  const onChangePageSize = useCallback((pageSize) => {
    setPagination((pagination) => ({ ...pagination, pageSize }));
  }, []);

  // Sorting
  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback((sortingColumns) => {
    setSortingColumns(sortingColumns);
  }, []);

  // Manual cell focus
  const [rowIndexAction, setRowIndexAction] = useState(0);
  const [colIndexAction, setColIndexAction] = useState(0);

  return (
    <>
      <EuiFlexGroup alignItems="flexEnd" gutterSize="s">
        <EuiFlexItem grow={false} style={{ width: '80px' }}>
          <EuiFormRow label="Row index">
            <EuiFieldNumber
              min={0}
              max={raw_data.length - 1}
              value={rowIndexAction}
              onChange={(e) => setRowIndexAction(Number(e.target.value))}
              compressed
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={false} style={{ width: '80px' }}>
          <EuiFormRow label="Column index">
            <EuiFieldNumber
              min={0}
              max={visibleColumns.length - 1}
              value={colIndexAction}
              onChange={(e) => setColIndexAction(Number(e.target.value))}
              compressed
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            size="s"
            onClick={() =>
              dataGridRef.current!.setFocusedCell({
                rowIndex: rowIndexAction,
                colIndex: colIndexAction,
              })
            }
          >
            Set cell focus
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            size="s"
            onClick={() =>
              dataGridRef.current!.scrollToItem?.({
                rowIndex: rowIndexAction,
                columnIndex: colIndexAction,
                align: 'center',
              })
            }
          >
            Scroll to cell
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            size="s"
            onClick={() =>
              dataGridRef.current!.openCellPopover({
                rowIndex: rowIndexAction,
                colIndex: colIndexAction,
              })
            }
          >
            Open cell popover
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            size="s"
            onClick={() => dataGridRef.current!.setIsFullScreen(true)}
          >
            Set grid to fullscreen
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />

      <EuiDataGrid
        aria-label="Data grid ref demo"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        sorting={{ columns: sortingColumns, onSort }}
        inMemory={{ level: 'sorting' }}
        rowCount={raw_data.length}
        renderCellValue={({ rowIndex, columnId }) =>
          raw_data[rowIndex][columnId]
        }
        pagination={{
          ...pagination,
          pageSizeOptions: [25, 50],
          onChangePage: onChangePage,
          onChangeItemsPerPage: onChangePageSize,
        }}
        height={400}
        ref={dataGridRef}
      />
      {isModalVisible && (
        <EuiModal onClose={closeModal} style={{ width: 500 }}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Example modal</EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            <EuiText>
              <p>
                When closed, this modal should re-focus into the cell that
                toggled it.
              </p>
            </EuiText>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButton onClick={closeModal} fill>
              Close
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </>
  );
};
