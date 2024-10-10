/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classnames from 'classnames';
import React, { forwardRef, memo, useCallback } from 'react';

import { useEuiMemoizedStyles } from '../../../../services';
import {
  emptyControlColumns,
  EuiDataGridHeaderRowProps,
} from '../../data_grid_types';
import { ConditionalDroppableColumns } from './draggable_columns';
import { EuiDataGridControlHeaderCell } from './data_grid_control_header_cell';
import { EuiDataGridHeaderCell } from './data_grid_header_cell';
import { euiDataGridHeaderStyles } from './data_grid_header_row.styles';

const EuiDataGridHeaderRow = memo(
  forwardRef<HTMLDivElement, EuiDataGridHeaderRowProps>((props, ref) => {
    const {
      className,
      'data-test-subj': _dataTestSubj,
      leadingControlColumns = emptyControlColumns,
      trailingControlColumns = emptyControlColumns,
      columns,
      columnWidths,
      defaultColumnWidth,
      setColumnWidth,
      visibleColCount,
      setVisibleColumns,
      switchColumnPos,
      sorting,
      schema,
      schemaDetectors,
      gridStyles,
      canDragAndDropColumns,
      ...rest
    } = props;

    const styles = useEuiMemoizedStyles(euiDataGridHeaderStyles);
    const cssStyles = [styles.euiDataGridHeader, styles[gridStyles.header!]];

    const classes = classnames('euiDataGridHeader', className);
    const dataTestSubj = classnames('dataGridHeader', _dataTestSubj);

    const isLastColumn = useCallback(
      (index: number) => index === visibleColCount - 1,
      [visibleColCount]
    );

    return (
      <div
        role="row"
        ref={ref}
        css={cssStyles}
        className={classes}
        data-test-subj={dataTestSubj}
        {...rest}
      >
        {leadingControlColumns.map((controlColumn, index) => (
          <EuiDataGridControlHeaderCell
            key={controlColumn.id}
            index={index}
            isLastColumn={isLastColumn(index)}
            controlColumn={controlColumn}
          />
        ))}
        <ConditionalDroppableColumns
          canDragAndDropColumns={!!canDragAndDropColumns}
          columns={columns}
          switchColumnPos={switchColumnPos}
          indexOffset={leadingControlColumns?.length ?? 0}
        >
          {columns.map((column, index) => {
            const visibleIndex = index + leadingControlColumns.length;
            return (
              <EuiDataGridHeaderCell
                key={column.id}
                index={visibleIndex}
                isLastColumn={isLastColumn(visibleIndex)}
                column={column}
                columns={columns}
                columnWidths={columnWidths}
                defaultColumnWidth={defaultColumnWidth}
                setColumnWidth={setColumnWidth}
                setVisibleColumns={setVisibleColumns}
                switchColumnPos={switchColumnPos}
                sorting={sorting}
                schema={schema}
                schemaDetectors={schemaDetectors}
                canDragAndDropColumns={canDragAndDropColumns}
                gridStyles={gridStyles}
              />
            );
          })}
        </ConditionalDroppableColumns>
        {trailingControlColumns.map((controlColumn, index) => {
          const visibleIndex =
            index + leadingControlColumns.length + columns.length;
          return (
            <EuiDataGridControlHeaderCell
              key={controlColumn.id}
              index={visibleIndex}
              isLastColumn={isLastColumn(visibleIndex)}
              controlColumn={controlColumn}
            />
          );
        })}
      </div>
    );
  })
);

EuiDataGridHeaderRow.displayName = 'EuiDataGridHeaderRow';

export { EuiDataGridHeaderRow };
