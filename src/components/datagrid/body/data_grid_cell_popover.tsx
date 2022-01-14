/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  createContext,
  useState,
  useCallback,
  JSXElementConstructor,
} from 'react';
import { keys } from '../../../services';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../../button/button_empty';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiPopover, EuiPopoverFooter } from '../../popover';
import {
  DataGridCellPopoverContextShape,
  EuiDataGridCellPopoverProps,
  EuiDataGridCellValueElementProps,
  EuiDataGridColumnCellAction,
  EuiDataGridColumnCellActionProps,
} from '../data_grid_types';

export const DataGridCellPopoverContext = createContext<
  DataGridCellPopoverContextShape
>({
  popoverIsOpen: false,
  openCellLocation: { rowIndex: 0, colIndex: 0 },
  openCellPopover: () => {},
  closeCellPopover: () => {},
  setPopoverAnchor: () => {},
  setPopoverContent: () => {},
});

export const useCellPopover = (): {
  cellPopoverContext: DataGridCellPopoverContextShape;
} => {
  // Current open state & cell location are handled here
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const [openCellLocation, setOpenCellLocation] = useState({
    rowIndex: 0,
    colIndex: 0,
  });
  // Popover anchor & content are passed by individual `EuiDataGridCell`s
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const [popoverContent, setPopoverContent] = useState<ReactNode>();

  const closeCellPopover = useCallback(() => setPopoverIsOpen(false), []);
  const openCellPopover = useCallback(({ rowIndex, colIndex }) => {
    // Toggle our open cell state, which causes EuiDataGridCells to react/check
    // if they should be the open popover and send their anchor+content if so
    setOpenCellLocation({ rowIndex, colIndex });
    setPopoverIsOpen(true);
  }, []);

  const cellPopoverContext = {
    popoverIsOpen,
    closeCellPopover,
    openCellPopover,
    openCellLocation,
    setPopoverAnchor,
    setPopoverContent,
  };

  return { cellPopoverContext };
};

export function EuiDataGridCellPopover({
  anchorContent,
  cellContentProps,
  cellContentsRef,
  closePopover,
  column,
  panelRefFn,
  popoverContent: PopoverContent,
  popoverIsOpen,
  renderCellValue,
  rowIndex,
  colIndex,
}: EuiDataGridCellPopoverProps) {
  const CellElement = renderCellValue as JSXElementConstructor<
    EuiDataGridCellValueElementProps
  >;
  return (
    <EuiPopover
      hasArrow={false}
      anchorClassName="euiDataGridRowCell__expand"
      button={anchorContent}
      isOpen={popoverIsOpen}
      panelRef={panelRefFn}
      panelClassName="euiDataGridRowCell__popover"
      panelPaddingSize="s"
      display="block"
      closePopover={closePopover}
      panelProps={{
        'data-test-subj': 'euiDataGridExpansionPopover',
      }}
      onKeyDown={(event) => {
        if (event.key === keys.F2 || event.key === keys.ESCAPE) {
          event.preventDefault();
          event.stopPropagation();
          closePopover();
        }
      }}
    >
      {popoverIsOpen ? (
        <>
          <PopoverContent cellContentsElement={cellContentsRef!}>
            <CellElement {...cellContentProps} isDetails={true} />
          </PopoverContent>
          {column && column.cellActions && column.cellActions.length ? (
            <EuiPopoverFooter>
              <EuiFlexGroup gutterSize="s">
                {column.cellActions.map(
                  (Action: EuiDataGridColumnCellAction, idx: number) => {
                    const CellButtonElement = Action as JSXElementConstructor<
                      EuiDataGridColumnCellActionProps
                    >;
                    return (
                      <EuiFlexItem key={idx}>
                        <CellButtonElement
                          rowIndex={rowIndex}
                          colIndex={colIndex}
                          columnId={column.id}
                          Component={(props: EuiButtonEmptyProps) => (
                            <EuiButtonEmpty {...props} size="s" />
                          )}
                          isExpanded={true}
                          closePopover={closePopover}
                        />
                      </EuiFlexItem>
                    );
                  }
                )}
              </EuiFlexGroup>
            </EuiPopoverFooter>
          ) : null}
        </>
      ) : null}
    </EuiPopover>
  );
}
