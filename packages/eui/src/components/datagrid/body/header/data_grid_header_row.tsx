/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classnames from 'classnames';
import React, {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { OnDragEndResponder } from '@hello-pangea/dnd';

import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../../../services';
import { EuiDragDropContext, EuiDroppable } from '../../../drag_and_drop';
import { DataGridFocusContext } from '../../utils/focus';
import {
  emptyControlColumns,
  EuiDataGridHeaderRowProps,
} from '../../data_grid_types';
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
      wrapperRef,
      canDragAndDropColumns,
      ...rest
    } = props;

    const styles = useEuiMemoizedStyles(euiDataGridHeaderStyles);
    const cssStyles = [styles.euiDataGridHeader, styles[gridStyles.header!]];

    const classes = classnames('euiDataGridHeader', className);
    const dataTestSubj = classnames('dataGridHeader', _dataTestSubj);

    const droppableId = useGeneratedHtmlId({
      prefix: 'euiDataGridHeaderDroppable',
    });

    const { setFocusedCell } = useContext(DataGridFocusContext);

    const handleOnDragEnd: OnDragEndResponder = useCallback(
      ({ source, destination }) => {
        if (!source || !destination) return;

        if (destination.index === source.index) {
          return;
        }

        const indexOffset = leadingControlColumns?.length ?? 0;
        const sourceColumn = columns[source.index - indexOffset];
        const destinationColumn = columns[destination.index - indexOffset];

        if (sourceColumn && destinationColumn) {
          switchColumnPos?.(sourceColumn.id, destinationColumn.id);

          // ensure updating focus last by using last stack execution
          setTimeout(() => {
            setFocusedCell([destination.index, -1]);
          });
        }
      },
      [columns, leadingControlColumns, setFocusedCell, switchColumnPos]
    );

    const content = useMemo(
      () =>
        columns.map((column, index) => (
          <EuiDataGridHeaderCell
            key={column.id}
            index={index + leadingControlColumns.length}
            column={column}
            columns={columns}
            columnWidths={columnWidths}
            defaultColumnWidth={defaultColumnWidth}
            setColumnWidth={setColumnWidth}
            visibleColCount={visibleColCount}
            setVisibleColumns={setVisibleColumns}
            switchColumnPos={switchColumnPos}
            sorting={sorting}
            schema={schema}
            schemaDetectors={schemaDetectors}
            canDragAndDropColumns={canDragAndDropColumns}
            wrapperRef={wrapperRef}
            gridStyles={gridStyles}
          />
        )),
      [
        canDragAndDropColumns,
        columnWidths,
        columns,
        defaultColumnWidth,
        leadingControlColumns,
        schema,
        schemaDetectors,
        visibleColCount,
        setColumnWidth,
        setVisibleColumns,
        sorting,
        switchColumnPos,
        wrapperRef,
        gridStyles,
      ]
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
            visibleColCount={visibleColCount}
            controlColumn={controlColumn}
          />
        ))}
        {canDragAndDropColumns ? (
          <EuiDragDropContext onDragEnd={handleOnDragEnd}>
            <EuiDroppable
              key={droppableId}
              droppableId={droppableId}
              direction="horizontal"
              css={styles.euiDataGridHeader__droppable}
              data-test-subj="euiDataGridHeaderDroppable"
            >
              {content}
            </EuiDroppable>
          </EuiDragDropContext>
        ) : (
          content
        )}
        {trailingControlColumns.map((controlColumn, index) => (
          <EuiDataGridControlHeaderCell
            key={controlColumn.id}
            index={index + leadingControlColumns.length + columns.length}
            visibleColCount={visibleColCount}
            controlColumn={controlColumn}
          />
        ))}
      </div>
    );
  })
);

EuiDataGridHeaderRow.displayName = 'EuiDataGridHeaderRow';

export { EuiDataGridHeaderRow };
