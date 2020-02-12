import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { fake } from 'faker';

import {
  EuiDataGrid,
  EuiAvatar,
  EuiCheckbox,
  EuiButtonIcon,
  EuiPopover,
} from '../../../../src/components/';

import { euiColorHighlight as selectedRowColorLight } from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors.scss';
import { euiColorHighlight as selectedRowColorDark } from '!!sass-vars-to-js-loader!../../../../src/themes/eui/eui_colors_dark.scss';
import { withTheme } from '../../components/with_theme';

const columns = [
  {
    id: 'avatar',
    initialWidth: 65,
  },
  {
    id: 'name',
  },
  {
    id: 'email',
  },
  {
    id: 'city',
  },
  {
    id: 'country',
  },
  {
    id: 'account',
  },
];

const data = [];

for (let i = 1; i < 500; i++) {
  data.push({
    avatar: (
      <EuiAvatar
        size="s"
        imageUrl={fake('{{internet.avatar}}')}
        name={fake('{{name.lastName}}, {{name.firstName}}')}
      />
    ),
    name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    email: fake('{{internet.email}}'),
    city: fake('{{address.city}}'),
    country: fake('{{address.country}}'),
    account: fake('{{finance.account}}'),
  });
}

const SelectionContext = createContext();

const SelectionHeaderCell = () => {
  const [selectedRows, updateSelectedRows] = useContext(SelectionContext);
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size < data.length;
  return (
    <EuiCheckbox
      id="selection-toggle"
      indeterminate={isIndeterminate}
      checked={selectedRows.size > 0}
      onChange={e => {
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

const SelectionRowCell = withTheme(({ theme, rowIndex, setCellProps }) => {
  const [selectedRows, updateSelectedRows] = useContext(SelectionContext);
  const isChecked = selectedRows.has(rowIndex);

  useEffect(() => {
    const highlightColor =
      theme === 'light'
        ? selectedRowColorLight.rgba
        : selectedRowColorDark.rgba;
    setCellProps({
      style: {
        backgroundColor: isChecked ? highlightColor : 'transparent',
      },
    });
  }, [isChecked, setCellProps, theme]);

  return (
    <div>
      <EuiCheckbox
        id={`selection-checkbox-${rowIndex}`}
        checked={isChecked}
        onChange={e => {
          if (e.target.checked) {
            updateSelectedRows({ action: 'add', rowIndex });
          } else {
            updateSelectedRows({ action: 'delete', rowIndex });
          }
        }}
      />
    </div>
  );
});

const leadingControlColumns = [
  {
    id: 'selection',
    width: 31,
    headerCellRender: SelectionHeaderCell,
    rowCellRender: SelectionRowCell,
  },
];

const trailingControlColumns = [
  {
    id: 'actions',
    width: 40,
    headerCellRender: () => null,
    rowCellRender: function RowCellRender() {
      const [isPopoverOpen, setIsPopoverOpen] = useState(false);
      return (
        <div>
          <EuiPopover
            isOpen={isPopoverOpen}
            anchorPosition="upCenter"
            button={
              <EuiButtonIcon
                aria-label="show actions"
                iconType="boxesHorizontal"
                color="text"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              />
            }
            closePopover={() => setIsPopoverOpen(false)}
            ownFocus={true}>
            <EuiButtonIcon aria-label="pin this" iconType="pin" color="text" />
            <EuiButtonIcon aria-label="edit" iconType="pencil" color="text" />
            <EuiButtonIcon aria-label="delete" iconType="trash" color="text" />
          </EuiPopover>
        </div>
      );
    },
  },
];

export default function DataGrid() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });
  const setPageIndex = useCallback(
    pageIndex => setPagination({ ...pagination, pageIndex }),
    [pagination, setPagination]
  );
  const setPageSize = useCallback(
    pageSize => setPagination({ ...pagination, pageSize }),
    [pagination, setPagination]
  );

  const [visibleColumns, setVisibleColumns] = useState(() =>
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

  const renderCellValue = useCallback(
    ({ rowIndex, columnId }) => data[rowIndex][columnId],
    []
  );

  return (
    <SelectionContext.Provider value={rowSelection}>
      <div>
        <EuiDataGrid
          aria-label="Top EUI contributors"
          leadingControlColumns={leadingControlColumns}
          trailingControlColumns={trailingControlColumns}
          columns={columns}
          columnVisibility={{
            visibleColumns,
            setVisibleColumns,
          }}
          rowCount={data.length}
          renderCellValue={renderCellValue}
          pagination={{
            ...pagination,
            pageSizeOptions: [5, 15, 25],
            onChangeItemsPerPage: setPageSize,
            onChangePage: setPageIndex,
          }}
        />
      </div>
    </SelectionContext.Provider>
  );
}
