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
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
  memo,
  KeyboardEventHandler,
} from 'react';

import { keys, useEuiMemoizedStyles } from '../../../../services';
import { useEuiI18n } from '../../../i18n';
import { EuiIcon } from '../../../icon';
import { EuiListGroup } from '../../../list_group';
import { EuiPopover } from '../../../popover';
import { EuiButtonIcon } from '../../../button';

import { DataGridFocusContext } from '../../utils/focus';
import { EuiDataGridHeaderCellProps } from '../../data_grid_types';
import { getColumnActions, usePopoverArrowNavigation } from './column_actions';
import { useColumnSorting } from './column_sorting';
import { EuiDataGridColumnResizer } from './data_grid_column_resizer';
import { EuiDataGridHeaderCellWrapper } from './data_grid_header_cell_wrapper';
import { euiDataGridHeaderCellStyles } from './data_grid_header_cell.styles';
import { ConditionalDraggableColumn } from './draggable_columns';

export const EuiDataGridHeaderCell: FunctionComponent<EuiDataGridHeaderCellProps> =
  memo(
    ({
      index,
      column,
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
      canDragAndDropColumns,
      gridStyles,
    }) => {
      const { id, display, displayAsText, displayHeaderCellProps } = column;
      const title = displayAsText || id;
      const children = display || displayAsText || id;
      const width = columnWidths[id] || defaultColumnWidth;
      const columnType = schema[id] ? schema[id].columnType : null;

      const { setFocusedCell, focusFirstVisibleInteractiveCell } =
        useContext(DataGridFocusContext);

      /*
       * Column actions
       */
      const [isPopoverOpen, setIsPopoverOpen] = useState(false);
      const togglePopover = useCallback(() => {
        setIsPopoverOpen((isOpen) => !isOpen);
      }, []);
      const closePopover = useCallback(() => {
        setIsPopoverOpen(false);
      }, []);
      const popoverArrowNavigationProps = usePopoverArrowNavigation();

      const [isColumnMoving, setIsColumnMoving] = useState(false);

      const columnActions = useMemo(() => {
        return getColumnActions({
          column,
          columns,
          schema,
          schemaDetectors,
          setVisibleColumns,
          focusFirstVisibleInteractiveCell,
          setIsPopoverOpen,
          setIsColumnMoving,
          sorting,
          switchColumnPos,
          setFocusedCell,
          columnFocusIndex: index,
        });
      }, [
        column,
        columns,
        schema,
        schemaDetectors,
        setVisibleColumns,
        focusFirstVisibleInteractiveCell,
        setIsPopoverOpen,
        sorting,
        switchColumnPos,
        setFocusedCell,
        index,
      ]);

      const showColumnActions = columnActions && columnActions.length > 0;
      const [isActionsButtonFocused, setIsActionsButtonFocused] =
        useState(false);
      const actionsButtonRef = useRef<HTMLButtonElement | null>(null);

      const actionsButtonAriaLabel = useEuiI18n(
        'euiDataGridHeaderCell.actionsButtonAriaLabel',
        '{title}. Click to view column header actions.',
        { title }
      );
      const actionsEnterKeyInstructions = useEuiI18n(
        'euiDataGridHeaderCell.actionsEnterKeyInstructions',
        "Press the Enter key to view this column's actions"
      );

      // For cell headers with only actions, auto-open the actions popover on enter keypress
      const onKeyDown: KeyboardEventHandler = useCallback(
        (e) => {
          if (e.key === keys.ENTER && showColumnActions) {
            setIsPopoverOpen(true);
          }
        },
        [showColumnActions]
      );

      /*
       * Column sorting
       */
      const { sortingArrow, ariaSort, sortingAriaId, sortingScreenReaderText } =
        useColumnSorting({
          sorting,
          id,
          showColumnActions,
        });
      /*
       * Rendering
       */
      const classes = classnames(
        {
          [`euiDataGridHeaderCell--${columnType}`]: columnType,
          'euiDataGridHeaderCell--hasColumnActions': showColumnActions,
          'euiDataGridHeaderCell--isActionsPopoverOpen': isPopoverOpen,
        },
        displayHeaderCellProps?.className
      );

      const styles = useEuiMemoizedStyles(euiDataGridHeaderCellStyles);
      const contentStyles = [
        styles.euiDataGridHeaderCell__content,
        (columnType === 'numeric' || columnType === 'currency') && styles.right,
      ];

      const columnResizer = useMemo(() => {
        return column.isResizable !== false && width != null ? (
          <EuiDataGridColumnResizer
            columnId={id}
            columnWidth={width}
            setColumnWidth={setColumnWidth}
          />
        ) : null;
      }, [column.isResizable, id, width, setColumnWidth]);

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
              className={classes}
              id={id}
              index={index}
              visibleColCount={visibleColCount}
              width={width}
              aria-sort={ariaSort}
              hasActionsPopover={showColumnActions}
              onKeyDown={onKeyDown}
              aria-label={displayAsText && `${displayAsText}, `} // ensure cell text content is read first, if available
              aria-describedby={classnames(
                sortingAriaId,
                dragProps?.['aria-describedby']
              )}
              data-column-moving={
                isColumnMoving || dragProps?.['data-column-moving'] || undefined
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

                  {showColumnActions && (
                    <EuiPopover
                      display="block"
                      panelPaddingSize="none"
                      offset={7}
                      anchorPosition="downRight"
                      css={styles.euiDataGridHeaderCell__popover}
                      button={
                        <EuiButtonIcon
                          iconType="boxesVertical"
                          iconSize="s"
                          color="text"
                          css={styles.euiDataGridHeaderCell__actions}
                          className="euiDataGridHeaderCell__button"
                          onClick={togglePopover}
                          buttonRef={actionsButtonRef}
                          onFocus={() => setIsActionsButtonFocused(true)}
                          onBlur={() => setIsActionsButtonFocused(false)}
                          tabIndex={0} // Override EuiButtonIcon's conditional tabindex based on aria-hidden
                          aria-hidden={
                            hasFocusTrap && !isActionsButtonFocused
                              ? 'true' // prevent the actions button from being read on cell focus
                              : undefined
                          }
                          aria-label={
                            hasFocusTrap
                              ? actionsButtonAriaLabel
                              : actionsEnterKeyInstructions
                          }
                          data-test-subj={`dataGridHeaderCellActionButton-${id}`}
                        />
                      }
                      isOpen={isPopoverOpen}
                      closePopover={closePopover}
                      {...popoverArrowNavigationProps}
                    >
                      <EuiListGroup
                        listItems={columnActions}
                        gutterSize="none"
                        data-test-subj={`dataGridHeaderCellActionGroup-${id}`}
                      />
                    </EuiPopover>
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
