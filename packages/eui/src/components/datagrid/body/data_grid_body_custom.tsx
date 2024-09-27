/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState, useMemo } from 'react';
import classNames from 'classnames';

import { useDefaultColumnWidth, useColumnWidths } from '../utils/col_widths';
import { useRowHeightUtils, useDefaultRowHeight } from '../utils/row_heights';

import {
  EuiDataGridBodyProps,
  EuiDataGridCustomBodyProps,
  EuiDataGridSetCustomGridBodyProps,
} from '../data_grid_types';
import { useDataGridHeader } from './header';
import { useDataGridFooter } from './footer';
import { CellWrapper } from './cell';

export const EuiDataGridBodyCustomRender: FunctionComponent<
  EuiDataGridBodyProps
> = ({
  renderCustomGridBody,
  renderCellValue,
  cellContext,
  renderCellPopover,
  renderFooterCellValue,
  interactiveCellId,
  visibleRows,
  visibleColCount,
  leadingControlColumns,
  trailingControlColumns,
  columns,
  setVisibleColumns,
  switchColumnPos,
  onColumnResize,
  schema,
  schemaDetectors,
  sorting,
  pagination,
  rowHeightsOptions,
  gridWidth,
  gridStyles,
}) => {
  /**
   * Columns & widths
   */
  const visibleColumns = useMemo(() => {
    return [...leadingControlColumns, ...columns, ...trailingControlColumns];
  }, [columns, leadingControlColumns, trailingControlColumns]);

  // compute the default column width from the container's width and count of visible columns
  const defaultColumnWidth = useDefaultColumnWidth(
    gridWidth,
    leadingControlColumns,
    trailingControlColumns,
    columns
  );

  const { columnWidths, setColumnWidth } = useColumnWidths({
    columns,
    leadingControlColumns,
    trailingControlColumns,
    defaultColumnWidth,
    onColumnResize,
  });

  /**
   * Row heights
   */
  const rowHeightUtils = useRowHeightUtils({
    rowHeightsOptions,
    gridStyles,
    columns,
  });

  const { setRowHeight, getRowHeight } = useDefaultRowHeight({
    rowHeightsOptions,
    rowHeightUtils,
  });

  /**
   * Header & footer
   */
  const { headerRow } = useDataGridHeader({
    leadingControlColumns,
    trailingControlColumns,
    columns,
    columnWidths,
    defaultColumnWidth,
    setColumnWidth,
    setVisibleColumns,
    switchColumnPos,
    sorting,
    schema,
    schemaDetectors,
  });

  const { footerRow } = useDataGridFooter({
    renderFooterCellValue,
    renderCellPopover,
    rowIndex: visibleRows.visibleRowCount,
    visibleRowIndex: visibleRows.visibleRowCount,
    interactiveCellId,
    leadingControlColumns,
    trailingControlColumns,
    columns,
    columnWidths,
    defaultColumnWidth,
    schema,
  });

  /**
   * Cell render fn
   */
  const cellProps = useMemo(() => {
    return {
      schema,
      schemaDetectors,
      pagination,
      columns,
      leadingControlColumns,
      trailingControlColumns,
      visibleColCount,
      columnWidths,
      defaultColumnWidth,
      renderCellValue,
      cellContext,
      renderCellPopover,
      interactiveCellId,
      setRowHeight,
      rowHeightsOptions,
      rowHeightUtils,
    };
  }, [
    schema,
    schemaDetectors,
    pagination,
    columns,
    leadingControlColumns,
    trailingControlColumns,
    visibleColCount,
    columnWidths,
    defaultColumnWidth,
    renderCellValue,
    cellContext,
    renderCellPopover,
    interactiveCellId,
    setRowHeight,
    rowHeightsOptions,
    rowHeightUtils,
  ]);

  const Cell = useMemo<EuiDataGridCustomBodyProps['Cell']>(
    () =>
      ({ colIndex, visibleRowIndex, ...rest }) => {
        const style = {
          height: rowHeightUtils.isAutoHeight(
            visibleRowIndex,
            rest.rowHeightsOptions ?? rowHeightsOptions
          )
            ? 'auto'
            : getRowHeight(visibleRowIndex),
        };

        const props = {
          colIndex,
          visibleRowIndex,
          style,
          ...cellProps,
        };
        return <CellWrapper {...props} {...rest} />;
      },
    [cellProps, getRowHeight, rowHeightUtils, rowHeightsOptions]
  );

  // Allow consumers to pass custom props/attributes/listeners etc. to the wrapping div
  const [customGridBodyProps, setCustomGridBodyProps] =
    useState<EuiDataGridSetCustomGridBodyProps>({});

  const customDataGridBodyProps: EuiDataGridCustomBodyProps = useMemo(
    () => ({
      gridWidth,
      visibleColumns,
      visibleRowData: visibleRows,
      Cell,
      setCustomGridBodyProps,
    }),
    [gridWidth, visibleColumns, visibleRows, Cell, setCustomGridBodyProps]
  );

  /**
   * 1. width of grid body is the sum of all column widths
   * 2. scrollbar
   *
   * */

  return (
    <div
      {...customGridBodyProps}
      className={classNames(
        'euiDataGrid__customRenderBody',
        customGridBodyProps?.className
      )}
    >
      {headerRow}
      {renderCustomGridBody!(customDataGridBodyProps)}
      {footerRow}
    </div>
  );
};
