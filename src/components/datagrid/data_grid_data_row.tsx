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

import React, { FunctionComponent, HTMLAttributes, memo } from 'react';
import classnames from 'classnames';
import {
  EuiDataGridControlColumn,
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
    leadingControlColumns: EuiDataGridControlColumn[];
    trailingControlColumns: EuiDataGridControlColumn[];
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
      leadingControlColumns,
      trailingControlColumns,
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
        {leadingControlColumns.map((leadingColumn, i) => {
          const { id, rowCellRender } = leadingColumn;

          return (
            <EuiDataGridCell
              key={`${id}-${rowIndex}`}
              rowIndex={rowIndex}
              visibleRowIndex={visibleRowIndex}
              colIndex={i}
              columnId={id}
              popoverContent={DefaultColumnFormatter}
              width={leadingColumn.width}
              renderCellValue={rowCellRender}
              onCellFocus={onCellFocus}
              isFocused={focusedCellPositionInTheRow === i}
              interactiveCellId={interactiveCellId}
              isExpandable={false}
              className="euiDataGridRowCell--controlColumn"
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
          const columnPosition = i + leadingControlColumns.length;

          return (
            <EuiDataGridCell
              key={`${id}-${rowIndex}`}
              rowIndex={rowIndex}
              visibleRowIndex={visibleRowIndex}
              colIndex={columnPosition}
              columnId={id}
              columnType={columnType}
              popoverContent={popoverContent}
              width={width || undefined}
              renderCellValue={renderCellValue}
              onCellFocus={onCellFocus}
              isFocused={focusedCellPositionInTheRow === columnPosition}
              interactiveCellId={interactiveCellId}
              isExpandable={isExpandable}
            />
          );
        })}
        {trailingControlColumns.map((leadingColumn, i) => {
          const { id, rowCellRender } = leadingColumn;
          const colIndex = i + columns.length + leadingControlColumns.length;

          return (
            <EuiDataGridCell
              key={`${id}-${rowIndex}`}
              rowIndex={rowIndex}
              visibleRowIndex={visibleRowIndex}
              colIndex={colIndex}
              columnId={id}
              popoverContent={DefaultColumnFormatter}
              width={leadingColumn.width}
              renderCellValue={rowCellRender}
              onCellFocus={onCellFocus}
              isFocused={focusedCellPositionInTheRow === colIndex}
              interactiveCellId={interactiveCellId}
              isExpandable={false}
              className="euiDataGridRowCell--controlColumn"
            />
          );
        })}
      </div>
    );
  }
);

export { EuiDataGridDataRow };
