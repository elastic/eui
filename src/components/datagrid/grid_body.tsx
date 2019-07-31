import React, { Fragment, FunctionComponent, useMemo } from 'react';
import {
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridPaginationProps,
} from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';
import { EuiDataGridDataRow } from './data_grid_data_row';

interface EuiDataGridBodyProps {
  columnWidths: EuiDataGridColumnWidths;
  columns: EuiDataGridColumn[];
  rowCount: number;
  renderCellValue: EuiDataGridCellProps['renderCellValue'];
  pagination?: EuiDataGridPaginationProps;
}

export const EuiDataGridBody: FunctionComponent<
  EuiDataGridBodyProps
> = props => {
  const {
    columnWidths,
    columns,
    rowCount,
    renderCellValue,
    pagination,
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
          rowIndex={i}
          columns={columns}
          renderCellValue={renderCellValue}
          columnWidths={columnWidths}
        />
      );
    }

    return rows;
  }, [startRow, endRow, columnWidths, columns, renderCellValue]);

  return <Fragment>{rows}</Fragment>;
};
