import React, {
  FunctionComponent,
  HTMLAttributes,
  KeyboardEvent,
  useCallback,
  useState,
  useRef,
  useEffect,
  Fragment,
} from 'react';
import classNames from 'classnames';
import { EuiDataGridHeaderRow } from './data_grid_header_row';
import { CommonProps, Omit } from '../common';
import {
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridPaginationProps,
} from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';
import { keyCodes, htmlIdGenerator } from '../../services';
import { EuiSpacer } from '../spacer';
import { EuiDataGridBody } from './data_grid_body';
import { useColumnSelector } from './column_selector';
// @ts-ignore-next-line
import { EuiTablePagination } from '../table/table_pagination';
import { CELL_CONTENTS_ATTR } from './utils';

// Types for styling options, passed down through the `gridStyle` prop
type EuiDataGridStyleFontSizes = 's' | 'm' | 'l';
type EuiDataGridStyleBorders = 'all' | 'horizontal' | 'none';
type EuiDataGridStyleHeader = 'shade' | 'underline';
type EuiDataGridStyleRowHover = 'highlight' | 'none';
type EuiDataGridStyleCellPaddings = 's' | 'm' | 'l';

interface EuiDataGridStyle {
  fontSize?: EuiDataGridStyleFontSizes;
  border?: EuiDataGridStyleBorders;
  stripes?: boolean;
  header?: EuiDataGridStyleHeader;
  rowHover?: EuiDataGridStyleRowHover;
  cellPadding?: EuiDataGridStyleCellPaddings;
}

type CommonGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    columns: EuiDataGridColumn[];
    rowCount: number;
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    gridStyle?: EuiDataGridStyle;
    pagination?: EuiDataGridPaginationProps;
  };

// This structure forces either aria-label or aria-labelledby to be defined
// making some type of label a requirement
type EuiDataGridProps = Omit<CommonGridProps, 'aria-label'> &
  ({ 'aria-label': string } | { 'aria-labelledby': string });

// Each gridStyle object above sets a specific CSS select to .euiGrid
const fontSizesToClassMap: { [size in EuiDataGridStyleFontSizes]: string } = {
  s: 'euiDataGrid--fontSizeSmall',
  m: '',
  l: 'euiDataGrid--fontSizeLarge',
};

const headerToClassMap: { [header in EuiDataGridStyleHeader]: string } = {
  shade: 'euiDataGrid--headerShade',
  underline: 'euiDataGrid--headerUnderline',
};

const rowHoverToClassMap: {
  [rowHighlight in EuiDataGridStyleRowHover]: string
} = {
  highlight: 'euiDataGrid--rowHoverHighlight',
  none: '',
};

const bordersToClassMap: { [border in EuiDataGridStyleBorders]: string } = {
  all: 'euiDataGrid--bordersAll',
  horizontal: 'euiDataGrid--bordersHorizontal',
  none: 'euiDataGrid--bordersNone',
};

const cellPaddingsToClassMap: {
  [cellPaddings in EuiDataGridStyleCellPaddings]: string
} = {
  s: 'euiDataGrid--paddingSmall',
  m: '',
  l: 'euiDataGrid--paddingLarge',
};
const ORIGIN: [number, number] = [0, 0];

function computeVisibleRows(props: EuiDataGridProps) {
  const { pagination, rowCount } = props;

  const startRow = pagination ? pagination.pageIndex * pagination.pageSize : 0;
  let endRow = pagination
    ? (pagination.pageIndex + 1) * pagination.pageSize
    : rowCount;
  endRow = Math.min(endRow, rowCount);

  return endRow - startRow;
}

function renderPagination(props: EuiDataGridProps) {
  const { pagination } = props;

  if (pagination == null) {
    return null;
  }

  const {
    pageIndex,
    pageSize,
    pageSizeOptions,
    onChangePage,
    onChangeItemsPerPage,
  } = pagination;
  const pageCount = Math.ceil(props.rowCount / pageSize);

  return (
    <EuiTablePagination
      activePage={pageIndex}
      itemsPerPage={pageSize}
      itemsPerPageOptions={pageSizeOptions}
      pageCount={pageCount}
      onChangePage={onChangePage}
      onChangeItemsPerPage={onChangeItemsPerPage}
    />
  );
}

