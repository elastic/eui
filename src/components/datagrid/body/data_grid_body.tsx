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
  createContext,
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
import { useMutationObserver } from '../../observer/mutation_observer';
import { useResizeObserver } from '../../observer/resize_observer';
import { EuiDataGridCell } from './data_grid_cell';
import { EuiDataGridFooterRow } from './data_grid_footer_row';
import { EuiDataGridHeaderRow } from './header';
import { DataGridCellPopoverContext } from './data_grid_cell_popover';
import {
  EuiDataGridBodyProps,
  DataGridWrapperRowsContentsShape,
  EuiDataGridSchemaDetector,
} from '../data_grid_types';
import { useRowManager } from './data_grid_row_manager';
import {
  useFinalGridDimensions,
  useUnconstrainedHeight,
  useVirtualizeContainerWidth,
} from '../utils/grid_height_width';
import { useDefaultColumnWidth, useColumnWidths } from '../utils/col_widths';
import { useRowHeightUtils, useDefaultRowHeight } from '../utils/row_heights';
import { useHeaderFocusWorkaround } from '../utils/focus';
import { useScrollBars, useScroll } from '../utils/scrolling';
import { DataGridSortingContext } from '../utils/sorting';
import { IS_JEST_ENVIRONMENT } from '../../../utils';

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
    columnWidths,
    defaultColumnWidth,
    renderCellValue,
    renderCellPopover,
    interactiveCellId,
    setRowHeight,
    schemaDetectors,
    rowHeightsOptions,
    rowHeightUtils,
    rowManager,
  } = data;
  const popoverContext = useContext(DataGridCellPopoverContext);
  const { headerRowHeight } = useContext(DataGridWrapperRowsContext);
  const { getCorrectRowIndex } = useContext(DataGridSortingContext);

  let cellContent;

  const isFirstColumn = columnIndex === 0;
  const isLastColumn = columnIndex === visibleColCount - 1;

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
    rowManager,
    popoverContext,
  };

  if (isLeadingControlColumn) {
    const leadingColumn = leadingControlColumns[columnIndex];
    const { id, rowCellRender } = leadingColumn;

    cellContent = (
      <EuiDataGridCell
        {...sharedCellProps}
        columnId={id}
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
        width={trailingColumn.width}
        renderCellValue={rowCellRender}
        isExpandable={false}
      />
    );
  } else {
    // this is a normal data cell
    const columnType = schema[columnId] ? schema[columnId].columnType : null;

    const isExpandable =
      column.isExpandable !== undefined ? column.isExpandable : true;

    const width = columnWidths[columnId] || defaultColumnWidth;

    cellContent = (
      <EuiDataGridCell
        {...sharedCellProps}
        columnId={columnId}
        column={column}
        columnType={columnType}
        width={width || undefined}
        renderCellValue={renderCellValue}
        renderCellPopover={renderCellPopover}
        interactiveCellId={interactiveCellId}
        isExpandable={isExpandable}
      />
    );
  }

  return cellContent;
};

// Context is required to pass props to react-window's innerElementType
// @see https://github.com/bvaughn/react-window/issues/404
export const DataGridWrapperRowsContext = createContext<
  DataGridWrapperRowsContentsShape
