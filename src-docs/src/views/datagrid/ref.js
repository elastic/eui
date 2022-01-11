import React, { useCallback, useMemo, useState, useRef } from 'react';
import { fake } from 'faker';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiFormRow,
  EuiFieldNumber,
  EuiButton,
  EuiDataGrid,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiText,
} from '../../../../src/components/';

const raw_data = [];
for (let i = 1; i < 100; i++) {
  raw_data.push({
    name: fake('{{name.lastName}}, {{name.firstName}}'),
    email: fake('{{internet.email}}'),
    location: fake('{{address.city}}, {{address.country}}'),
    account: fake('{{finance.account}}'),
    date: fake('{{date.past}}'),
  });
}

export default () => {
  const dataGridRef = useRef();

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lastFocusedCell, setLastFocusedCell] = useState({});

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    dataGridRef.current.setFocusedCell(lastFocusedCell); // Set the data grid focus back to the cell that opened the modal
  }, [lastFocusedCell]);

  const showModal = useCallback(({ rowIndex, colIndex }) => {
    setIsModalVisible(true);
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
  const onChangePage = useCallback(
    (pageIndex) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    []
  );

  // Manual cell focus
  const [rowIndexAction, setRowIndexAction] = useState(0);
  const [colIndexAction, setColIndexAction] = useState(0);

  return (
    <>
      <EuiFlexGroup alignItems="flexEnd" gutterSize="s" style={{ width: 500 }}>
        <EuiFlexItem>
          <EuiFormRow label="Row index">
            <EuiFieldNumber
              min={0}
              max={24}
              value={rowIndexAction}
              onChange={(e) => setRowIndexAction(Number(e.target.value))}
              compressed
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Column index">
            <EuiFieldNumber
              min={0}
              max={4}
              value={colIndexAction}
              onChange={(e) => setColIndexAction(Number(e.target.value))}
              compressed
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton
            size="s"
            onClick={() =>
              dataGridRef.current.setFocusedCell({
                rowIndex: rowIndexAction,
                colIndex: colIndexAction,
              })
            }
          >
            Set cell focus
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton
            size="s"
            onClick={() => dataGridRef.current.setIsFullScreen(true)}
          >
            Set grid to full screen
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />

      <EuiDataGrid
        aria-label="Data grid demo"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        rowCount={raw_data.length}
        renderCellValue={({ rowIndex, columnId }) =>
          raw_data[rowIndex][columnId]
        }
        pagination={{
          ...pagination,
          pageSizeOptions: [25],
          onChangePage: onChangePage,
        }}
        height={400}
        ref={dataGridRef}
      />
      {isModalVisible && (
        <EuiModal onClose={closeModal} style={{ width: 500 }}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              <h2>Example modal</h2>
            </EuiModalHeaderTitle>
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
