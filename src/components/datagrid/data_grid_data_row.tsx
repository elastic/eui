import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { EuiDataGridColumn, EuiDataGridColumnWidths } from './data_grid_types';
import { CommonProps } from '../common';

import { DEFAULT_COLUMN_WIDTH } from './data_grid_header_row';
import { EuiDataGridCell, EuiDataGridCellProps } from './data_grid_cell';

export type EuiDataGridDataRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    rowIndex: number;
    columns: EuiDataGridColumn[];
    columnWidths: EuiDataGridColumnWidths;
    focusedCell: [number, number];
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    onCellFocus: Function;
  };

const EuiDataGridDataRow: FunctionComponent<
  EuiDataGridDataRowProps
> = props => {
  const {
    columns,
    columnWidths,
    className,
    renderCellValue,
    rowIndex,
    focusedCell,
    onCellFocus,
    'data-test-subj': _dataTestSubj,
    ...rest
  } = props;

  const classes = classnames('euiDataGridRow', className);
  const dataTestSubj = classnames('dataGridRow', _dataTestSubj);

  return (
    <div role="row" className={classes} data-test-subj={dataTestSubj} {...rest}>
      {columns.map((props, i) => {
        const { name } = props;

        const width = columnWidths.hasOwnProperty(name)
          ? columnWidths[name]
          : DEFAULT_COLUMN_WIDTH;

        const isFocusable = focusedCell[0] === i && focusedCell[1] === rowIndex;

        return (
          <EuiDataGridCell
            key={name}
            rowIndex={rowIndex}
            colIndex={i}
            columnName={name}
            width={width}
            renderCellValue={renderCellValue}
            onCellFocus={onCellFocus}
            isFocusable={isFocusable}
          />
        );
      })}
    </div>
  );
};

export { EuiDataGridDataRow };
