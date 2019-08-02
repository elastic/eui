import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { EuiDataGridColumnWidths, EuiDataGridColumn } from './data_grid_types';
import { CommonProps } from '../common';
import { EuiDataGridColumnResizer } from './data_grid_column_resizer';

export const DEFAULT_COLUMN_WIDTH = 100;

type EuiDataGridHeaderRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    columns: EuiDataGridColumn[];
    columnWidths: EuiDataGridColumnWidths;
    setColumnWidth: (columnName: string, width: number) => void;
  };

const EuiDataGridHeaderRow: FunctionComponent<
  EuiDataGridHeaderRowProps
> = props => {
  const {
    columns,
    columnWidths,
    className,
    setColumnWidth,
    'data-test-subj': _dataTestSubj,
    ...rest
  } = props;

  const classes = classnames('euiDataGridHeader', className);
  const dataTestSubj = classnames('dataGridHeader', _dataTestSubj);

  return (
    <div className={classes} data-test-subj={dataTestSubj} {...rest}>
      {columns.map(props => {
        const { name } = props;

        const width = columnWidths.hasOwnProperty(name)
          ? columnWidths[name]
          : DEFAULT_COLUMN_WIDTH;

        return (
          <div
            role="columnheader"
            key={name}
            className="euiDataGridHeaderCell"
            data-test-subj="dataGridHeaderCell"
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
