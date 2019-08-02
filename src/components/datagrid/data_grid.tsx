import React, {
  Component,
  HTMLAttributes,
  ReactElement,
  KeyboardEvent,
} from 'react';
import { EuiDataGridHeaderRow } from './data_grid_header_row';
import { EuiDataGridDataRow } from './data_grid_data_row';
import { CommonProps, Omit } from '../common';
import { Column, ColumnWidths } from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';
import classNames from 'classnames';
import { keyCodes } from '../../services';

type CommonGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    columns: Column[];
    rowCount: number;
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
  };

// This structure forces either aria-label or aria-labelledby to be defined
// making some type of label a requirement
type EuiDataGridProps = Omit<CommonGridProps, 'aria-label'> &
  ({ 'aria-label': string } | { 'aria-labelledby': string });

interface EuiDataGridState {
  columnWidths: ColumnWidths;
  rows: ReactElement[];
  focusedCell: [number, number];
}

const ORIGIN: [number, number] = [0, 0];

export class EuiDataGrid extends Component<EuiDataGridProps, EuiDataGridState> {
  state = {
    columnWidths: {},
    rows: this.renderRows(),
    focusedCell: ORIGIN,
  };

  setColumnWidth = (columnName: string, width: number) => {
    this.setState(
      ({ columnWidths }) => ({
        columnWidths: { ...columnWidths, [columnName]: width },
      }),
      this.updateRows
    );
  };

  handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const colCount = this.props.columns.length - 1;
    const [x, y] = this.state.focusedCell;
    const rowCount = this.state.rows.length - 1;

    switch (e.keyCode) {
      case keyCodes.DOWN:
        e.preventDefault();
        if (y < rowCount) {
          this.setState({ focusedCell: [x, y + 1] }, this.updateRows);
        }
        break;
      case keyCodes.LEFT:
        e.preventDefault();
        if (x > 0) {
          this.setState({ focusedCell: [x - 1, y] }, this.updateRows);
        }
        break;
      case keyCodes.UP:
        e.preventDefault();
        // TODO sort out when a user can arrow up into the column headers
        if (y > 0) {
          this.setState({ focusedCell: [x, y - 1] }, this.updateRows);
        }
        break;
      case keyCodes.RIGHT:
        e.preventDefault();
        if (x < colCount) {
          this.setState({ focusedCell: [x + 1, y] }, this.updateRows);
        }
        break;
    }
  };

  onCellFocus = (x: number, y: number) => {
    this.setState({ focusedCell: [x, y] });
  };

  updateRows = () => {
    this.setState({
      rows: this.renderRows(),
    });
  };

  renderRows() {
    const { columnWidths = {}, focusedCell = ORIGIN as [number, number] } =
      this.state || {};
    const { columns, rowCount, renderCellValue } = this.props;
    const onCellFocus = this.onCellFocus || function() {}; // TODO re-enable after PR#2188
    const rows = [];

    for (let i = 0; i < rowCount; i++) {
      rows.push(
        <EuiDataGridDataRow
          key={i}
          rowIndex={i}
          focusedCell={focusedCell}
          columns={columns}
          renderCellValue={renderCellValue}
          columnWidths={columnWidths}
          onCellFocus={onCellFocus}
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
      ...rest
    } = this.props;
    return (
      // Unsure why this element causes errors as focus follows spec
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        role="grid"
        onKeyDown={this.handleKeyDown}
        // {...label}
        {...rest}
        className={classNames(className, 'euiDataGrid')}>
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
