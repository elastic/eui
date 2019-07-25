import React, { Component, HTMLAttributes, ReactElement } from 'react';
import { EuiDataGridHeaderRow } from './data_grid_header_row';
import { EuiDataGridDataRow } from './data_grid_data_row';
import { CommonProps } from '../common';
import { Column, ColumnWidths } from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';

type EuiDataGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    columns: Column[];
    rowCount: number;
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
  };

interface EuiDataGridState {
  columnWidths: ColumnWidths;
  rows: ReactElement[];
}

export class EuiDataGrid extends Component<EuiDataGridProps, EuiDataGridState> {
  state = {
    columnWidths: {},
    rows: this.renderRows(),
  };

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
    const { columns, rowCount, renderCellValue } = this.props;

    const rows = [];
    for (let i = 0; i < rowCount; i++) {
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

  render() {
    const { columnWidths, rows } = this.state;
    const { columns, rowCount, renderCellValue, ...rest } = this.props;

    return (
      <div {...rest}>
        <EuiDataGridHeaderRow
          columns={columns}
          columnWidths={columnWidths}
          setColumnWidth={this.setColumnWidth}
        />
        <div className="dataGridBody">{rows}</div>
      </div>
    );
  }
}
