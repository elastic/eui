import React, { Component, HTMLAttributes, ReactElement } from 'react';
import { EuiDataGridHeaderRow } from './data_grid_header_row';
import { EuiDataGridDataRow } from './data_grid_data_row';
import { CommonProps } from '../common';
import { Column, ColumnWidths } from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';
import {
  EuiDataGridStyle,
  EuiDataGridStyleBorders,
  EuiDataGridStyleRowHighlight,
  EuiDataGridStyleHeader,
  EuiDataGridStyleFontSizes,
} from './data_grid_styles';
import classNames from 'classnames';

const fontSizesToClassMap: { [size in EuiDataGridStyleFontSizes]: string } = {
  s: 'euiDataGrid--fontSizeSmall',
  m: '',
  l: 'euiDataGrid--fontSizeLarge',
};

const headerToClassMap: { [header in EuiDataGridStyleHeader]: string } = {
  minimal: 'euiDataGrid--minimal',
  pronounced: 'euiDataGrid--pronounced',
  none: 'euiDataGrid--pronounced',
};

const rowHighlightToClassMap: {
  [rowHighlight in EuiDataGridStyleRowHighlight]: string
} = {
  minimal: 'euiDataGrid--minimal',
  pronounced: 'euiDataGrid--pronounced',
  none: 'euiDataGrid--pronounced',
};

const bordersToClassMap: { [border in EuiDataGridStyleBorders]: string } = {
  all: '',
  horizontalOnly: 'euiDataGrid--bordersHorizontalOnly',
  none: 'euiDataGrid--bordersNone',
};

type EuiDataGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    columns: Column[];
    rowCount: number;
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    gridStyle?: EuiDataGridStyle;
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
    const {
      columns,
      rowCount,
      renderCellValue,
      className,
      gridStyle = {},
      ...rest
    } = this.props;

    let fontSize: EuiDataGridStyleFontSizes;
    let border: EuiDataGridStyleBorders;
    let header: EuiDataGridStyleHeader;
    let rowHighlight: EuiDataGridStyleRowHighlight;
    let stripes: boolean;

    fontSize = gridStyle.fontSize ? gridStyle.fontSize : 'm';
    border = gridStyle.border ? gridStyle.border : 'all';
    header = gridStyle.header ? gridStyle.header : 'minimal';
    rowHighlight = gridStyle.rowHighlight ? gridStyle.rowHighlight : 'minimal';
    stripes = gridStyle.stripes ? true : false;

    const classes = classNames(
      'euiDataGrid',
      fontSizesToClassMap[fontSize],
      bordersToClassMap[border],
      headerToClassMap[header],
      rowHighlightToClassMap[rowHighlight],
      {
        'euiDataGrid--stripes': stripes,
      },
      className
    );

    return (
      <div {...rest} className={classes}>
        <EuiDataGridHeaderRow
          columns={columns}
          columnWidths={columnWidths}
          setColumnWidth={this.setColumnWidth}
        />
        {rows}
      </div>
    );
  }
}
