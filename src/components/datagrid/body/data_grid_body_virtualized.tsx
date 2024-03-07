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
  useRef,
  PropsWithChildren,
} from 'react';
import {
  GridChildComponentProps,
  VariableSizeGrid as Grid,
  VariableSizeGridProps,
} from 'react-window';
import { useResizeObserver } from '../../observer/resize_observer';
import { useDataGridHeader } from './header';
import { useDataGridFooter } from './footer';
import { Cell } from './cell';
import {
  EuiDataGridBodyProps,
  DataGridWrapperRowsContentsShape,
} from '../data_grid_types';
import { useRowManager } from './data_grid_row_manager';
import {
  useFinalGridDimensions,
  useUnconstrainedHeight,
  useVirtualizeContainerWidth,
} from '../utils/grid_height_width';
import { useDefaultColumnWidth, useColumnWidths } from '../utils/col_widths';
import { useRowHeightUtils, useDefaultRowHeight } from '../utils/row_heights';
import { useScrollBars, useScroll } from '../utils/scrolling';
import { IS_JEST_ENVIRONMENT } from '../../../utils';

export const _Cell: FunctionComponent<GridChildComponentProps> = ({
  columnIndex,
  rowIndex,
  style,
  data,
}) => {
  const { headerRowHeight } = useContext(DataGridWrapperRowsContext);
  return (
    <Cell
      colIndex={columnIndex}
      visibleRowIndex={rowIndex}
      style={{
        ...style,
        top: `${parseFloat(style.top as string) + headerRowHeight}px`,
      }}
      {...data}
    />
  );
};

// Context is required to pass props to react-window's innerElementType
// @see https://github.com/bvaughn/react-window/issues/404
export const DataGridWrapperRowsContext =
  createContext<DataGridWrapperRowsContentsShape>({
    headerRow: <div />,
    headerRowHeight: 0,
    footerRow: null,
  });

type InnerElementProps = PropsWithChildren & {
  style: {
    height: number;
  };
};

const InnerElement: VariableSizeGridProps['innerElementType'] = forwardRef<
  HTMLDivElement,
  InnerElementProps
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

export const EuiDataGridBodyVirtualized: FunctionComponent<
  EuiDataGridBodyProps
> = ({
  leadingControlColumns,
  trailingControlColumns,
  columns,
  visibleColCount,
  schema,
  schemaDetectors,
  rowCount,
  visibleRows: { startRow, endRow, visibleRowCount },
  renderCellValue,
  cellContext,
  renderCellPopover,
  renderFooterCellValue,
  interactiveCellId,
  pagination,
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
}) => {
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
   * Header & footer
   */
  const { headerRow, headerRowHeight } = useDataGridHeader({
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
  });

  const { footerRow, footerRowHeight } = useDataGridFooter({
    renderFooterCellValue,
    renderCellPopover,
    rowIndex: visibleRowCount,
    visibleRowIndex: visibleRowCount,
    interactiveCellId,
    leadingControlColumns,
    trailingControlColumns,
    columns,
    columnWidths,
    defaultColumnWidth,
    schema,
  });

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
    virtualization: {
      gridRef,
      outerGridElementRef: outerGridRef,
      gridItemsRenderedRef: gridItemsRendered,
    },
    rowHeightsOptions,
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
        className={classNames(
          'euiDataGrid__virtualized',
          virtualizationOptions?.className
        )}
        onItemsRendered={(itemsRendered) => {
          gridItemsRendered.current = itemsRendered;
          virtualizationOptions?.onItemsRendered?.(itemsRendered);
        }}
        innerElementType={InnerElement}
        outerRef={outerGridRef}
        innerRef={innerGridRef}
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
          cellContext,
          renderCellPopover,
          interactiveCellId,
          rowHeightsOptions,
          rowHeightUtils,
          rowManager,
          pagination,
        }}
        rowCount={
          IS_JEST_ENVIRONMENT || headerRowHeight > 0 ? visibleRowCount : 0
        }
      >
        {_Cell}
      </Grid>
      {scrollBorderOverlay}
    </DataGridWrapperRowsContext.Provider>
  ) : null;
};
