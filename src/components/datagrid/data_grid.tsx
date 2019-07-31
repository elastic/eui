import React, { Component, HTMLAttributes, ReactElement } from 'react';
import { EuiDataGridHeaderRow } from './data_grid_header_row';
import { EuiDataGridDataRow } from './data_grid_data_row';
import { CommonProps } from '../common';
import { Column, ColumnWidths } from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';
import classNames from 'classnames';

// @ts-ignore-next-line
import { EuiTablePagination } from '../table/table_pagination';

// ideally this would use a generic to enforce `pageSize` exists in `pageSizeOptions`,
// but TypeScript's default understanding of an array is number[] unless `as const` is used
// which defeats the generic's purpose & functionality as it would check for `number` in `number[]`
interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[];
  onChangeItemsPerPage: (itemsPerPage: number) => void;
  onChangePage: (pageIndex: number) => void;
}

type EuiDataGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    columns: Column[];
    rowCount: number;
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    pagination?: PaginationProps;
  };

interface EuiDataGridState {
  columnWidths: ColumnWidths;
  rows: ReactElement[];
}

function isPaginationDifferent(
  prevPagination?: PaginationProps,
  nextPagination?: PaginationProps
) {
  const prevPaginationExists = prevPagination != null;
  const nextPaginationExists = nextPagination != null;

  if (prevPaginationExists !== nextPaginationExists) {
    return true;
  }

  // if either is null then both are null
  // but TS doesn't understand that relation
  if (prevPagination == null || nextPagination == null) {
    return false;
  }

  const pageIndexDiffers =
    prevPagination.pageIndex !== nextPagination.pageIndex;
  const pageSizeDiffers = prevPagination.pageSize !== nextPagination.pageSize;

  return pageIndexDiffers || pageSizeDiffers;
}

export class EuiDataGrid extends Component<EuiDataGridProps, EuiDataGridState> {
  state = {
    columnWidths: {},
    rows: this.renderRows(),
  };

  componentDidUpdate(oldProps: EuiDataGridProps) {
    const rowsNeedUpdate = isPaginationDifferent(
      oldProps.pagination,
      this.props.pagination
    );

    if (rowsNeedUpdate) {
      this.updateRows();
    }
  }

  setColumnWidth = (columnName: string, width: number) => {
    this.setState(
      ({ columnWidths }) => ({
        columnWidths: { ...columnWidths, [columnName]: width },
      }),
      this.updateRows
    );
  };

  updateRows = () => {
    this.setState({
      rows: this.renderRows(),
    });
  };

  renderRows() {
    const { columnWidths = {} } = this.state || {};
    const { columns, rowCount, renderCellValue, pagination } = this.props;

    const startRow = pagination
      ? pagination.pageIndex * pagination.pageSize
      : 0;
    let endRow = pagination
      ? (pagination.pageIndex + 1) * pagination.pageSize
      : rowCount;
    endRow = Math.min(endRow, rowCount);

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
  }

  renderPagination() {
    const { pagination } = this.props;

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
    const pageCount = Math.ceil(this.props.rowCount / pageSize);

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

  render() {
    const { columnWidths, rows } = this.state;
    const {
      columns,
      rowCount,
      renderCellValue,
      className,
      ...rest
    } = this.props;

    return (
      <div {...rest} className={classNames(className, 'euiDataGrid')}>
        <EuiDataGridHeaderRow
          columns={columns}
          columnWidths={columnWidths}
          setColumnWidth={this.setColumnWidth}
        />
        {rows}
        {this.renderPagination()}
      </div>
    );
  }
}
