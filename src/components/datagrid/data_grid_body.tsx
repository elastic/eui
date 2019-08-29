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

  const rows = useMemo(() => {
    const rows = [];
    for (let i = startRow; i < endRow; i++) {
      rows.push(
        <EuiDataGridDataRow
          key={i}
          columns={columns}
          columnWidths={columnWidths}
          focusedCell={focusedCell}
          onCellFocus={onCellFocus}
          renderCellValue={renderCellValue}
          rowIndex={i}
          isGridNavigationEnabled={isGridNavigationEnabled}
          interactiveCellId={interactiveCellId}
        />
      );
    }

    return rows;
  }, [
    columns,
    columnWidths,
    endRow,
    focusedCell,
    onCellFocus,
    renderCellValue,
    startRow,
    isGridNavigationEnabled,
    interactiveCellId,
  ]);

  return <Fragment>{rows}</Fragment>;
};
