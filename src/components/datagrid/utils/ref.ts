/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useImperativeHandle, useCallback, Ref } from 'react';
import {
  EuiDataGridRefProps,
  DataGridFocusContextShape,
  DataGridCellPopoverContextShape,
} from '../data_grid_types';

interface Dependencies {
  ref: Ref<unknown>;
  setIsFullScreen: EuiDataGridRefProps['setIsFullScreen'];
  focusContext: DataGridFocusContextShape;
  cellPopoverContext: DataGridCellPopoverContextShape;
  rowCount: number;
  visibleColCount: number;
}

export const useImperativeGridRef = ({
  ref,
  setIsFullScreen,
  focusContext,
  cellPopoverContext,
  rowCount,
  visibleColCount,
}: Dependencies) => {
  // Cell location helpers
  const { checkCellExists } = useCellLocationCheck(rowCount, visibleColCount);

  // Focus APIs
  const { setFocusedCell: _setFocusedCell } = focusContext; // eslint complains about the dependency array otherwise

  // When we pass this API to the consumer, we can't know for sure that
  // the targeted cell is valid or in view (unlike our internal state, where
  // both of those states can be guaranteed), so we need to do some extra
  // checks here to make sure the grid automatically handles all cells
  const setFocusedCell = useCallback(
    ({ rowIndex, colIndex }) => {
      checkCellExists({ rowIndex, colIndex });
      _setFocusedCell([colIndex, rowIndex]); // Transmog args from obj to array
    },
    [_setFocusedCell, checkCellExists]
  );

  // Popover APIs
  const {
    openCellPopover: _openCellPopover,
    closeCellPopover,
  } = cellPopoverContext;

  // When we pass this API to the consumer, we can't know for sure that
  // the targeted cell is valid or in view (unlike our internal state, where
  // both of those states can be guaranteed), so we need to do some extra
  // checks here to make sure the grid automatically handles all cells
  const openCellPopover = useCallback(
    ({ rowIndex, colIndex }) => {
      checkCellExists({ rowIndex, colIndex });
      _openCellPopover({ rowIndex, colIndex });
    },
    [_openCellPopover, checkCellExists]
  );

  // Set the ref APIs
  useImperativeHandle(
    ref,
    () => ({
      setIsFullScreen,
      setFocusedCell,
      openCellPopover,
      closeCellPopover,
    }),
    [setIsFullScreen, setFocusedCell, openCellPopover, closeCellPopover]
  );
};

/**
 * Throw a digestible error if the consumer attempts to focus into an invalid
 * cell range, which should also stop the APIs from continuing
 */
export const useCellLocationCheck = (rowCount: number, colCount: number) => {
  const checkCellExists = useCallback(
    ({ rowIndex, colIndex }) => {
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
