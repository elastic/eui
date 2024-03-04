import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useMemo,
} from 'react';
import { faker } from '@faker-js/faker';

import {
  EuiDataGrid,
  EuiCheckbox,
  EuiButtonEmpty,
} from '../../../../../src/components';

/**
 * Data
 */
const columns = [
  { id: 'name' },
  { id: 'email' },
  { id: 'city' },
  { id: 'country' },
  { id: 'account' },
];

const DEMO_ROW = 2;

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    name: `${faker.person.lastName()}, ${faker.person.firstName()} ${faker.person.suffix()}`,
    email: faker.internet.email(),
    city: faker.location.city(),
    country: faker.location.country(),
    account: faker.finance.accountNumber(),
  });
}
data[DEMO_ROW].account = 'OVERDUE';

/**
 * Selection
 */
const SelectionContext = createContext();

const SelectionButton = () => {
  const [selectedRows] = useContext(SelectionContext);
  const hasSelection = selectedRows.size > 0;
  return hasSelection ? (
    <EuiButtonEmpty
      size="xs"
      iconType="arrowDown"
      iconSide="right"
      onClick={() => window.alert('This is not a real control.')}
    >
      {selectedRows.size} {selectedRows.size > 1 ? 'items' : 'item'} selected
    </EuiButtonEmpty>
  ) : null;
};

const SelectionHeaderCell = () => {
  const [selectedRows, updateSelectedRows] = useContext(SelectionContext);
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size < data.length;
  return (
    <EuiCheckbox
      id="selection-toggle"
      aria-label="Select all rows"
      indeterminate={isIndeterminate}
      checked={selectedRows.size > 0}
      onChange={(e) => {
        if (isIndeterminate) {
          // clear selection
          updateSelectedRows({ action: 'clear' });
        } else {
          if (e.target.checked) {
            // select everything
            updateSelectedRows({ action: 'selectAll' });
          } else {
            // clear selection
            updateSelectedRows({ action: 'clear' });
          }
        }
      }}
    />
  );
};

const SelectionRowCell = ({ rowIndex }) => {
  const [selectedRows, updateSelectedRows] = useContext(SelectionContext);
  const isChecked = selectedRows.has(rowIndex);
  return (
    <>
      <EuiCheckbox
        id={`${rowIndex}`}
        aria-label={`Select row ${rowIndex}, ${data[rowIndex].name}`}
        checked={isChecked}
        onChange={(e) => {
          if (e.target.checked) {
            updateSelectedRows({ action: 'add', rowIndex });
          } else {
            updateSelectedRows({ action: 'delete', rowIndex });
          }
        }}
      />
    </>
  );
};

const leadingControlColumns = [
  {
    id: 'selection',
    width: 32,
    headerCellRender: SelectionHeaderCell,
    rowCellRender: SelectionRowCell,
  },
];

/**
 * Data grid
 */
export default () => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map(({ id }) => id)
  );

  const rowSelection = useReducer((rowSelection, { action, rowIndex }) => {
    if (action === 'add') {
      const nextRowSelection = new Set(rowSelection);
      nextRowSelection.add(rowIndex);
      return nextRowSelection;
    } else if (action === 'delete') {
      const nextRowSelection = new Set(rowSelection);
      nextRowSelection.delete(rowIndex);
      return nextRowSelection;
    } else if (action === 'clear') {
      return new Set();
    } else if (action === 'selectAll') {
      return new Set(data.map((_, index) => index));
    }
    return rowSelection;
  }, new Set());

  const rowClasses = useMemo(() => {
    const rowClasses = {
      [DEMO_ROW]: 'euiDataGridRow--rowClassesDemo',
    };
    rowSelection[0].forEach((rowIndex) => {
      rowClasses[rowIndex] = 'euiDataGridRow--rowClassesDemoSelected';
    });
    return rowClasses;
  }, [rowSelection]);

  return (
    <SelectionContext.Provider value={rowSelection}>
      <EuiDataGrid
        aria-label="Top EUI contributors"
        columns={columns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        rowCount={data.length}
        renderCellValue={({ rowIndex, columnId }) => data[rowIndex][columnId]}
        leadingControlColumns={leadingControlColumns}
        toolbarVisibility={{
          additionalControls: <SelectionButton />,
        }}
        gridStyle={{ rowClasses, rowHover: 'none' }}
      />
    </SelectionContext.Provider>
  );
};
