import React, { HTMLAttributes, forwardRef } from 'react';
import classnames from 'classnames';
import {
  EuiDataGridColumnWidths,
  EuiDataGridColumn,
  EuiDataGridSorting,
  EuiDataGridFocusedCell,
  EuiDataGridActionColumn,
} from './data_grid_types';
import { CommonProps } from '../common';
import { EuiDataGridSchema } from './data_grid_schema';
import { EuiDataGridDataRowProps } from './data_grid_data_row';
import { EuiDataGridHeaderCell } from './data_grid_header_cell';
import { EuiDataGridActionHeaderCell } from './data_grid_action_header_cell';

export interface EuiDataGridHeaderRowPropsSpecificProps {
  leadingColumns?: EuiDataGridActionColumn[];
  columns: EuiDataGridColumn[];
  columnWidths: EuiDataGridColumnWidths;
  schema: EuiDataGridSchema;
  defaultColumnWidth?: number | null;
  setColumnWidth: (columnId: string, width: number) => void;
  sorting?: EuiDataGridSorting;
  focusedCell: EuiDataGridFocusedCell;
  setFocusedCell: EuiDataGridDataRowProps['onCellFocus'];
  headerIsInteractive: boolean;
}

export type EuiDataGridHeaderRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  EuiDataGridHeaderRowPropsSpecificProps;

const EuiDataGridHeaderRow = forwardRef<
  HTMLDivElement,
  EuiDataGridHeaderRowProps
>((props, ref) => {
  const {
    leadingColumns = [],
    columns,
    schema,
    columnWidths,
    defaultColumnWidth,
    className,
    setColumnWidth,
    sorting,
    focusedCell,
    setFocusedCell,
    headerIsInteractive,
    'data-test-subj': _dataTestSubj,
    ...rest
  } = props;

  const classes = classnames('euiDataGridHeader', className);
  const dataTestSubj = classnames('dataGridHeader', _dataTestSubj);

  return (
    <div
      role="row"
      ref={ref}
      className={classes}
      data-test-subj={dataTestSubj}
      {...rest}>
      {leadingColumns.map((actionColumn, index) => (
        <EuiDataGridActionHeaderCell
          key={actionColumn.id}
          index={index}
          actionColumn={actionColumn}
          focusedCell={focusedCell}
          setFocusedCell={setFocusedCell}
          headerIsInteractive={headerIsInteractive}
        />
      ))}
      {columns.map((column, index) => (
        <EuiDataGridHeaderCell
          key={column.id}
          column={column}
          index={index}
          columnWidths={columnWidths}
          focusedCell={focusedCell}
          setFocusedCell={setFocusedCell}
          schema={schema}
          setColumnWidth={setColumnWidth}
          defaultColumnWidth={defaultColumnWidth}
          sorting={sorting}
          headerIsInteractive={headerIsInteractive}
        />
      ))}
    </div>
  );
});

export { EuiDataGridHeaderRow };
