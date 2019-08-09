import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { EuiDataGridColumnWidths, EuiDataGridColumn } from './data_grid_types';
import { CommonProps } from '../common';
import { EuiDataGridColumnResizer } from './data_grid_column_resizer';

type EuiDataGridHeaderRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    columns: EuiDataGridColumn[];
    columnWidths: EuiDataGridColumnWidths;
    setColumnWidth: (columnId: string, width: number) => void;
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
        const { id } = props;

        const width = columnWidths[id];

        return (
          <div
            role="columnheader"
            key={id}
            className="euiDataGridHeaderCell"
            data-test-subj={`dataGridHeaderCell-${id}`}
            style={{ width: `${width}px` }}>
            {width ? (
              <EuiDataGridColumnResizer
                columnId={id}
                columnWidth={width}
                setColumnWidth={setColumnWidth}
              />
            ) : null}

            <div className="euiDataGridHeaderCell__content">{id}</div>
          </div>
        );
      })}
    </div>
  );
};

export { EuiDataGridHeaderRow };
