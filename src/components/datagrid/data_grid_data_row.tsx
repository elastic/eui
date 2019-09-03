import React, { FunctionComponent, HTMLAttributes, useMemo } from 'react';
import classnames from 'classnames';
import { EuiDataGridColumn, EuiDataGridColumnWidths } from './data_grid_types';
import { CommonProps } from '../common';

import { EuiDataGridCell, EuiDataGridCellProps } from './data_grid_cell';

export type EuiDataGridDataRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    rowIndex: number;
    columns: EuiDataGridColumn[];
    columnWidths: EuiDataGridColumnWidths;
    focusedCell: [number, number];
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    isGridNavigationEnabled: EuiDataGridCellProps['isGridNavigationEnabled'];
    onCellFocus: Function;
    interactiveCellId: EuiDataGridCellProps['interactiveCellId'];
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
    isGridNavigationEnabled,
    interactiveCellId,
    'data-test-subj': _dataTestSubj,
    ...rest
  } = props;

  const classes = classnames('euiDataGridRow', className);
  const dataTestSubj = classnames('dataGridRow', _dataTestSubj);

  return (
    <div role="row" className={classes} data-test-subj={dataTestSubj} {...rest}>
      {columns.map((props, i) => {
        const { id } = props;

        const width = columnWidths[id];

        const isFocusable = focusedCell[0] === i && focusedCell[1] === rowIndex;
        return useMemo(
          () => (
            <EuiDataGridCell
              key={id}
              rowIndex={rowIndex}
              colIndex={i}
              columnId={id}
              width={width}
              renderCellValue={renderCellValue}
              onCellFocus={onCellFocus}
              isFocusable={isFocusable}
              isGridNavigationEnabled={isGridNavigationEnabled}
              interactiveCellId={interactiveCellId}
            />
          ),
          [
            id,
            rowIndex,
            i,
            width,
            renderCellValue,
            onCellFocus,
            isFocusable,
            isGridNavigationEnabled,
            interactiveCellId,
          ]
        );
      })}
    </div>
  );
};

export { EuiDataGridDataRow };
