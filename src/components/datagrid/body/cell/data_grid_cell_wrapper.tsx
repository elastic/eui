/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useContext, useMemo } from 'react';
import classNames from 'classnames';

import {
  EuiDataGridCellProps,
  EuiDataGridBodyProps,
  EuiDataGridHeaderRowProps,
  EuiDataGridSchemaDetector,
} from '../../data_grid_types';
import { DataGridSortingContext } from '../../utils/sorting';
import { DataGridCellPopoverContext } from './data_grid_cell_popover';

import { EuiDataGridCell } from './data_grid_cell';

type CellProps = Pick<
  EuiDataGridCellProps,
  | 'colIndex'
  | 'visibleRowIndex'
  | 'style'
  | 'renderCellValue'
  | 'cellContext'
  | 'renderCellPopover'
  | 'interactiveCellId'
  | 'rowHeightsOptions'
  | 'rowHeightUtils'
  | 'rowManager'
  | 'setRowHeight'
> &
  Pick<
    EuiDataGridBodyProps,
    | 'schema'
    | 'schemaDetectors'
    | 'pagination'
    | 'columns'
    | 'leadingControlColumns'
    | 'trailingControlColumns'
    | 'visibleColCount'
  > &
  Pick<EuiDataGridHeaderRowProps, 'columnWidths' | 'defaultColumnWidth'> &
  Partial<EuiDataGridCellProps>;

/**
 * A DRY wrapper used by both custom and virtualized grid cells.
 * It grabs context,  determines the type of cell being rendered
 * (e.g. control vs data cell), & sets shared props between all cells
 */
export const Cell: FunctionComponent<CellProps> = ({
  colIndex,
  visibleRowIndex,
  style,
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
  rowManager,
  ...rest
}) => {
  const popoverContext = useContext(DataGridCellPopoverContext);
  const { getCorrectRowIndex } = useContext(DataGridSortingContext);

  let cellContent;

  const isFirstColumn = colIndex === 0;
  const isLastColumn = colIndex === visibleColCount - 1;

  const isLeadingControlColumn = colIndex < leadingControlColumns.length;
  const isTrailingControlColumn =
    colIndex >= leadingControlColumns.length + columns.length;

  const datacolIndex = colIndex - leadingControlColumns.length;
  const column = columns[datacolIndex];
  const columnId = column?.id;

  const textTransform = useMemo(
    () =>
      schemaDetectors.filter((row: EuiDataGridSchemaDetector) => {
        return column?.schema
          ? column?.schema === row.type
          : columnId === row.type;
      })[0]?.textTransform,
    [columnId, column?.schema, schemaDetectors]
  );

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
    colIndex,
    interactiveCellId,
    className: classes,
    style,
    rowHeightsOptions,
    rowHeightUtils,
    setRowHeight: isFirstColumn ? setRowHeight : undefined,
    rowManager,
    popoverContext,
    pagination,
    cellContext,
  };

  if (isLeadingControlColumn) {
    const leadingColumn = leadingControlColumns[colIndex];
    const { id, rowCellRender } = leadingColumn;

    cellContent = (
      <EuiDataGridCell
        {...sharedCellProps}
        columnId={id}
        width={leadingColumn.width}
        renderCellValue={rowCellRender}
        isExpandable={false}
        {...rest}
      />
    );
  } else if (isTrailingControlColumn) {
    const columnOffset = columns.length + leadingControlColumns.length;
    const trailingcolIndex = colIndex - columnOffset;
    const trailingColumn = trailingControlColumns[trailingcolIndex];
    const { id, rowCellRender } = trailingColumn;

    cellContent = (
      <EuiDataGridCell
        {...sharedCellProps}
        columnId={id}
        width={trailingColumn.width}
        renderCellValue={rowCellRender}
        isExpandable={false}
        {...rest}
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
        {...rest}
      />
    );
  }

  return cellContent;
};