export const EuiDataGrid: FunctionComponent<EuiDataGridProps> = props => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [interactiveCellId] = useState(htmlIdGenerator()());
  const [columnWidths, setColumnWidths] = useState<EuiDataGridColumnWidths>({});
  const setColumnWidth = (columnId: string, width: number) => {
    setColumnWidths({ ...columnWidths, [columnId]: width });
  };

  useEffect(() => {
    if (gridRef.current != null) {
      const gridWidth = gridRef.current.clientWidth;
      const columnWidth = Math.max(gridWidth / props.columns.length, 100);
      const columnWidths = props.columns.reduce(
        (columnWidths: EuiDataGridColumnWidths, column) => {
          columnWidths[column.id] = columnWidth;
          return columnWidths;
        },
        {}
      );
      setColumnWidths(columnWidths);
    }
  }, []);

  const [focusedCell, setFocusedCell] = useState<[number, number]>(ORIGIN);
  const [isGridNavigationEnabled, setIsGridNavigationEnabled] = useState<
    boolean
  >(true);

  const isInteractiveCell = (element: HTMLElement) => {
    if (element.getAttribute('role') !== 'gridcell') {
      return false;
    }

    return Boolean(element.querySelector(`[${CELL_CONTENTS_ATTR}="true"]`));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const colCount = props.columns.length - 1;
    const [x, y] = focusedCell;
    const rowCount = computeVisibleRows(props);
    const { keyCode, target } = event;

    if (
      target instanceof HTMLElement &&
      isInteractiveCell(target) &&
      isGridNavigationEnabled &&
      (keyCode === keyCodes.ENTER || keyCode === keyCodes.F2)
    ) {
      setIsGridNavigationEnabled(false);
    } else if (
      !isGridNavigationEnabled &&
      (keyCode === keyCodes.ESCAPE || keyCode === keyCodes.F2)
    ) {
      setIsGridNavigationEnabled(true);
    }

    if (isGridNavigationEnabled) {
      switch (keyCode) {
        case keyCodes.DOWN:
          if (y < rowCount) {
            event.preventDefault();
            setFocusedCell([x, y + 1]);
          }
          break;
        case keyCodes.LEFT:
          if (x > 0) {
            event.preventDefault();
            setFocusedCell([x - 1, y]);
          }
          break;
        case keyCodes.UP:
          // TODO sort out when a user can arrow up into the column headers
          if (y > 0) {
            event.preventDefault();
            setFocusedCell([x, y - 1]);
          }
          break;
        case keyCodes.RIGHT:
          if (x < colCount) {
            event.preventDefault();
            setFocusedCell([x + 1, y]);
          }
          break;
      }
    }
  };

  const {
    columns,
    rowCount,
    renderCellValue,
    className,
    gridStyle = {},
    pagination,
    ...rest
  } = props;

  const fontSize = gridStyle.fontSize || 'm';
  const border = gridStyle.border || 'all';
  const header = gridStyle.header || 'shade';
  const rowHover = gridStyle.rowHover || 'highlight';
  const stripes = gridStyle.stripes ? true : false;
  const cellPadding = gridStyle.cellPadding || 'm';

  const classes = classNames(
    'euiDataGrid',
    fontSizesToClassMap[fontSize],
    bordersToClassMap[border],
    headerToClassMap[header],
    rowHoverToClassMap[rowHover],
    cellPaddingsToClassMap[cellPadding],
    {
      'euiDataGrid--stripes': stripes,
    },
    className
  );

  const [ColumnSelector, visibleColumns] = useColumnSelector(columns);

  return (
    <Fragment>
      <div className="euiDataGrid__controls">
        <ColumnSelector />
      </div>
      {/* Unsure why this element causes errors as focus follows spec */}
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
        role="grid"
        onKeyDown={handleKeyDown}
        ref={gridRef}
        {...rest}
        className={classes}>
        <EuiDataGridHeaderRow
          columns={visibleColumns}
          columnWidths={columnWidths}
          setColumnWidth={setColumnWidth}
        />
        <EuiDataGridBody
          columnWidths={columnWidths}
          columns={visibleColumns}
          focusedCell={focusedCell}
          onCellFocus={useCallback(setFocusedCell, [setFocusedCell])}
          pagination={pagination}
          renderCellValue={renderCellValue}
          rowCount={rowCount}
          isGridNavigationEnabled={isGridNavigationEnabled}
          interactiveCellId={interactiveCellId}
        />
      </div>
      <EuiSpacer size="s" />
      {renderPagination(props)}
      <p id={interactiveCellId} hidden>
        Cell contains interactive content.
        {/* TODO: if no keyboard shortcuts panel gets built, add keyboard shortcut info here */}
      </p>
    </Fragment>
  );
};
