/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useState, useCallback, ReactNode } from 'react';

import { keys } from '../../../services';
import { EuiWrappingPopover } from '../../popover';
import { DataGridCellPopoverContextShape } from '../data_grid_types';

export const DataGridCellPopoverContext = createContext<
  DataGridCellPopoverContextShape
>({
  popoverIsOpen: false,
  cellLocation: { rowIndex: 0, colIndex: 0 },
  openCellPopover: () => {},
  closeCellPopover: () => {},
  setPopoverAnchor: () => {},
  setPopoverContent: () => {},
});

export const useCellPopover = (): {
  cellPopoverContext: DataGridCellPopoverContextShape;
  cellPopover: ReactNode;
} => {
  // Current open state & cell location are handled here
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const [cellLocation, setCellLocation] = useState({
    rowIndex: 0,
    colIndex: 0,
  });
  // Popover anchor & content are passed by individual `EuiDataGridCell`s
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const [popoverContent, setPopoverContent] = useState<ReactNode>();

  const closeCellPopover = useCallback(() => setPopoverIsOpen(false), []);
  const openCellPopover = useCallback(
    ({ rowIndex, colIndex }) => {
      // Prevent popover DOM issues when re-opening the same popover
      if (
        popoverIsOpen &&
        rowIndex === cellLocation.rowIndex &&
        colIndex === cellLocation.colIndex
      ) {
        return;
      }

      // Toggle our open cell state, which causes EuiDataGridCells to react/check
      // if they should be the open popover and send their anchor+content if so
      setPopoverAnchor(null); // Resetting the anchor node is required for rerendering to work correctly
      setCellLocation({ rowIndex, colIndex });
      setPopoverIsOpen(true);
    },
    [popoverIsOpen, cellLocation]
  );

  const cellPopoverContext = {
    popoverIsOpen,
    closeCellPopover,
    openCellPopover,
    cellLocation,
    setPopoverAnchor,
    setPopoverContent,
  };

  // Note that this popover is rendered once at the top grid level, rather than one popover per cell
  const cellPopover = popoverIsOpen && popoverAnchor && (
    <EuiWrappingPopover
      hasArrow={false}
      anchorClassName="euiDataGridRowCell__expand"
      button={popoverAnchor}
      isOpen={popoverIsOpen}
      panelClassName="euiDataGridRowCell__popover"
      panelPaddingSize="s"
      display="block"
      closePopover={closeCellPopover}
      panelProps={{
        'data-test-subj': 'euiDataGridExpansionPopover',
      }}
      onKeyDown={(event) => {
        if (event.key === keys.F2 || event.key === keys.ESCAPE) {
          event.preventDefault();
          event.stopPropagation();
          closeCellPopover();
        }
      }}
    >
      {popoverContent}
    </EuiWrappingPopover>
  );

  return { cellPopoverContext, cellPopover };
};
