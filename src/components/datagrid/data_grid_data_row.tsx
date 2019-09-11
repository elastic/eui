import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { EuiDataGridColumn, EuiDataGridColumnWidths } from './data_grid_types';
import { CommonProps } from '../common';

import { EuiDataGridCell, EuiDataGridCellProps } from './data_grid_cell';

export type EuiDataGridDataRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    rowIndex: number;
    columns: EuiDataGridColumn[];
    columnWidths: EuiDataGridColumnWidths;
    defaultColumnWidth?: number | null;
    focusedCell: [number, number];
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    isGridNavigationEnabled: EuiDataGridCellProps['isGridNavigationEnabled'];
    onCellFocus: Function;
    interactiveCellId: EuiDataGridCellProps['interactiveCellId'];
    visibleRowIndex: number;
  };

const EuiDataGridDataRow: FunctionComponent<
  EuiDataGridDataRowProps
> = props => {
  const {
    columns,
    columnWidths,
    defaultColumnWidth,
    className,
    renderCellValue,
    rowIndex,
    focusedCell,
    onCellFocus,
    isGridNavigationEnabled,
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

        const width = columnWidths[id] || defaultColumnWidth;

        const isFocusable =
          focusedCell[0] === i && focusedCell[1] === visibleRowIndex;

        return (
          <EuiDataGridCell
            key={`${id}-${rowIndex}`}
            rowIndex={rowIndex}
            colIndex={i}
            columnId={id}
            width={width || undefined}
            renderCellValue={renderCellValue}
            onCellFocus={onCellFocus}
            isFocusable={isFocusable}
            isGridNavigationEnabled={isGridNavigationEnabled}
            interactiveCellId={interactiveCellId}
          />
        );
      })}
    </div>
  );
};

export { EuiDataGridDataRow };
