import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import {
  EuiDataGridColumnWidths,
  EuiDataGridColumn,
  EuiDataGridSorting,
} from './data_grid_types';
import { CommonProps } from '../common';
import { EuiDataGridColumnResizer } from './data_grid_column_resizer';

type EuiDataGridHeaderRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    columns: EuiDataGridColumn[];
    columnWidths: EuiDataGridColumnWidths;
    setColumnWidth: (columnId: string, width: number) => void;
    sorting?: EuiDataGridSorting;
  };

const EuiDataGridHeaderRow: FunctionComponent<
  EuiDataGridHeaderRowProps
> = props => {
  const {
    columns,
    columnWidths,
    className,
    setColumnWidth,
    sorting,
    'data-test-subj': _dataTestSubj,
    ...rest
  } = props;

  const classes = classnames('euiDataGridHeader', className);
  const dataTestSubj = classnames('dataGridHeader', _dataTestSubj);

  return (
    <div role="row" className={classes} data-test-subj={dataTestSubj} {...rest}>
      {columns.map(props => {
        const { id } = props;

        const width = columnWidths[id];

        const ariaSort: {
          'aria-sort'?: HTMLAttributes<HTMLDivElement>['aria-sort'];
        } = {};
        if (
          sorting &&
          sorting.columns.length === 1 &&
          sorting.columns[0].id === id
        ) {
          const sortDirection = sorting.columns[0].direction;

          let sortValue: HTMLAttributes<HTMLDivElement>['aria-sort'] = 'other';
          if (sortDirection === 'asc') {
            sortValue = 'ascending';
          } else if (sortDirection === 'desc') {
            sortValue = 'descending';
          }

          ariaSort['aria-sort'] = sortValue;
        }

        return (
          <div
            role="columnheader"
            {...ariaSort}
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
