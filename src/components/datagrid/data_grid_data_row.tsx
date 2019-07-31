import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { EuiDataGridColumn, EuiDataGridColumnWidths } from './data_grid_types';
import { CommonProps } from '../common';

import { DEFAULT_COLUMN_WIDTH } from './data_grid_header_row';
import { EuiDataGridCell, EuiDataGridCellProps } from './data_grid_cell';

type EuiDataGridDataRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    rowIndex: number;
    columns: EuiDataGridColumn[];
    columnWidths: EuiDataGridColumnWidths;
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
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
    'data-test-subj': _dataTestSubj,
    ...rest
  } = props;

  const classes = classnames('euiDataGridRow', className);
  const dataTestSubj = classnames('dataGridRow', _dataTestSubj);

  return (
    <div className={classes} data-test-subj={dataTestSubj} {...rest}>
      {columns.map(props => {
        const { name } = props;

        const width = columnWidths.hasOwnProperty(name)
          ? columnWidths[name]
          : DEFAULT_COLUMN_WIDTH;

        return (
          <EuiDataGridCell
            key={name}
            rowIndex={rowIndex}
            columnName={name}
            width={width}
            renderCellValue={renderCellValue}
          />
        );
      })}
    </div>
  );
};

export { EuiDataGridDataRow };
