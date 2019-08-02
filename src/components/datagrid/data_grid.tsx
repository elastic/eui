import React, { Component, HTMLAttributes, KeyboardEvent } from 'react';
import { EuiDataGridHeaderRow } from './data_grid_header_row';
import { CommonProps, Omit } from '../common';
import {
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridPaginationProps,
} from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';
import classNames from 'classnames';
import { keyCodes } from '../../services';

// @ts-ignore-next-line
import { EuiTablePagination } from '../table/table_pagination';
import { EuiSpacer } from '../spacer';
import { EuiDataGridBody } from './data_grid_body';

// Types for styling options, passed down through the `gridStyle` prop
type EuiDataGridStyleFontSizes = 's' | 'm' | 'l';
type EuiDataGridStyleBorders = 'all' | 'horizontal' | 'none';
type EuiDataGridStyleHeader = 'shade' | 'underline';
type EuiDataGridStyleRowHover = 'highlight' | 'none';
type EuiDataGridStyleCellPaddings = 's' | 'm' | 'l';

interface EuiDataGridStyle {
  fontSize?: EuiDataGridStyleFontSizes;
  border?: EuiDataGridStyleBorders;
  stripes?: boolean;
  header?: EuiDataGridStyleHeader;
  rowHover?: EuiDataGridStyleRowHover;
  cellPadding?: EuiDataGridStyleCellPaddings;
}

type CommonGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    columns: EuiDataGridColumn[];
    rowCount: number;
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    gridStyle?: EuiDataGridStyle;
    pagination?: EuiDataGridPaginationProps;
  };

// This structure forces either aria-label or aria-labelledby to be defined
// making some type of label a requirement
type EuiDataGridProps = Omit<CommonGridProps, 'aria-label'> &
  ({ 'aria-label': string } | { 'aria-labelledby': string });

interface EuiDataGridState {
  columnWidths: EuiDataGridColumnWidths;
  focusedCell: [number, number];
}

// Each gridStyle object above sets a specific CSS select to .euiGrid
const fontSizesToClassMap: { [size in EuiDataGridStyleFontSizes]: string } = {
  s: 'euiDataGrid--fontSizeSmall',
  m: '',
  l: 'euiDataGrid--fontSizeLarge',
};

const headerToClassMap: { [header in EuiDataGridStyleHeader]: string } = {
  shade: 'euiDataGrid--headerShade',
  underline: 'euiDataGrid--headerUnderline',
};

const rowHoverToClassMap: {
  [rowHighlight in EuiDataGridStyleRowHover]: string
} = {
  highlight: 'euiDataGrid--rowHoverHighlight',
  none: '',
};

const bordersToClassMap: { [border in EuiDataGridStyleBorders]: string } = {
  all: 'euiDataGrid--bordersAll',
  horizontal: 'euiDataGrid--bordersHorizontal',
  none: 'euiDataGrid--bordersNone',
};

const cellPaddingsToClassMap: {
  [cellPaddings in EuiDataGridStyleCellPaddings]: string
} = {
  s: 'euiDataGrid--paddingSmall',
  m: '',
  l: 'euiDataGrid--paddingLarge',
};
const ORIGIN: [number, number] = [0, 0];

export class EuiDataGrid extends Component<EuiDataGridProps, EuiDataGridState> {
  state = {
    columnWidths: {},
    focusedCell: ORIGIN,
  };

  computeVisibleRows = () => {
    const { pagination, rowCount } = this.props;

    const startRow = pagination
      ? pagination.pageIndex * pagination.pageSize
      : 0;
    let endRow = pagination
      ? (pagination.pageIndex + 1) * pagination.pageSize
      : rowCount;
    endRow = Math.min(endRow, rowCount);

    return endRow - startRow;
  };

  setColumnWidth = (columnName: string, width: number) => {
    this.setState(({ columnWidths }) => ({
      columnWidths: { ...columnWidths, [columnName]: width },
    }));
  };

  handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const colCount = this.props.columns.length - 1;
    const [x, y] = this.state.focusedCell;
    const rowCount = this.computeVisibleRows();

    switch (e.keyCode) {
      case keyCodes.DOWN:
        e.preventDefault();
        if (y < rowCount) {
          this.setState({ focusedCell: [x, y + 1] });
        }
        break;
      case keyCodes.LEFT:
        e.preventDefault();
        if (x > 0) {
          this.setState({ focusedCell: [x - 1, y] });
        }
        break;
      case keyCodes.UP:
        e.preventDefault();
        // TODO sort out when a user can arrow up into the column headers
        if (y > 0) {
          this.setState({ focusedCell: [x, y - 1] });
        }
        break;
      case keyCodes.RIGHT:
        e.preventDefault();
        if (x < colCount) {
          this.setState({ focusedCell: [x + 1, y] });
        }
        break;
    }
  };

  onCellFocus = (x: number, y: number) => {
    this.setState({ focusedCell: [x, y] });
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
    const { columnWidths, focusedCell } = this.state;
    const {
      columns,
      rowCount,
      renderCellValue,
      className,
      gridStyle = {},
      pagination,
      ...rest
    } = this.props;

    const fontSize = gridStyle.fontSize || 'm';
    const border = gridStyle.border || 'all';
    const header = gridStyle.header || 'shade';
    const rowHover = gridStyle.rowHover || 'highlight';
    const stripes = gridStyle.stripes ? true : false;
    const cellPadding = gridStyle.cellPadding || 'm';

    const classes = classNames(
      'euiDataGrid',
      fontSizesToClassMap[fontSize],
      bordersToClassMap[border],
      headerToClassMap[header],
      rowHoverToClassMap[rowHover],
      cellPaddingsToClassMap[cellPadding],
      {
        'euiDataGrid--stripes': stripes,
      },
      className
    );

    return (
      // Unsure why this element causes errors as focus follows spec
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        role="grid"
        onKeyDown={this.handleKeyDown}
        // {...label}
        {...rest}
        className={classes}>
        <div className="euiDataGrid__content">
          <EuiDataGridHeaderRow
            columns={columns}
            columnWidths={columnWidths}
            setColumnWidth={this.setColumnWidth}
          />
          <EuiDataGridBody
            columnWidths={columnWidths}
            columns={columns}
            focusedCell={focusedCell}
            onCellFocus={this.onCellFocus}
            pagination={pagination}
            renderCellValue={renderCellValue}
            rowCount={rowCount}
          />
        </div>
        <EuiSpacer size="s" />
        {this.renderPagination()}
      </div>
    );
  }
}
