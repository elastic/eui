/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classnames from 'classnames';
import React, {
  FunctionComponent,
  memo,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useEuiMemoizedStyles } from '../../../../services';
import { EuiIcon } from '../../../icon';
import { EuiDataGridHeaderCellProps } from '../../data_grid_types';

import {
  useHasColumnActions,
  ColumnActions,
  PropsFromColumnActions,
} from './column_actions';
import { useColumnSorting } from './column_sorting';
import { ConditionalDraggableColumn } from './draggable_columns';
import { EuiDataGridColumnResizer } from './column_resizer';
import { EuiDataGridHeaderCellWrapper } from './data_grid_header_cell_wrapper';
import { euiDataGridHeaderCellStyles } from './data_grid_header_cell.styles';

export const EuiDataGridHeaderCell: FunctionComponent<EuiDataGridHeaderCellProps> =
  memo(
    ({
      index,
      column,
      columns,
      columnWidths,
      defaultColumnWidth,
      setColumnWidth,
      setVisibleColumns,
      switchColumnPos,
      isLastColumn,
      sorting,
      schema,
      schemaDetectors,
      canDragAndDropColumns,
      gridStyles,
    }) => {
      const { id, display, displayAsText, displayHeaderCellProps, actions } =
        column;
      const title = displayAsText || id;
      const children = display || displayAsText || id;
      const width = columnWidths[id] || defaultColumnWidth;
      const columnType = schema[id] ? schema[id].columnType : null;
      const hasColumnActions = useHasColumnActions(actions);

      const classes = classnames(
        {
          [`euiDataGridHeaderCell--${columnType}`]: columnType,
          'euiDataGridHeaderCell--hasColumnActions': hasColumnActions,
        },
        displayHeaderCellProps?.className
      );

      const styles = useEuiMemoizedStyles(euiDataGridHeaderCellStyles);
      const contentStyles = [
        styles.euiDataGridHeaderCell__content,
        (columnType === 'numeric' || columnType === 'currency') && styles.right,
      ];

      // Props passed from <ColumnActions /> to be set on <EuiDataGridHeaderCellWrapper />
      const [propsFromColumnActions, setPropsFromColumnActions] = useState<
        Partial<PropsFromColumnActions>
      >({});
      const actionsButtonRef = useRef<HTMLButtonElement | null>(null);

      const { sortingArrow, ariaSort, sortingAriaId, sortingScreenReaderText } =
        useColumnSorting({
          sorting,
          id,
          hasColumnActions,
        });

      const columnResizer = useMemo(() => {
        return column.isResizable !== false && width != null ? (
          <EuiDataGridColumnResizer
            columnId={id}
            columnWidth={width}
            setColumnWidth={setColumnWidth}
            isLastColumn={isLastColumn}
          />
        ) : null;
      }, [column.isResizable, id, width, setColumnWidth, isLastColumn]);

      return (
        <ConditionalDraggableColumn
          id={id}
          index={index}
          canDragAndDropColumns={!!canDragAndDropColumns}
          gridStyles={gridStyles}
          columnResizer={columnResizer}
          actionsPopoverToggle={actionsButtonRef.current}
        >
          {(dragProps) => (
            <EuiDataGridHeaderCellWrapper
              {...displayHeaderCellProps}
              {...dragProps}
              hasColumnActions={hasColumnActions}
              {...propsFromColumnActions}
              className={classnames(classes, propsFromColumnActions.className)}
              id={id}
              index={index}
              isLastColumn={isLastColumn}
              width={width}
              aria-sort={ariaSort}
              aria-label={displayAsText && `${displayAsText}, `} // ensure cell text content is read first, if available
              aria-describedby={classnames(
                sortingAriaId,
                dragProps?.['aria-describedby']
              )}
              data-column-moving={
                propsFromColumnActions['data-column-moving'] ||
                dragProps?.['data-column-moving'] ||
                undefined
              }
            >
              {(hasFocusTrap) => (
                <>
                  {!canDragAndDropColumns && columnResizer}
                  {canDragAndDropColumns && (
                    <span className="euiDataGridHeaderCell__draggableIcon">
                      <EuiIcon
                        type="grabOmnidirectional"
                        size="s"
                        css={styles.euiDataGridHeaderCell__actions}
                      />
                    </span>
                  )}

                  <div
                    css={contentStyles}
                    className="euiDataGridHeaderCell__content"
                    title={title}
                  >
                    {children}
                  </div>

                  {sortingArrow}
                  {sortingScreenReaderText}

                  {hasColumnActions && (
                    <ColumnActions
                      index={index}
                      id={id}
                      title={title}
                      column={column}
                      columns={columns}
                      schema={schema}
                      schemaDetectors={schemaDetectors}
                      setVisibleColumns={setVisibleColumns}
                      switchColumnPos={switchColumnPos}
                      sorting={sorting}
                      hasFocusTrap={hasFocusTrap}
                      setPropsFromColumnActions={setPropsFromColumnActions}
                      actionsButtonRef={actionsButtonRef}
                    />
                  )}
                </>
              )}
            </EuiDataGridHeaderCellWrapper>
          )}
        </ConditionalDraggableColumn>
      );
    }
  );
EuiDataGridHeaderCell.displayName = 'EuiDataGridHeaderCell';
