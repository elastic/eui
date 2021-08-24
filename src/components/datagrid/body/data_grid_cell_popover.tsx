/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React, { JSXElementConstructor } from 'react';
import { keys } from '../../../services';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../../button/button_empty';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiPopover, EuiPopoverFooter } from '../../popover';
import {
  EuiDataGridCellPopoverProps,
  EuiDataGridCellValueElementProps,
  EuiDataGridColumnCellAction,
  EuiDataGridColumnCellActionProps,
} from '../data_grid_types';

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
      zIndex={8001}
      display="block"
      closePopover={closePopover}
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
