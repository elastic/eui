/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext, useMemo, useCallback } from 'react';
import {
  DataGridSortingContextShape,
  EuiDataGridSorting,
  EuiDataGridInMemory,
  EuiDataGridInMemoryValues,
  EuiDataGridSchema,
  EuiDataGridSchemaDetector,
} from '../data_grid_types';
import { defaultComparator } from './data_grid_schema';

export const DataGridSortingContext =
  createContext<DataGridSortingContextShape>({
    sorting: undefined,
    sortedRowMap: [],
    getCorrectRowIndex: (number) => number,
  });

export const useSorting = ({
  sorting,
  inMemory,
  inMemoryValues,
  schema,
  schemaDetectors,
  startRow,
}: {
  sorting?: EuiDataGridSorting;
  inMemory?: EuiDataGridInMemory;
  inMemoryValues: EuiDataGridInMemoryValues;
  schema: EuiDataGridSchema;
  schemaDetectors: EuiDataGridSchemaDetector[];
  startRow: number;
}) => {
  const sortingColumns = sorting?.columns;

  const sortedRowMap = useMemo(() => {
    const rowMap: DataGridSortingContextShape['sortedRowMap'] = [];

    if (
      inMemory?.level === 'sorting' &&
      sortingColumns != null &&
      sortingColumns.length > 0
    ) {
      const inMemoryRowIndices = Object.keys(inMemoryValues);
      const wrappedValues: Array<{
        index: number;
        values: EuiDataGridInMemoryValues[number];
      }> = [];
      for (let i = 0; i < inMemoryRowIndices.length; i++) {
        const inMemoryRow = inMemoryValues[inMemoryRowIndices[i]];
        wrappedValues.push({ index: i, values: inMemoryRow });
      }

      wrappedValues.sort((a, b) => {
        for (let i = 0; i < sortingColumns.length; i++) {
          const column = sortingColumns[i];
          const aValue = a.values[column.id];
          const bValue = b.values[column.id];

          // get the comparator, based on schema
          let comparator = defaultComparator;
          if (schema.hasOwnProperty(column.id)) {
            const columnType = schema[column.id].columnType;
            for (let i = 0; i < schemaDetectors.length; i++) {
              const detector = schemaDetectors[i];
              if (
                detector.type === columnType &&
                detector.hasOwnProperty('comparator')
              ) {
                comparator = detector.comparator!;
              }
            }
          }

          const result = comparator(aValue, bValue, column.direction);
          // only return if the columns are unequal, otherwise allow the next sort-by column to run
          if (result !== 0) return result;
        }

        return 0;
      });

      for (let i = 0; i < wrappedValues.length; i++) {
        rowMap[i] = wrappedValues[i].index;
      }
    }

    return rowMap;
  }, [
    inMemory?.level,
    inMemoryValues,
    sortingColumns,
    schema,
    schemaDetectors,
  ]);

  // Given a visible row index, obtain the unpaginated & unsorted
  // row index from the passed cell data
  const getCorrectRowIndex = useCallback(
    (visibleRowIndex: number) => {
      const isPaginated = visibleRowIndex - startRow < 0;
      const unpaginatedRowIndex = isPaginated
        ? visibleRowIndex + startRow
        : visibleRowIndex;

      const unsortedRowIndex =
        unpaginatedRowIndex in sortedRowMap
          ? sortedRowMap[unpaginatedRowIndex]
          : unpaginatedRowIndex;

      return unsortedRowIndex;
    },
    [startRow, sortedRowMap]
  );

  return {
    sorting,
    sortedRowMap,
    getCorrectRowIndex,
  };
};
