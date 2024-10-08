/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ReactNode,
  FunctionComponent,
  useEffect,
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react';
import { DropResult } from '@hello-pangea/dnd';

import { useEuiMemoizedStyles } from '../../../services';
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

import {
  EuiDataGridColumn,
  EuiDataGridSchema,
  EuiDataGridSchemaDetector,
  EuiDataGridSorting,
} from '../data_grid_types';
import { getDetailsForSchema } from '../utils/data_grid_schema';
import { EuiDataGridToolbarControl } from './data_grid_toolbar_control';
import { EuiDataGridColumnSortingDraggable } from './column_sorting_draggable';
import { euiDataGridColumnSortingStyles } from './column_sorting.styles';

export type ColumnSortingProps = {
  sorting: EuiDataGridSorting;
  columns: EuiDataGridColumn[];
  displayValues: { [key: string]: string };
  schema: EuiDataGridSchema;
  schemaDetectors: EuiDataGridSchemaDetector[];
};

export const useDataGridColumnSorting = ({
  sorting,
  ...rest
}: Omit<ColumnSortingProps, 'sorting'> & {
  sorting?: EuiDataGridSorting;
}): ReactNode => {
  return sorting == null ? null : (
    <DataGridSortingControl sorting={sorting} {...rest} />
  );
};

export const DataGridSortingControl: FunctionComponent<ColumnSortingProps> =
  memo(({ columns, sorting, schema, schemaDetectors, displayValues }) => {
    const [isOpen, setIsOpen] = useState(false);
    const sortingButtonText = useEuiI18n(
      'euiColumnSorting.button',
      'Sort fields'
    );
    const sortFieldAriaLabel = useEuiI18n(
      'euiColumnSorting.sortFieldAriaLabel',
      'Sort by: '
    );

    const styles = useEuiMemoizedStyles(euiDataGridColumnSortingStyles);

    const [availableColumnsIsOpen, setAvailableColumnsIsOpen] = useState(false);
    const availableColumnIds = useMemo(
      () => new Set(columns.map(({ id }) => id)),
      [columns]
    );

    // prune any non-existent/hidden columns from sorting
    useEffect(() => {
      const nextSortingColumns: EuiDataGridSorting['columns'] = [];

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
    }, [availableColumnIds, sorting]);

    const { inactiveColumns } = useMemo(() => {
      const activeColumnIds = new Set(sorting.columns.map(({ id }) => id));
      return columns.reduce<{
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
    }, [columns, sorting]);

    const onDragEnd = useCallback(
      ({ source: { index: sourceIndex }, destination }: DropResult) => {
        if (destination) {
          const destinationIndex = destination.index;
          const nextColumns = euiDragDropReorder(
            sorting.columns,
            sourceIndex,
            destinationIndex
          );
          sorting.onSort(nextColumns);
        }
      },
      [sorting]
    );

    const schemaDetails = useCallback(
      (id: string | number) => {
        return schema.hasOwnProperty(id) && schema[id].columnType != null
          ? getDetailsForSchema(schemaDetectors, schema[id].columnType)
          : null;
      },
      [schema, schemaDetectors]
    );

    const inactiveSortableColumns = useMemo(() => {
      return inactiveColumns.filter(({ id, isSortable }) => {
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
      });
    }, [inactiveColumns, schemaDetails]);

    const onButtonClick = useCallback(
      (id: string, defaultSortDirection?: 'asc' | 'desc') => {
        const nextColumns = [...sorting.columns];
        nextColumns.push({
          id,
          direction:
            defaultSortDirection ||
            schemaDetails(id)?.defaultSortDirection ||
            'asc',
        });
        sorting.onSort(nextColumns);
      },
      [sorting, schemaDetails]
    );

    return (
      <EuiPopover
        data-test-subj="dataGridColumnSortingPopover"
        isOpen={isOpen}
        closePopover={() => setIsOpen(false)}
        anchorPosition="downLeft"
        panelPaddingSize="s"
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
              css={styles.euiDataGridColumnSorting}
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
                    <div
                      css={styles.euiDataGridColumnSorting__fieldList}
                      className="euiDataGridColumnSorting__fieldList"
                      role="listbox"
                    >
                      {inactiveSortableColumns.map(
                        ({ id, defaultSortDirection }) => {
                          return (
                            <button
                              key={id}
                              css={styles.euiDataGridColumnSorting__field}
                              className="euiDataGridColumnSorting__field"
                              aria-label={`${sortFieldAriaLabel} ${id}`}
                              role="option"
                              aria-selected="false"
                              data-test-subj={`dataGridColumnSortingPopoverColumnSelection-${id}`}
                              onClick={() =>
                                onButtonClick(id, defaultSortDirection)
                              }
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
  });
DataGridSortingControl.displayName = 'DataGridSortingControl';
