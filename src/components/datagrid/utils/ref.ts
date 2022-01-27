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
}

export const useImperativeGridRef = ({
  ref,
  setIsFullScreen,
  focusContext,
  cellPopoverContext,
}: Dependencies) => {
  // Focus APIs
  const { setFocusedCell: _setFocusedCell } = focusContext; // eslint complains about the dependency array otherwise

  const setFocusedCell = useCallback(
    ({ rowIndex, colIndex }) => {
      _setFocusedCell([colIndex, rowIndex]); // Transmog args from obj to array
    },
    [_setFocusedCell]
  );

  // Popover APIs
  const {
    openCellPopover: _openCellPopover,
    closeCellPopover,
  } = cellPopoverContext;

  const openCellPopover = useCallback(
    ({ rowIndex, colIndex }) => {
      _openCellPopover({ rowIndex, colIndex });
    },
    [_openCellPopover]
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
