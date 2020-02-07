import React, { FunctionComponent, HTMLAttributes, memo } from 'react';
import classnames from 'classnames';
import {
  EuiDataGridActionColumn,
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridPopoverContent,
  EuiDataGridPopoverContents,
} from './data_grid_types';
import { CommonProps } from '../common';

import { EuiDataGridCell, EuiDataGridCellProps } from './data_grid_cell';
import { EuiDataGridSchema } from './data_grid_schema';
import { EuiText } from '../text';

export type EuiDataGridDataRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    rowIndex: number;
    leadingColumns: EuiDataGridActionColumn[];
    columns: EuiDataGridColumn[];
    schema: EuiDataGridSchema;
    popoverContents: EuiDataGridPopoverContents;
    columnWidths: EuiDataGridColumnWidths;
    defaultColumnWidth?: number | null;
    focusedCellPositionInTheRow?: number | null;
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    onCellFocus: Function;
    interactiveCellId: EuiDataGridCellProps['interactiveCellId'];
    visibleRowIndex: number;
  };

const DefaultColumnFormatter: EuiDataGridPopoverContent = ({ children }) => {
  return <EuiText>{children}</EuiText>;
};

const EuiDataGridDataRow: FunctionComponent<EuiDataGridDataRowProps> = memo(
  props => {
    const {
      leadingColumns,
      columns,
      schema,
      popoverContents,
      columnWidths,
      defaultColumnWidth,
      className,
      renderCellValue,
      rowIndex,
      focusedCellPositionInTheRow,
      onCellFocus,
      interactiveCellId,
      'data-test-subj': _dataTestSubj,
      visibleRowIndex,
      ...rest
    } = props;

    const classes = classnames('euiDataGridRow', className);
    const dataTestSubj = classnames('dataGridRow', _dataTestSubj);

    return (
      <div
        role="row"
        className={classes}
        data-test-subj={dataTestSubj}
        {...rest}>
        {leadingColumns.map((leadingColumn, i) => {
          const { id, rowCellRender, popoverContent } = leadingColumn;

          const isExpandable =
            leadingColumn.isExpandable !== undefined
              ? leadingColumn.isExpandable
              : true;

          return (
            <EuiDataGridCell
              key={`${id}-${rowIndex}`}
              rowIndex={rowIndex}
              visibleRowIndex={visibleRowIndex}
              colIndex={i}
              columnId={id}
              popoverContent={popoverContent || DefaultColumnFormatter}
              width={leadingColumn.width}
              renderCellValue={rowCellRender}
              onCellFocus={onCellFocus}
              isFocused={focusedCellPositionInTheRow === i}
              interactiveCellId={interactiveCellId}
              isExpandable={isExpandable}
            />
          );
        })}
        {columns.map((props, i) => {
          const { id } = props;
          const columnType = schema[id] ? schema[id].columnType : null;

          const isExpandable =
            props.isExpandable !== undefined ? props.isExpandable : true;
          const popoverContent =
            popoverContents[columnType as string] || DefaultColumnFormatter;

          const width = columnWidths[id] || defaultColumnWidth;

          return (
            <EuiDataGridCell
              key={`${id}-${rowIndex}`}
              rowIndex={rowIndex}
              visibleRowIndex={visibleRowIndex}
              colIndex={i}
              columnId={id}
              columnType={columnType}
              popoverContent={popoverContent}
              width={width || undefined}
              renderCellValue={renderCellValue}
              onCellFocus={onCellFocus}
              isFocused={focusedCellPositionInTheRow === i}
              interactiveCellId={interactiveCellId}
              isExpandable={isExpandable}
            />
          );
        })}
      </div>
    );
  }
);

export { EuiDataGridDataRow };
