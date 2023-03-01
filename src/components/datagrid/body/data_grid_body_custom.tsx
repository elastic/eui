/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo } from 'react';

import { useDefaultColumnWidth, useColumnWidths } from '../utils/col_widths';

import { EuiDataGridBodyProps } from '../data_grid_types';
import { useDataGridHeader } from './header';
import { useDataGridFooter } from './footer';

export const EuiDataGridBodyCustomRender: FunctionComponent<EuiDataGridBodyProps> = ({
  renderCustomGridBody,
  leadingControlColumns,
  trailingControlColumns,
  columns,
  schema,
  schemaDetectors,
  visibleRows,
  renderCellPopover,
  renderFooterCellValue,
  interactiveCellId,
  headerIsInteractive,
  handleHeaderMutation,
  setVisibleColumns,
  switchColumnPos,
  onColumnResize,
  gridWidth,
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
   * Header & footer
   */
  const { headerRow } = useDataGridHeader({
    headerIsInteractive,
    handleHeaderMutation,
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

  return (
    <div className="euiDataGrid__customRenderBody">
      {headerRow}
      {renderCustomGridBody!({
        visibleColumns,
        visibleRowData: visibleRows,
        Cell: () => null, // TODO
      })}
      {footerRow}
    </div>
  );
};
