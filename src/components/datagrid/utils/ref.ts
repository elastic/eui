/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useImperativeHandle, useCallback, Ref, RefObject } from 'react';
import type { VariableSizeGrid } from 'react-window';
import {
  EuiDataGridRefProps,
  EuiDataGridProps,
  DataGridFocusContextShape,
  DataGridCellPopoverContextShape,
  DataGridSortingContextShape,
} from '../data_grid_types';

interface Dependencies {
  ref: Ref<unknown>;
  gridRef: RefObject<VariableSizeGrid>;
  setIsFullScreen: EuiDataGridRefProps['setIsFullScreen'];
  focusContext: DataGridFocusContextShape;
  cellPopoverContext: DataGridCellPopoverContextShape;
  sortingContext: DataGridSortingContextShape;
  pagination: Required<EuiDataGridProps['pagination']>;
  rowCount: number;
  visibleColCount: number;
}

export const useImperativeGridRef = ({
  ref,
  gridRef,
  setIsFullScreen,
  focusContext,
  cellPopoverContext,
  sortingContext: { sortedRowMap },
  pagination,
  rowCount,
  visibleColCount,
}: Dependencies) => {
  // Cell location helpers
  const { checkCellExists } = useCellLocationCheck(rowCount, visibleColCount);
  const { findVisibleRowIndex } = useSortPageCheck(pagination, sortedRowMap);

  // Focus APIs
  const { setFocusedCell: _setFocusedCell } = focusContext; // eslint complains about the dependency array otherwise

  // When we pass this API to the consumer, we can't know for sure that
  // the targeted cell is valid or in view (unlike our internal state, where
  // both of those states can be guaranteed), so we need to do some extra
  // checks here to make sure the grid automatically handles all cells
  const setFocusedCell = useCallback<EuiDataGridRefProps['setFocusedCell']>(
    ({ rowIndex, colIndex }) => {
      checkCellExists({ rowIndex, colIndex });
      const visibleRowIndex = findVisibleRowIndex(rowIndex);
      _setFocusedCell([colIndex, visibleRowIndex]); // Transmog args from obj to array
    },
    [_setFocusedCell, checkCellExists, findVisibleRowIndex]
  );

  // Popover APIs
  const { openCellPopover: _openCellPopover, closeCellPopover } =
    cellPopoverContext;

  // When we pass this API to the consumer, we can't know for sure that
  // the targeted cell is valid or in view (unlike our internal state, where
  // both of those states can be guaranteed), so we need to do some extra
  // checks here to make sure the grid automatically handles all cells
  const openCellPopover = useCallback<EuiDataGridRefProps['openCellPopover']>(
    ({ rowIndex, colIndex }) => {
      checkCellExists({ rowIndex, colIndex });
      const visibleRowIndex = findVisibleRowIndex(rowIndex);
      _openCellPopover({ rowIndex: visibleRowIndex, colIndex });
    },
    [_openCellPopover, checkCellExists, findVisibleRowIndex]
  );

  const scrollTo = useCallback<VariableSizeGrid['scrollTo']>(
    (...args) => gridRef.current?.scrollTo(...args),
    [gridRef]
  );

  const scrollToItem = useCallback<VariableSizeGrid['scrollToItem']>(
    (...args) => gridRef.current?.scrollToItem(...args),
    [gridRef]
  );

  // Set the ref APIs
  useImperativeHandle(
    ref,
    (): EuiDataGridRefProps => ({
      setIsFullScreen,
      setFocusedCell,
      openCellPopover,
      closeCellPopover,
      scrollTo,
      scrollToItem,
    }),
    [
      setIsFullScreen,
      setFocusedCell,
      openCellPopover,
      closeCellPopover,
      scrollTo,
      scrollToItem,
    ]
  );
};

/**
 * Throw a digestible error if the consumer attempts to focus into an invalid
 * cell range, which should also stop the APIs from continuing
 */
export const useCellLocationCheck = (rowCount: number, colCount: number) => {
  const checkCellExists = useCallback(
    ({ rowIndex, colIndex }: { rowIndex: number; colIndex: number }) => {
      if (rowIndex >= rowCount || rowIndex < 0) {
        throw new Error(
          `Row ${rowIndex} is not a valid row. The maximum visible row index is ${
            rowCount - 1
          }.`
        );
      }
      if (colIndex >= colCount) {
        throw new Error(
          `Column ${colIndex} is not a valid column. The maximum visible column index is ${
            colCount - 1
          }.`
        );
      }
    },
    [rowCount, colCount]
  );

  return { checkCellExists };
};

/**
 * The rowIndex passed from the consumer is the unsorted and unpaginated
 * index derived from their original data. We need to convert that rowIndex
 * into a visibleRowIndex (which is what our internal cell APIs use) and, if
 * the row is not on the current page, the grid should automatically handle
 * paginating to that row.
 */
export const useSortPageCheck = (
  pagination: Required<EuiDataGridProps['pagination']>,
  sortedRowMap: DataGridSortingContextShape['sortedRowMap']
) => {
  const findVisibleRowIndex = useCallback(
    (rowIndex: number): number => {
      // Account for sorting
      const visibleRowIndex = sortedRowMap.length
        ? sortedRowMap.findIndex((mappedIndex) => mappedIndex === rowIndex)
        : rowIndex;

      // Account for pagination
      if (pagination && pagination.pageSize > 0) {
        const pageIndex = Math.floor(visibleRowIndex / pagination.pageSize);
        // If the targeted row is on a different page than the current page,
        // we should automatically navigate the user to the correct page
        if (pageIndex !== pagination.pageIndex) {
          pagination.onChangePage(pageIndex);
        }
        // Get the row's visible row index on that page
        return visibleRowIndex % pagination.pageSize;
      }
      return visibleRowIndex;
    },
    [pagination, sortedRowMap]
  );

  return { findVisibleRowIndex };
};
