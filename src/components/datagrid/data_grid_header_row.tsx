/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { HTMLAttributes, forwardRef } from 'react';
import classnames from 'classnames';
import {
  EuiDataGridColumnWidths,
  EuiDataGridColumn,
  EuiDataGridSorting,
  EuiDataGridFocusedCell,
  EuiDataGridControlColumn,
} from './data_grid_types';
import { CommonProps } from '../common';
import { EuiDataGridSchema } from './data_grid_schema';
import { EuiDataGridDataRowProps } from './data_grid_data_row';
import { EuiDataGridHeaderCell } from './data_grid_header_cell';
import { EuiDataGridControlHeaderCell } from './data_grid_control_header_cell';

export interface EuiDataGridHeaderRowPropsSpecificProps {
  leadingControlColumns?: EuiDataGridControlColumn[];
  trailingControlColumns?: EuiDataGridControlColumn[];
  columns: EuiDataGridColumn[];
  columnWidths: EuiDataGridColumnWidths;
  schema: EuiDataGridSchema;
  defaultColumnWidth?: number | null;
  setColumnWidth: (columnId: string, width: number) => void;
  sorting?: EuiDataGridSorting;
  focusedCell?: EuiDataGridFocusedCell;
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
    leadingControlColumns = [],
    trailingControlColumns = [],
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
      {leadingControlColumns.map((controlColumn, index) => (
        <EuiDataGridControlHeaderCell
          key={controlColumn.id}
          index={index}
          controlColumn={controlColumn}
          focusedCell={focusedCell}
          setFocusedCell={setFocusedCell}
          headerIsInteractive={headerIsInteractive}
          className="euiDataGridHeaderCell--controlColumn"
        />
      ))}
      {columns.map((column, index) => (
        <EuiDataGridHeaderCell
          key={column.id}
          column={column}
          index={index + leadingControlColumns.length}
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
      {trailingControlColumns.map((controlColumn, index) => (
        <EuiDataGridControlHeaderCell
          key={controlColumn.id}
          index={index + leadingControlColumns.length + columns.length}
          controlColumn={controlColumn}
          focusedCell={focusedCell}
          setFocusedCell={setFocusedCell}
          headerIsInteractive={headerIsInteractive}
          className="euiDataGridHeaderCell--controlColumn"
        />
      ))}
    </div>
  );
});

export { EuiDataGridHeaderRow };
