import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { EuiDataGridColumn, EuiDataGridColumnWidths } from './data_grid_types';
import { CommonProps } from '../common';

import { EuiDataGridCell, EuiDataGridCellProps } from './data_grid_cell';
import { EuiDataGridSchema } from './data_grid_schema';

export type EuiDataGridDataRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    rowIndex: number;
    columns: EuiDataGridColumn[];
    schema: EuiDataGridSchema;
    columnWidths: EuiDataGridColumnWidths;
    defaultColumnWidth?: number | null;
    focusedCell: [number, number];
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    onCellFocus: Function;
    interactiveCellId: EuiDataGridCellProps['interactiveCellId'];
    visibleRowIndex: number;
  };

const EuiDataGridDataRow: FunctionComponent<
  EuiDataGridDataRowProps
> = props => {
  const {
    columns,
    schema,
    columnWidths,
    defaultColumnWidth,
    className,
    renderCellValue,
    rowIndex,
    focusedCell,
    onCellFocus,
    interactiveCellId,
    'data-test-subj': _dataTestSubj,
    visibleRowIndex,
    ...rest
  } = props;

  const classes = classnames('euiDataGridRow', className);
  const dataTestSubj = classnames('dataGridRow', _dataTestSubj);

  return (
    <div role="row" className={classes} data-test-subj={dataTestSubj} {...rest}>
      {columns.map((props, i) => {
        const { id } = props;
        const isExpandable =
          props.isExpandable !== undefined ? props.isExpandable : true;

        const width = columnWidths[id] || defaultColumnWidth;

        const isFocused =
          focusedCell[0] === i && focusedCell[1] === visibleRowIndex;

        return (
          <EuiDataGridCell
            key={`${id}-${rowIndex}`}
            rowIndex={rowIndex}
            colIndex={i}
            columnId={id}
            columnType={schema[id] ? schema[id].columnType : null}
            width={width || undefined}
            renderCellValue={renderCellValue}
            onCellFocus={onCellFocus}
            isFocused={isFocused}
            interactiveCellId={interactiveCellId}
            isExpandable={isExpandable}
          />
        );
      })}
    </div>
  );
};

export { EuiDataGridDataRow };
