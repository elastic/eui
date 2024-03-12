/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext, useMemo, useCallback } from 'react';
import { useDeepEqual } from '../../../services';
import {
  DataGridSortedContextShape,
  EuiDataGridSorting,
  EuiDataGridInMemory,
  EuiDataGridInMemoryValues,
  EuiDataGridSchema,
  EuiDataGridSchemaDetector,
} from '../data_grid_types';
import { defaultComparator } from './data_grid_schema';

export const DataGridSortedContext = createContext<DataGridSortedContextShape>({
  sortedRowMap: [],
  getCorrectRowIndex: (number) => number,
});

export type useSortingArgs = {
  sorting?: EuiDataGridSorting;
  inMemory?: EuiDataGridInMemory;
  inMemoryValues: EuiDataGridInMemoryValues;
  schema: EuiDataGridSchema;
  schemaDetectors: EuiDataGridSchemaDetector[];
  startRow: number;
};

export const useSorting = ({
  sorting,
  inMemory,
  inMemoryValues,
  schema,
  schemaDetectors,
  startRow,
}: useSortingArgs) => {
  const sortingColumns = useDeepEqual(sorting?.columns);

  const sortedWrappedValues = useMemo(() => {
    if (
      inMemory?.level === 'sorting' &&
      sortingColumns != null &&
      sortingColumns.length > 0
    ) {
      const inMemoryRowIndices = Object.keys(inMemoryValues);
      return inMemoryRowIndices
        .map((row, index) => {
          return { index, values: inMemoryValues[row] };
        })
        .sort((a, b) => {
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

            const result = comparator(aValue, bValue, column.direction, {
              aIndex: a.index,
              bIndex: b.index,
            });
            // only return if the columns are unequal, otherwise allow the next sort-by column to run
            if (result !== 0) return result;
          }

          return 0;
        });
    }
  }, [
    inMemory?.level,
    inMemoryValues,
    sortingColumns,
    schema,
    schemaDetectors,
  ]);

  const sortedRowMap = useMemo(() => {
    if (
      inMemory?.level === 'sorting' &&
      sortingColumns != null &&
      sortingColumns.length > 0 &&
      sortedWrappedValues != null
    ) {
      return sortedWrappedValues.map((row) => row.index);
    } else {
      return [];
    }
  }, [inMemory?.level, sortingColumns, sortedWrappedValues]);

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

  return useMemo(() => {
    return {
      sortedRowMap,
      getCorrectRowIndex,
    };
  }, [sortedRowMap, getCorrectRowIndex]);
};
