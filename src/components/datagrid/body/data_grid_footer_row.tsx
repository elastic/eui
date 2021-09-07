/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classnames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { EuiDataGridCell } from './data_grid_cell';
import { DefaultColumnFormatter } from './popover_utils';
import { EuiDataGridFooterRowProps } from '../data_grid_types';

const EuiDataGridFooterRow = memo(
  forwardRef<HTMLDivElement, EuiDataGridFooterRowProps>(
    (
      {
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
        interactiveCellId,
        'data-test-subj': _dataTestSubj,
        visibleRowIndex = rowIndex,
        ...rest
      },
      ref
    ) => {
      const classes = classnames(
        'euiDataGridRow',
        'euiDataGridFooter',
        className
      );
      const dataTestSubj = classnames('dataGridRow', _dataTestSubj);

      return (
        <div
          ref={ref}
          role="row"
          className={classes}
          data-test-subj={dataTestSubj}
          {...rest}
        >
          {leadingControlColumns.map(({ id, width }, i) => (
            <EuiDataGridCell
              key={`${id}-${rowIndex}`}
              rowIndex={rowIndex}
              visibleRowIndex={visibleRowIndex}
              colIndex={i}
              columnId={id}
              popoverContent={DefaultColumnFormatter}
              width={width}
              renderCellValue={() => null}
              interactiveCellId={interactiveCellId}
              isExpandable={true}
              className="euiDataGridFooterCell euiDataGridRowCell--controlColumn"
            />
          ))}
          {columns.map(({ id }, i) => {
            const columnType = schema[id] ? schema[id].columnType : null;
            const popoverContent =
              (columnType && popoverContents[columnType]) ||
              DefaultColumnFormatter;

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
                interactiveCellId={interactiveCellId}
                isExpandable={true}
                className="euiDataGridFooterCell"
              />
            );
          })}
          {trailingControlColumns.map(({ id, width }, i) => {
            const colIndex = i + columns.length + leadingControlColumns.length;

            return (
              <EuiDataGridCell
                key={`${id}-${rowIndex}`}
                rowIndex={rowIndex}
                visibleRowIndex={visibleRowIndex}
                colIndex={colIndex}
                columnId={id}
                popoverContent={DefaultColumnFormatter}
                width={width}
                renderCellValue={() => null}
                interactiveCellId={interactiveCellId}
                isExpandable={true}
                className="euiDataGridFooterCell euiDataGridRowCell--controlColumn"
              />
            );
          })}
        </div>
      );
    }
  )
);

EuiDataGridFooterRow.displayName = 'EuiDataGridFooterRow';

export { EuiDataGridFooterRow };
