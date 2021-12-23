/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  forwardRef,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  GridChildComponentProps,
  VariableSizeGrid as Grid,
  VariableSizeGridProps,
} from 'react-window';
import {
  EuiMutationObserver,
  useMutationObserver,
} from '../../observer/mutation_observer';
import { useResizeObserver } from '../../observer/resize_observer';
import { EuiDataGridCell } from './data_grid_cell';
import { DataGridWrapperRowsContext } from '../data_grid_context';
import { EuiDataGridFooterRow } from './data_grid_footer_row';
import { EuiDataGridHeaderRow } from './header';
import { DefaultColumnFormatter } from './popover_utils';
import {
  EuiDataGridBodyProps,
  EuiDataGridRowManager,
  EuiDataGridSchemaDetector,
} from '../data_grid_types';
import { makeRowManager } from './data_grid_row_manager';
import {
  useFinalGridDimensions,
  useUnconstrainedHeight,
  useVirtualizeContainerWidth,
} from '../utils/grid_height_width';
import { useDefaultColumnWidth, useColumnWidths } from '../utils/col_widths';
import { useRowHeightUtils, useDefaultRowHeight } from '../utils/row_heights';
import { DataGridSortingContext } from '../utils/sorting';
import { preventTabbing } from '../utils/focus';
import { IS_JEST_ENVIRONMENT } from '../../../test';

export const Cell: FunctionComponent<GridChildComponentProps> = ({
  columnIndex,
  rowIndex: visibleRowIndex,
  style,
  data,
}) => {
  const {
    leadingControlColumns,
    trailingControlColumns,
    columns,
    visibleColCount,
    schema,
    popoverContents,
    columnWidths,
    defaultColumnWidth,
    renderCellValue,
    interactiveCellId,
    setRowHeight,
    schemaDetectors,
    rowHeightsOptions,
    rowHeightUtils,
    rowManager,
  } = data;
  const { headerRowHeight } = useContext(DataGridWrapperRowsContext);
  const { getCorrectRowIndex } = useContext(DataGridSortingContext);

  let cellContent;

  const isFirstColumn = columnIndex === 0;
  const isLastColumn = columnIndex === visibleColCount - 1;
  const isStripableRow = visibleRowIndex % 2 !== 0;

  const isLeadingControlColumn = columnIndex < leadingControlColumns.length;
  const isTrailingControlColumn =
    columnIndex >= leadingControlColumns.length + columns.length;

  const dataColumnIndex = columnIndex - leadingControlColumns.length;
  const column = columns[dataColumnIndex];
  const columnId = column?.id;

  const transformClass = schemaDetectors.filter(
    (row: EuiDataGridSchemaDetector) => {
      return column?.schema
        ? column?.schema === row.type
        : columnId === row.type;
    }
  )[0];
  const textTransform = transformClass?.textTransform;

  const classes = classNames({
    'euiDataGridRowCell--stripe': isStripableRow,
    'euiDataGridRowCell--firstColumn': isFirstColumn,
    'euiDataGridRowCell--lastColumn': isLastColumn,
    'euiDataGridRowCell--controlColumn':
      isLeadingControlColumn || isTrailingControlColumn,
    [`euiDataGridRowCell--${textTransform}`]: textTransform,
  });

  const sharedCellProps = {
    rowIndex: getCorrectRowIndex(visibleRowIndex),
    visibleRowIndex,
    colIndex: columnIndex,
    interactiveCellId,
    className: classes,
    style: {
      ...style,
      top: `${parseFloat(style.top as string) + headerRowHeight}px`,
    },
    rowHeightsOptions,
    rowHeightUtils,
    setRowHeight: isFirstColumn ? setRowHeight : undefined,
    rowManager: rowManager,
  };

  if (isLeadingControlColumn) {
    const leadingColumn = leadingControlColumns[columnIndex];
    const { id, rowCellRender } = leadingColumn;

    cellContent = (
      <EuiDataGridCell
        {...sharedCellProps}
        columnId={id}
        popoverContent={DefaultColumnFormatter}
        width={leadingColumn.width}
        renderCellValue={rowCellRender}
        isExpandable={false}
      />
    );
  } else if (isTrailingControlColumn) {
    const columnOffset = columns.length + leadingControlColumns.length;
    const trailingColumnIndex = columnIndex - columnOffset;
    const trailingColumn = trailingControlColumns[trailingColumnIndex];
    const { id, rowCellRender } = trailingColumn;

    cellContent = (
      <EuiDataGridCell
        {...sharedCellProps}
        columnId={id}
        popoverContent={DefaultColumnFormatter}
        width={trailingColumn.width}
        renderCellValue={rowCellRender}
        isExpandable={false}
      />
    );
  } else {
    // this is a normal data cell

    // offset the column index by the leading control columns
    const columnType = schema[columnId] ? schema[columnId].columnType : null;

    const isExpandable =
      column.isExpandable !== undefined ? column.isExpandable : true;

    const popoverContent =
      popoverContents[columnType as string] || DefaultColumnFormatter;

    const width = columnWidths[columnId] || defaultColumnWidth;

    cellContent = (
      <EuiDataGridCell
        {...sharedCellProps}
        columnId={columnId}
        column={column}
        columnType={columnType}
        popoverContent={popoverContent}
        width={width || undefined}
        renderCellValue={renderCellValue}
        interactiveCellId={interactiveCellId}
        isExpandable={isExpandable}
      />
    );
  }

  return cellContent;
};

