/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode, useEffect, useState } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { EuiButtonEmpty } from '../../button';
import {
  EuiDragDropContext,
  euiDragDropReorder,
  EuiDroppable,
} from '../../drag_and_drop';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiI18n, useEuiI18n } from '../../i18n';
import { EuiPopover, EuiPopoverFooter } from '../../popover';
import { EuiText } from '../../text';
import { EuiToken } from '../../token';
import { EuiDataGridToolbarControl } from './data_grid_toolbar_control';
import { EuiDataGridColumnSortingDraggable } from './column_sorting_draggable';
import { getDetailsForSchema } from '../utils/data_grid_schema';
import {
  EuiDataGridColumn,
  EuiDataGridSchema,
  EuiDataGridSchemaDetector,
  EuiDataGridSorting,
} from '../data_grid_types';

export const useDataGridColumnSorting = (
  columns: EuiDataGridColumn[],
  sorting: EuiDataGridSorting | undefined,
  schema: EuiDataGridSchema,
  schemaDetectors: EuiDataGridSchemaDetector[],
  displayValues: { [key: string]: string }
): ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  const [availableColumnsIsOpen, setAvailableColumnsIsOpen] = useState(false);
  // prune any non-existent/hidden columns from sorting
  useEffect(() => {
    if (sorting) {
      const nextSortingColumns: EuiDataGridSorting['columns'] = [];

      const availableColumnIds = new Set(columns.map(({ id }) => id));
      for (let i = 0; i < sorting.columns.length; i++) {
        const column = sorting.columns[i];
        if (availableColumnIds.has(column.id)) {
          nextSortingColumns.push(column);
        }
      }

      // if the column array lengths differ then the sorting columns have been pruned
      if (nextSortingColumns.length !== sorting.columns.length) {
        sorting.onSort(nextSortingColumns);
      }
    }
  }, [columns, sorting]);

  const sortingButtonText = useEuiI18n(
    'euiColumnSorting.button',
    'Sort fields'
  );

  if (sorting == null) return null;

  const activeColumnIds = new Set(sorting.columns.map(({ id }) => id));
  const { inactiveColumns } = columns.reduce<{
    activeColumns: EuiDataGridColumn[];
    inactiveColumns: EuiDataGridColumn[];
  }>(
    (acc, column) => {
      if (activeColumnIds.has(column.id)) {
        acc.activeColumns.push(column);
      } else {
        acc.inactiveColumns.push(column);
      }
      return acc;
    },
    {
      activeColumns: [],
      inactiveColumns: [],
    }
  );

  const onDragEnd = ({
    source: { index: sourceIndex },
    destination,
  }: DropResult) => {
    if (destination) {
      const destinationIndex = destination.index;
      const nextColumns = euiDragDropReorder(
        sorting!.columns,
        sourceIndex,
        destinationIndex
      );
      sorting!.onSort(nextColumns);
    }
  };

  const schemaDetails = (id: string | number) =>
    schema.hasOwnProperty(id) && schema[id].columnType != null
      ? getDetailsForSchema(schemaDetectors, schema[id].columnType)
      : null;

  const inactiveSortableColumns = inactiveColumns.filter(
    ({ id, isSortable }) => {
      const schemaDetail = schemaDetails(id);
      let sortable = true;
      if (isSortable != null) {
        sortable = isSortable;
      } else if (schemaDetail != null) {
        sortable = schemaDetail.hasOwnProperty('isSortable')
          ? schemaDetail.isSortable!
          : true;
      }
      return sortable;
    }
  );

  const columnSorting = (
    <EuiPopover
      data-test-subj="dataGridColumnSortingPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downLeft"
      panelPaddingSize="s"
      hasDragDrop
      button={
        <EuiDataGridToolbarControl
          badgeContent={sorting.columns.length}
          iconType="sortable"
          data-test-subj="dataGridColumnSortingButton"
          onClick={() => setIsOpen(!isOpen)}
        >
          {sortingButtonText}
        </EuiDataGridToolbarControl>
      }
    >
      {sorting.columns.length > 0 ? (
        <EuiDragDropContext onDragEnd={onDragEnd}>
          <EuiDroppable
            droppableId="columnSorting"
            className="euiDataGrid__controlScroll"
          >
            <>
              {sorting.columns.map(({ id, direction }, index) => {
                return (
                  <EuiDataGridColumnSortingDraggable
                    key={id}
                    id={id}
                    display={displayValues[id]}
                    direction={direction}
                    index={index}
                    sorting={sorting}
                    schema={schema}
                    schemaDetectors={schemaDetectors}
                  />
                );
              })}
            </>
          </EuiDroppable>
        </EuiDragDropContext>
      ) : (
        <EuiText size="s" color="subdued">
          <p role="alert">
            <EuiI18n
              token="euiColumnSorting.emptySorting"
              default="Currently no fields are sorted"
            />
          </p>
        </EuiText>
      )}
      {(inactiveSortableColumns.length > 0 || sorting.columns.length > 0) && (
        <EuiPopoverFooter>
          <EuiFlexGroup
            gutterSize="m"
            justifyContent="spaceBetween"
            responsive={false}
          >
            <EuiFlexItem grow={false}>
              {inactiveSortableColumns.length > 0 && (
                <EuiPopover
                  data-test-subj="dataGridColumnSortingPopoverColumnSelection"
                  isOpen={availableColumnsIsOpen}
                  closePopover={() => setAvailableColumnsIsOpen(false)}
                  anchorPosition="downLeft"
                  panelPaddingSize="none"
                  button={
                    <EuiButtonEmpty
                      size="xs"
                      flush="left"
                      iconType="arrowDown"
                      iconSide="right"
                      data-test-subj="dataGridColumnSortingSelectionButton"
                      onClick={() =>
                        setAvailableColumnsIsOpen(!availableColumnsIsOpen)
                      }
                    >
                      <EuiI18n
                        token="euiColumnSorting.pickFields"
                        default="Pick fields to sort by"
                      />
                    </EuiButtonEmpty>
                  }
                >
                  <EuiI18n
                    token="euiColumnSorting.sortFieldAriaLabel"
                    default="Sort by: "
                  >
                    {(sortFieldAriaLabel: string) => (
                      <div
                        className="euiDataGridColumnSorting__fieldList"
                        role="listbox"
                      >
                        {inactiveSortableColumns.map(
                          ({ id, defaultSortDirection }) => {
                            return (
                              <button
                                key={id}
                                className="euiDataGridColumnSorting__field"
                                aria-label={`${sortFieldAriaLabel} ${id}`}
                                role="option"
                                aria-selected="false"
                                data-test-subj={`dataGridColumnSortingPopoverColumnSelection-${id}`}
                                onClick={() => {
                                  const nextColumns = [...sorting.columns];
                                  nextColumns.push({
                                    id,
                                    direction:
                                      defaultSortDirection ||
                                      schemaDetails(id)?.defaultSortDirection ||
                                      'asc',
                                  });
                                  sorting.onSort(nextColumns);
                                }}
                              >
                                <EuiFlexGroup
                                  alignItems="center"
                                  gutterSize="s"
                                  component="span"
                                  responsive={false}
                                >
                                  <EuiFlexItem grow={false}>
                                    <EuiToken
                                      iconType={
                                        schemaDetails(id) != null
                                          ? getDetailsForSchema(
                                              schemaDetectors,
                                              schema[id].columnType
                                            ).icon
                                          : 'tokenString'
                                      }
                                      color={
                                        schemaDetails(id) != null
                                          ? getDetailsForSchema(
                                              schemaDetectors,
                                              schema[id].columnType
                                            ).color
                                          : undefined
                                      }
                                    />
                                  </EuiFlexItem>
                                  <EuiFlexItem grow={false}>
                                    <EuiText size="xs">
                                      {displayValues[id]}
                                    </EuiText>
                                  </EuiFlexItem>
                                </EuiFlexGroup>
                              </button>
                            );
                          }
                        )}
                      </div>
                    )}
                  </EuiI18n>
                </EuiPopover>
              )}
            </EuiFlexItem>
            {sorting.columns.length > 0 ? (
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty
                  size="xs"
                  flush="right"
                  onClick={() => sorting.onSort([])}
                  data-test-subj="dataGridColumnSortingClearButton"
                >
                  <EuiI18n
                    token="euiColumnSorting.clearAll"
                    default="Clear sorting"
                  />
                </EuiButtonEmpty>
              </EuiFlexItem>
            ) : null}
          </EuiFlexGroup>
        </EuiPopoverFooter>
      )}
    </EuiPopover>
  );

  return columnSorting;
};
