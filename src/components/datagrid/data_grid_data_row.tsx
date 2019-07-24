import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';
import { Column, ColumnWidths } from './data_grid_types';
import { CommonProps } from '../common';

import { DEFAULT_COLUMN_WIDTH } from './data_grid_header_row';

type EuiDataGridDataRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    rowIndex: number;
    columns: Column[];
    columnWidths: ColumnWidths;
    renderCellValue: (rowIndex: number, columnName: string) => ReactNode;
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
    ...rest
  } = props;

  const classes = classnames('euiDataGridRow', className);

  return (
    <div className={classes} {...rest}>
      {columns.map(props => {
        const { name } = props;

        const width = columnWidths.hasOwnProperty(name)
          ? columnWidths[name]
          : DEFAULT_COLUMN_WIDTH;

        return (
          <div
            key={name}
            className={classnames('euiDataGridRowCell')}
            style={{ width: `${width}px` }}>
            {renderCellValue(rowIndex, name)}
          </div>
        );
      })}
    </div>
  );
};

export { EuiDataGridDataRow };
