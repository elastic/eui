import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { ColumnWidths, Column } from './data_grid_types';
import { CommonProps } from '../common';
import { EuiDataGridColumnResizer } from './data_grid_column_resizer';

export const DEFAULT_COLUMN_WIDTH = 100;

type EuiDataGridHeaderRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    columns: Column[];
    columnWidths: ColumnWidths;
    setColumnWidth: (columnName: string, width: number) => void;
  };

const EuiDataGridHeaderRow: FunctionComponent<
  EuiDataGridHeaderRowProps
> = props => {
  const { columns, columnWidths, className, setColumnWidth, ...rest } = props;

  const classes = classnames('euiDataGridHeader', className);

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
            className="euiDataGridHeaderCell"
            style={{ width: `${width}px` }}>
            <EuiDataGridColumnResizer
              columnName={name}
              columnWidth={width}
              setColumnWidth={setColumnWidth}
            />
            <div className="euiDataGridHeaderCell__content">{name}</div>
          </div>
        );
      })}
    </div>
  );
};

export { EuiDataGridHeaderRow };
