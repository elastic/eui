import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import {
  EuiDataGridColumnWidths,
  EuiDataGridColumn,
  EuiDataGridSorting,
} from './data_grid_types';
import { CommonProps } from '../common';
import { EuiDataGridColumnResizer } from './data_grid_column_resizer';
import { htmlIdGenerator } from '../../services/accessibility';
import { EuiScreenReaderOnly } from '../accessibility';

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

        const ariaProps: {
          'aria-sort'?: HTMLAttributes<HTMLDivElement>['aria-sort'];
          'aria-describedby'?: HTMLAttributes<
            HTMLDivElement
          >['aria-describedby'];
        } = {};

        let screenReaderId;
        let sortString;

        if (sorting) {
          const sortedColumnIds = new Set(sorting.columns.map(({ id }) => id));

          if (sorting.columns.length === 1 && sortedColumnIds.has(id)) {
            const sortDirection = sorting.columns[0].direction;

            let sortValue: HTMLAttributes<HTMLDivElement>['aria-sort'] =
              'other';
            if (sortDirection === 'asc') {
              sortValue = 'ascending';
            } else if (sortDirection === 'desc') {
              sortValue = 'descending';
            }

            ariaProps['aria-sort'] = sortValue;
          } else if (sorting.columns.length >= 2 && sortedColumnIds.has(id)) {
            sortString = sorting.columns
              .map(col => `Sorted by ${col.id} ${col.direction}`)
              .join(' then ');
            screenReaderId = htmlIdGenerator()();
            ariaProps['aria-describedby'] = screenReaderId;
          }
        }

        return (
          <div
            role="columnheader"
            {...ariaProps}
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
            {sorting && sorting.columns.length >= 2 && (
              <EuiScreenReaderOnly>
                <div id={screenReaderId}>{sortString}</div>
              </EuiScreenReaderOnly>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { EuiDataGridHeaderRow };
