/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useState,
  useMemo,
  useCallback,
  ReactNode,
  ChangeEvent,
} from 'react';
import classNames from 'classnames';
import { DropResult } from '@hello-pangea/dnd';

import { useDependentState, useEuiMemoizedStyles } from '../../../services';
import { EuiPopover, EuiPopoverFooter, EuiPopoverTitle } from '../../popover';
import { EuiI18n, useEuiI18n } from '../../i18n';
import { EuiButtonEmpty } from '../../button';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiSwitch, EuiFieldText } from '../../form';
import { EuiText } from '../../text';
import { EuiIcon } from '../../icon';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  euiDragDropReorder,
} from '../../drag_and_drop';

import {
  EuiDataGridColumn,
  EuiDataGridColumnVisibility,
  EuiDataGridToolBarVisibilityOptions,
} from '../data_grid_types';
import { getNestedObjectOptions } from './data_grid_toolbar';
import { EuiDataGridToolbarControl } from './data_grid_toolbar_control';
import { euiDataGridColumnSelectorStyles } from './column_selector.styles';

export const useDataGridColumnSelector = (
  availableColumns: EuiDataGridColumn[],
  columnVisibility: EuiDataGridColumnVisibility,
  showColumnSelector: EuiDataGridToolBarVisibilityOptions['showColumnSelector'],
  displayValues: { [key: string]: string }
): [
  ReactNode,
  EuiDataGridColumn[],
  (columns: string[]) => void,
  (colFrom: string, colTo: string) => void
] => {
  const allowColumnHiding = getNestedObjectOptions(
    showColumnSelector,
    'allowHide'
  );
  const allowColumnReorder = getNestedObjectOptions(
    showColumnSelector,
    'allowReorder'
  );

  const [sortedColumns, setSortedColumns] = useDependentState(
    () => availableColumns.map(({ id }) => id),
    [availableColumns]
  );

  const { visibleColumns, setVisibleColumns } = columnVisibility;
  const visibleColumnIds = useMemo(
    () => new Set(visibleColumns),
    [visibleColumns]
  );

  const [isOpen, setIsOpen] = useState(false);

  const setColumns = useCallback(
    (nextColumns: string[]) => {
      setSortedColumns(nextColumns);

      const nextVisibleColumns = nextColumns.filter((id) =>
        visibleColumnIds.has(id)
      );
      setVisibleColumns(nextVisibleColumns);
    },
    [setSortedColumns, setVisibleColumns, visibleColumnIds]
  );

  const onDragEnd = useCallback(
    ({ source: { index: sourceIndex }, destination }: DropResult) => {
      if (destination) {
        const destinationIndex = destination.index;
        const nextSortedColumns = euiDragDropReorder(
          sortedColumns,
          sourceIndex,
          destinationIndex
        );
        setColumns(nextSortedColumns);
      }
    },
    [sortedColumns, setColumns]
  );

  const numberOfHiddenFields = availableColumns.length - visibleColumns.length;

  const [columnSearchText, setColumnSearchText] = useState('');

  const filteredColumns = useMemo(
    () =>
      sortedColumns.filter(
        (id) =>
          (displayValues[id] || id)
            .toLowerCase()
            .indexOf(columnSearchText.toLowerCase()) !== -1
      ),
    [sortedColumns, columnSearchText, displayValues]
  );

  const isDragEnabled = allowColumnReorder && columnSearchText.length === 0; // only allow drag-and-drop when not filtering columns
  const dragHandleAriaLabel = useEuiI18n(
    'euiColumnSelector.dragHandleAriaLabel',
    'Drag handle'
  );

  const orderedVisibleColumns = useMemo(
    () =>
      visibleColumns
        .map<EuiDataGridColumn>(
          (columnId) =>
            availableColumns.find(
              ({ id }) => id === columnId
            ) as EuiDataGridColumn // cast to avoid `undefined`, it filters those out next
        )
        .filter((column) => column != null),
    [availableColumns, visibleColumns]
  );

  const styles = useEuiMemoizedStyles(euiDataGridColumnSelectorStyles);

  const columnSelector = useMemo(() => {
    return allowColumnHiding || allowColumnReorder ? (
      <EuiPopover
        data-test-subj="dataGridColumnSelectorPopover"
        isOpen={isOpen}
        closePopover={() => setIsOpen(false)}
        anchorPosition="downLeft"
        panelPaddingSize="none"
        button={
          <EuiDataGridToolbarControl
            badgeContent={
              numberOfHiddenFields > 0
                ? `${orderedVisibleColumns.length}/${availableColumns.length}`
                : availableColumns.length
            }
            iconType="tableDensityNormal"
            data-test-subj="dataGridColumnSelectorButton"
            onClick={() => setIsOpen(!isOpen)}
          >
            <EuiI18n token="euiColumnSelector.button" default="Columns" />
          </EuiDataGridToolbarControl>
        }
      >
        {allowColumnHiding && (
          <EuiPopoverTitle paddingSize="s">
            <EuiI18n
              tokens={[
                'euiColumnSelector.search',
                'euiColumnSelector.searchcolumns',
              ]}
              defaults={['Search', 'Search columns']}
            >
              {([search, searchcolumns]: string[]) => (
                <EuiFieldText
                  compressed
                  placeholder={search}
                  aria-label={searchcolumns}
                  value={columnSearchText}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setColumnSearchText(e.currentTarget.value)
                  }
                  data-test-subj="dataGridColumnSelectorSearch"
                />
              )}
            </EuiI18n>
          </EuiPopoverTitle>
        )}
        <EuiDragDropContext onDragEnd={onDragEnd}>
          <EuiDroppable
            droppableId="columnOrder"
            isDropDisabled={!isDragEnabled}
            css={styles.euiDataGridColumnSelector}
          >
            <>
              {filteredColumns.map((id, index) => (
                <EuiDraggable
                  key={id}
                  draggableId={id}
                  index={index}
                  isDragDisabled={!isDragEnabled}
                  hasInteractiveChildren
                  customDragHandle
                  usePortal
                >
                  {(provided, state) => (
                    <div
                      css={styles.euiDataGridColumnSelector__item}
                      className={classNames('euiDataGridColumnSelector__item', {
                        'euiDataGridColumnSelector__item-isDragging':
                          state.isDragging,
                      })}
                      data-test-subj={`dataGridColumnSelectorColumnItem-${id}`}
                    >
                      <EuiFlexGroup
                        responsive={false}
                        gutterSize="s"
                        alignItems="center"
                      >
                        {allowColumnHiding && (
                          <EuiFlexItem grow={false}>
                            <EuiSwitch
                              name={id}
                              label={displayValues[id] || id}
                              showLabel={false}
                              checked={visibleColumnIds.has(id)}
                              mini
                              onChange={(event) => {
                                const {
                                  target: { checked },
                                } = event;
                                const nextVisibleColumns = sortedColumns.filter(
                                  (columnId) =>
                                    checked
                                      ? visibleColumnIds.has(columnId) ||
                                        id === columnId
                                      : visibleColumnIds.has(columnId) &&
                                        id !== columnId
                                );
                                setVisibleColumns(nextVisibleColumns);
                              }}
                              data-test-subj={`dataGridColumnSelectorToggleColumnVisibility-${id}`}
                            />
                          </EuiFlexItem>
                        )}
                        <EuiFlexItem
                          // This extra column name flex item affords the column more grabbable real estate
                          // for mouse users, while hiding repetition for keyboard/screen reader users
                          {...provided.dragHandleProps}
                          aria-hidden
                          tabIndex={-1}
                        >
                          <EuiText
                            size="xs"
                            className="euiDataGridColumnSelector__itemLabel"
                          >
                            {displayValues[id] || id}
                          </EuiText>
                        </EuiFlexItem>
                        {isDragEnabled && (
                          <EuiFlexItem
                            grow={false}
                            {...provided.dragHandleProps}
                            aria-label={dragHandleAriaLabel}
                          >
                            <EuiIcon type="grab" color="subdued" />
                          </EuiFlexItem>
                        )}
                      </EuiFlexGroup>
                    </div>
                  )}
                </EuiDraggable>
              ))}
            </>
          </EuiDroppable>
        </EuiDragDropContext>
        {allowColumnHiding && (
          <EuiPopoverFooter paddingSize="s">
            <EuiFlexGroup
              gutterSize="s"
              responsive={false}
              justifyContent="spaceBetween"
            >
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty
                  size="xs"
                  flush="left"
                  onClick={() => setVisibleColumns(sortedColumns)}
                  data-test-subj="dataGridColumnSelectorShowAllButton"
                >
                  <EuiI18n
                    token="euiColumnSelector.selectAll"
                    default="Show all"
                  />
                </EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty
                  size="xs"
                  flush="right"
                  onClick={() => setVisibleColumns([])}
                  data-test-subj="dataGridColumnSelectorHideAllButton"
                >
                  <EuiI18n
                    token="euiColumnSelector.hideAll"
                    default="Hide all"
                  />
                </EuiButtonEmpty>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPopoverFooter>
        )}
      </EuiPopover>
    ) : null;
  }, [
    styles,
    availableColumns.length,
    numberOfHiddenFields,
    orderedVisibleColumns.length,
    allowColumnHiding,
    allowColumnReorder,
    isOpen,
    columnSearchText,
    displayValues,
    visibleColumnIds,
    sortedColumns,
    setVisibleColumns,
    setIsOpen,
    onDragEnd,
    isDragEnabled,
    dragHandleAriaLabel,
    filteredColumns,
  ]);

  /**
   * Used for moving columns left/right, available in the headers actions menu
   */
  const switchColumnPos = useCallback(
    (fromColId: string, toColId: string) => {
      const moveFromIdx = sortedColumns.indexOf(fromColId);
      const moveToIdx = sortedColumns.indexOf(toColId);
      if (moveFromIdx === -1 || moveToIdx === -1) {
        return;
      }
      const nextSortedColumns = [...sortedColumns];
      nextSortedColumns.splice(moveFromIdx, 1);
      nextSortedColumns.splice(moveToIdx, 0, fromColId);
      setColumns(nextSortedColumns);
    },
    [setColumns, sortedColumns]
  );

  return useMemo(() => {
    return [
      columnSelector,
      orderedVisibleColumns,
      setVisibleColumns,
      switchColumnPos,
    ];
  }, [
    columnSelector,
    orderedVisibleColumns,
    setVisibleColumns,
    switchColumnPos,
  ]);
};
