import React, { Fragment, FunctionComponent, useMemo } from 'react';
import {
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridPaginationProps,
} from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';
import {
  EuiDataGridDataRow,
  EuiDataGridDataRowProps,
} from './data_grid_data_row';

interface EuiDataGridBodyProps {
  columnWidths: EuiDataGridColumnWidths;
  columns: EuiDataGridColumn[];
  focusedCell: EuiDataGridDataRowProps['focusedCell'];
  onCellFocus: EuiDataGridDataRowProps['onCellFocus'];
  rowCount: number;
  renderCellValue: EuiDataGridCellProps['renderCellValue'];
  pagination?: EuiDataGridPaginationProps;
  isGridNavigationEnabled: EuiDataGridCellProps['isGridNavigationEnabled'];
  interactiveCellId: EuiDataGridCellProps['interactiveCellId'];
}

export const EuiDataGridBody: FunctionComponent<
  EuiDataGridBodyProps
> = props => {
  const {
    columnWidths,
    columns,
    focusedCell,
    onCellFocus,
    rowCount,
    renderCellValue,
    pagination,
    isGridNavigationEnabled,
    interactiveCellId,
  } = props;

  const startRow = pagination ? pagination.pageIndex * pagination.pageSize : 0;
  let endRow = pagination
    ? (pagination.pageIndex + 1) * pagination.pageSize
    : rowCount;
  endRow = Math.min(endRow, rowCount);

  const visibleRowIndices = useMemo(() => {
    const visibleRowIndices = [];
    for (let i = startRow; i < endRow; i++) {
      visibleRowIndices.push(i);
    }
    return visibleRowIndices;
  }, [startRow, endRow]);

  const rows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < visibleRowIndices.length; i++) {
      const rowIndex = visibleRowIndices[i];
      rows.push(
        <EuiDataGridDataRow
          key={rowIndex}
          columns={columns}
          columnWidths={columnWidths}
          focusedCell={focusedCell}
          onCellFocus={onCellFocus}
          renderCellValue={renderCellValue}
          rowIndex={rowIndex}
          isGridNavigationEnabled={isGridNavigationEnabled}
          interactiveCellId={interactiveCellId}
        />
      );
    }

    return rows;
  }, [
    columns,
    columnWidths,
    focusedCell,
    onCellFocus,
    renderCellValue,
    visibleRowIndices,
    startRow,
    isGridNavigationEnabled,
    interactiveCellId,
  ]);

  return <Fragment>{rows}</Fragment>;
};