const InnerElement: VariableSizeGridProps['innerElementType'] = forwardRef<
  HTMLDivElement,
  { style: { height: number } }
>(({ children, style, ...rest }, ref) => {
  const { headerRowHeight, headerRow, footerRow } = useContext(
    DataGridWrapperRowsContext
  );
  return (
    <>
      <div
        ref={ref}
        style={{
          ...style,
          height: style.height + headerRowHeight,
        }}
        {...rest}
      >
        {headerRow}
        {children}
      </div>
      {footerRow}
    </>
  );
});
InnerElement.displayName = 'EuiDataGridInnerElement';

export const EuiDataGridBody: FunctionComponent<EuiDataGridBodyProps> = (
  props
) => {
  const {
    isFullScreen,
    leadingControlColumns,
    trailingControlColumns,
    columns,
    visibleColCount,
    schema,
    schemaDetectors,
    popoverContents,
    rowCount,
    visibleRows: { startRow, endRow, visibleRowCount },
    renderCellValue,
    renderFooterCellValue,
    interactiveCellId,
    pagination,
    headerIsInteractive,
    handleHeaderMutation,
    setVisibleColumns,
    switchColumnPos,
    onColumnResize,
    toolbarHeight,
    rowHeightsOptions,
    virtualizationOptions,
    gridStyles,
    gridWidth,
  } = props;

  const outerGridRef = useRef<HTMLDivElement | null>(null); // container that becomes scrollable
  const innerGridRef = useRef<HTMLDivElement | null>(null); // container sized to fit all content

  const virtualizeContainerWidth = useVirtualizeContainerWidth(
    outerGridRef.current,
    gridWidth,
    pagination?.pageSize
  );

  // compute the default column width from the container's width and count of visible columns
  const defaultColumnWidth = useDefaultColumnWidth(
    virtualizeContainerWidth,
    leadingControlColumns,
    trailingControlColumns,
    columns
  );

  const { columnWidths, setColumnWidth, getColumnWidth } = useColumnWidths({
    columns,
    leadingControlColumns,
    trailingControlColumns,
    defaultColumnWidth,
    onColumnResize,
  });

  const [headerRowRef, setHeaderRowRef] = useState<HTMLDivElement | null>(null);
  const [footerRowRef, setFooterRowRef] = useState<HTMLDivElement | null>(null);

  useMutationObserver(headerRowRef, handleHeaderMutation, {
    subtree: true,
    childList: true,
  });
  const { height: headerRowHeight } = useResizeObserver(headerRowRef, 'height');
  const { height: footerRowHeight } = useResizeObserver(footerRowRef, 'height');

  const headerRow = useMemo(() => {
    return (
      <EuiDataGridHeaderRow
        ref={setHeaderRowRef}
        switchColumnPos={switchColumnPos}
        setVisibleColumns={setVisibleColumns}
        leadingControlColumns={leadingControlColumns}
        trailingControlColumns={trailingControlColumns}
        columns={columns}
        columnWidths={columnWidths}
        defaultColumnWidth={defaultColumnWidth}
        setColumnWidth={setColumnWidth}
        schema={schema}
        schemaDetectors={schemaDetectors}
        headerIsInteractive={headerIsInteractive}
      />
    );
  }, [
    switchColumnPos,
    setVisibleColumns,
    leadingControlColumns,
    trailingControlColumns,
    columns,
    columnWidths,
    defaultColumnWidth,
    setColumnWidth,
    schema,
    schemaDetectors,
    headerIsInteractive,
  ]);

  const footerRow = useMemo(() => {
    if (renderFooterCellValue == null) return null;
    return (
      <EuiDataGridFooterRow
        ref={setFooterRowRef}
        leadingControlColumns={leadingControlColumns}
        trailingControlColumns={trailingControlColumns}
        columns={columns}
        schema={schema}
        popoverContents={popoverContents}
        columnWidths={columnWidths}
        defaultColumnWidth={defaultColumnWidth}
        renderCellValue={renderFooterCellValue}
        rowIndex={visibleRowCount}
        visibleRowIndex={visibleRowCount}
        interactiveCellId={interactiveCellId}
      />
    );
  }, [
    columnWidths,
    columns,
    defaultColumnWidth,
    interactiveCellId,
    leadingControlColumns,
    popoverContents,
    renderFooterCellValue,
    schema,
    trailingControlColumns,
    visibleRowCount,
  ]);

  const gridRef = useRef<Grid | null>(null);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.resetAfterColumnIndex(0);
    }
  }, [columns, columnWidths, defaultColumnWidth]);

  const rowHeightUtils = useRowHeightUtils({
    gridRef: gridRef.current,
    gridStyles,
    columns,
  });

  const { defaultRowHeight, setRowHeight, getRowHeight } = useDefaultRowHeight({
    rowHeightsOptions,
    rowHeightUtils,
  });

  useEffect(() => {
    if (gridRef.current && rowHeightsOptions) {
      gridRef.current.resetAfterRowIndex(0);
    }
  }, [
    pagination?.pageIndex,
    rowHeightsOptions,
    gridStyles?.cellPadding,
    gridStyles?.fontSize,
  ]);

  useEffect(() => {
    if (gridRef.current && pagination?.pageIndex !== undefined) {
      gridRef.current.scrollToItem({
        rowIndex: 0,
      });
    }
  }, [pagination?.pageIndex]);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.resetAfterRowIndex(0);
    }
  }, [getRowHeight]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperDimensions = useResizeObserver(wrapperRef.current);

  // useState instead of useMemo as React reserves the right to drop memoized
  // values in the future, and that would be very bad here
  const [rowManager] = useState<EuiDataGridRowManager>(() =>
    makeRowManager(innerGridRef)
  );

  const unconstrainedHeight = useUnconstrainedHeight({
    rowHeightUtils,
    startRow,
    endRow,
    rowHeightsOptions,
    defaultRowHeight,
    headerRowHeight,
    footerRowHeight,
    outerGridRef,
    innerGridRef,
  });

  const { finalWidth, finalHeight } = useFinalGridDimensions({
    unconstrainedHeight,
    unconstrainedWidth: 0, // unable to determine this until the container's size is known
    wrapperDimensions,
    wrapperRef,
    toolbarHeight,
    headerRowHeight,
    footerRowHeight,
    rowCount,
    isFullScreen,
  });

  return (
    <EuiMutationObserver
      observerOptions={{ subtree: true, childList: true }}
      onMutation={preventTabbing}
    >
      {(mutationRef) => (
        <div
          data-test-subj="euiDataGridBody"
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          ref={(el) => {
            wrapperRef.current = el;
            mutationRef(el);
          }}
        >
          {(IS_JEST_ENVIRONMENT || finalWidth > 0) && (
            <DataGridWrapperRowsContext.Provider
              value={{ headerRowHeight, headerRow, footerRow }}
            >
              <Grid
                {...(virtualizationOptions ? virtualizationOptions : {})}
                ref={gridRef}
                innerElementType={InnerElement}
                outerRef={outerGridRef}
                innerRef={innerGridRef}
                className="euiDataGrid__virtualized"
                columnCount={visibleColCount}
                width={finalWidth}
                columnWidth={getColumnWidth}
                height={finalHeight}
                rowHeight={getRowHeight}
                itemData={{
                  schemaDetectors,
                  setRowHeight,
                  leadingControlColumns,
                  trailingControlColumns,
                  columns,
                  visibleColCount,
                  schema,
                  popoverContents,
                  columnWidths,
                  defaultColumnWidth,
                  renderCellValue,
                  interactiveCellId,
                  rowHeightsOptions,
                  rowHeightUtils,
                  rowManager,
                }}
                rowCount={
                  IS_JEST_ENVIRONMENT || headerRowHeight > 0
                    ? visibleRowCount
                    : 0
                }
              >
                {Cell}
              </Grid>
            </DataGridWrapperRowsContext.Provider>
          )}
        </div>
      )}
    </EuiMutationObserver>
  );
};
