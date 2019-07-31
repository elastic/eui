import React, { Component, HTMLAttributes } from 'react';
import { EuiDataGridHeaderRow } from './data_grid_header_row';
import { CommonProps } from '../common';
import {
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridPaginationProps,
} from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';
import classNames from 'classnames';

// @ts-ignore-next-line
import { EuiTablePagination } from '../table/table_pagination';
import { EuiDataGridBody } from './grid_body';

type EuiDataGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    columns: EuiDataGridColumn[];
    rowCount: number;
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    pagination?: EuiDataGridPaginationProps;
  };

interface EuiDataGridState {
  columnWidths: EuiDataGridColumnWidths;
}

export class EuiDataGrid extends Component<EuiDataGridProps, EuiDataGridState> {
  state = {
    columnWidths: {},
  };

  setColumnWidth = (columnName: string, width: number) => {
    this.setState(({ columnWidths }) => ({
      columnWidths: { ...columnWidths, [columnName]: width },
    }));
  };

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
    const { columnWidths } = this.state;
    const {
      columns,
      rowCount,
      renderCellValue,
      className,
      pagination,
      ...rest
    } = this.props;

    return (
      <div {...rest} className={classNames(className, 'euiDataGrid')}>
        <EuiDataGridHeaderRow
          columns={columns}
          columnWidths={columnWidths}
          setColumnWidth={this.setColumnWidth}
        />
        <EuiDataGridBody
          columnWidths={columnWidths}
          columns={columns}
          rowCount={rowCount}
          renderCellValue={renderCellValue}
          pagination={pagination}
        />
        {this.renderPagination()}
      </div>
    );
  }
}