>({ headerRow: <div />, headerRowHeight: 0, footerRow: null });

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
    leadingControlColumns,
    trailingControlColumns,
    columns,
    visibleColCount,
    schema,
    schemaDetectors,
    rowCount,
    visibleRows: { startRow, endRow, visibleRowCount },
    renderCellValue,
    renderCellPopover,
    renderFooterCellValue,
    interactiveCellId,
    pagination,
    headerIsInteractive,
    handleHeaderMutation,
    setVisibleColumns,
    switchColumnPos,
    onColumnResize,
    rowHeightsOptions,
    virtualizationOptions,
    isFullScreen,
    gridStyles,
    gridWidth,
    gridRef,
    gridItemsRendered,
    wrapperRef,
  } = props;

  /**
   * Grid refs & observers
   */
  const wrapperDimensions = useResizeObserver(wrapperRef.current);
  const outerGridRef = useRef<HTMLDivElement | null>(null); // container that becomes scrollable
  const innerGridRef = useRef<HTMLDivElement | null>(null); // container sized to fit all content

  /**
   * Scroll bars
   */
  const {
    scrollBarHeight,
    hasVerticalScroll,
    hasHorizontalScroll,
    scrollBorderOverlay,
  } = useScrollBars(outerGridRef, gridStyles.border);

  /**
   * Widths
   */
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

  /**
   * Header
   */
  const [headerRowRef, setHeaderRowRef] = useState<HTMLDivElement | null>(null);
  useMutationObserver(headerRowRef, handleHeaderMutation, {
    subtree: true,
    childList: true,
  });
  const { height: headerRowHeight } = useResizeObserver(headerRowRef, 'height');

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

  useHeaderFocusWorkaround(headerIsInteractive);

  /**
   * Footer
   */
  const [footerRowRef, setFooterRowRef] = useState<HTMLDivElement | null>(null);
  const { height: footerRowHeight } = useResizeObserver(footerRowRef, 'height');

  const footerRow = useMemo(() => {
    if (renderFooterCellValue == null) return null;
    return (
      <EuiDataGridFooterRow
        ref={setFooterRowRef}
        leadingControlColumns={leadingControlColumns}
        trailingControlColumns={trailingControlColumns}
        columns={columns}
        schema={schema}
        columnWidths={columnWidths}
        defaultColumnWidth={defaultColumnWidth}
        renderCellValue={renderFooterCellValue}
        renderCellPopover={renderCellPopover}
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
    renderFooterCellValue,
    renderCellPopover,
    schema,
    trailingControlColumns,
    visibleRowCount,
  ]);

  /**
   * Handle scrolling cells fully into view
   */
  useScroll({
    gridRef,
    outerGridRef,
    hasGridScrolling: hasVerticalScroll || hasHorizontalScroll,
    headerRowHeight,
    footerRowHeight,
    visibleRowCount,
    hasStickyFooter: !!(renderFooterCellValue && gridStyles.stickyFooter),
  });

  /**
   * Row manager
   */
  const rowManager = useRowManager({
    innerGridRef,
    rowClasses: gridStyles.rowClasses,
  });

  /**
   * Heights
   */
  const rowHeightUtils = useRowHeightUtils({
    gridRef: gridRef.current,
    gridStyles,
    columns,
  });

  const { defaultRowHeight, setRowHeight, getRowHeight } = useDefaultRowHeight({
    rowHeightsOptions,
    rowHeightUtils,
  });

  const unconstrainedHeight = useUnconstrainedHeight({
    rowHeightUtils,
    startRow,
    endRow,
    rowHeightsOptions,
    defaultRowHeight,
    headerRowHeight,
    footerRowHeight,
    scrollBarHeight,
    innerGridRef,
  });

  /**
   * Final grid height & width
   */
  const { finalWidth, finalHeight } = useFinalGridDimensions({
    unconstrainedHeight,
    unconstrainedWidth: 0, // unable to determine this until the container's size is known
    wrapperDimensions,
    wrapperRef,
    isFullScreen,
    rowCount,
  });

  /**
   * Grid resets
   */
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.resetAfterColumnIndex(0);
    }
  }, [gridRef, columns, columnWidths, defaultColumnWidth]);

  useEffect(() => {
    if (gridRef.current && rowHeightsOptions) {
      gridRef.current.resetAfterRowIndex(0);
    }
  }, [
    gridRef,
    pagination?.pageIndex,
    rowHeightsOptions,
    gridStyles?.cellPadding,
    gridStyles?.fontSize,
  ]);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.resetAfterRowIndex(0);
    }
  }, [gridRef, getRowHeight]);

  return IS_JEST_ENVIRONMENT || finalWidth > 0 ? (
    <DataGridWrapperRowsContext.Provider
      value={{ headerRowHeight, headerRow, footerRow }}
    >
      <Grid
        {...(virtualizationOptions ? virtualizationOptions : {})}
        ref={gridRef}
        onItemsRendered={(itemsRendered) => {
          gridItemsRendered.current = itemsRendered;
        }}
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
          columnWidths,
          defaultColumnWidth,
          renderCellValue,
          renderCellPopover,
          interactiveCellId,
          rowHeightsOptions,
          rowHeightUtils,
          rowManager,
        }}
        rowCount={
          IS_JEST_ENVIRONMENT || headerRowHeight > 0 ? visibleRowCount : 0
        }
      >
        {Cell}
      </Grid>
      {scrollBorderOverlay}
    </DataGridWrapperRowsContext.Provider>
  ) : null;
};
