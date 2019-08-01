import React, { Component, HTMLAttributes, ReactElement } from 'react';
import { EuiDataGridHeaderRow } from './data_grid_header_row';
import { EuiDataGridDataRow } from './data_grid_data_row';
import { CommonProps } from '../common';
import { Column, ColumnWidths } from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';
import classNames from 'classnames';

// Component props
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

// Types for styling options, passed down through the `gridStyle` prop
type EuiDataGridStyleFontSizes = 's' | 'm' | 'l';
type EuiDataGridStyleBorders = 'all' | 'horizontalOnly' | 'none';
type EuiDataGridStyleHeader = 'minimal' | 'underline';
type EuiDataGridStyleRowHighlight = 'minimal' | 'none';
type EuiDataGridStyleCellPaddings = 's' | 'm' | 'l';

interface EuiDataGridStyle {
  fontSize?: EuiDataGridStyleFontSizes;
  border?: EuiDataGridStyleBorders;
  stripes?: boolean;
  header?: EuiDataGridStyleHeader;
  rowHighlight?: EuiDataGridStyleRowHighlight;
  cellPadding?: EuiDataGridStyleCellPaddings;
}

// Each gridStyle object above sets a specific CSS select to .euiGrid
const fontSizesToClassMap: { [size in EuiDataGridStyleFontSizes]: string } = {
  s: 'euiDataGrid--fontSizeSmall',
  m: '',
  l: 'euiDataGrid--fontSizeLarge',
};

const headerToClassMap: { [header in EuiDataGridStyleHeader]: string } = {
  minimal: 'euiDataGrid--headerMinimal',
  underline: 'euiDataGrid--headerUnderline',
};

const rowHighlightToClassMap: {
  [rowHighlight in EuiDataGridStyleRowHighlight]: string
} = {
  minimal: 'euiDataGrid--rowHighlightMinimal',
  none: '',
};

const bordersToClassMap: { [border in EuiDataGridStyleBorders]: string } = {
  all: 'euiDataGrid--bordersAll',
  horizontalOnly: 'euiDataGrid--bordersHorizontalOnly',
  none: 'euiDataGrid--bordersNone',
};

const cellPaddingsToClassMap: {
  [cellPaddings in EuiDataGridStyleCellPaddings]: string
} = {
  s: 'euiDataGrid--paddingSmall',
  m: '',
  l: 'euiDataGrid--paddingLarge',
};

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
    let cellPadding: EuiDataGridStyleCellPaddings;

    fontSize = gridStyle.fontSize ? gridStyle.fontSize : 'm';
    border = gridStyle.border ? gridStyle.border : 'all';
    header = gridStyle.header ? gridStyle.header : 'minimal';
    rowHighlight = gridStyle.rowHighlight ? gridStyle.rowHighlight : 'minimal';
    stripes = gridStyle.stripes ? true : false;
    cellPadding = gridStyle.cellPadding ? gridStyle.cellPadding : 'm';

    const classes = classNames(
      'euiDataGrid',
      fontSizesToClassMap[fontSize],
      bordersToClassMap[border],
      headerToClassMap[header],
      rowHighlightToClassMap[rowHighlight],
      cellPaddingsToClassMap[cellPadding],
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
