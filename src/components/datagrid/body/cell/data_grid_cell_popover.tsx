/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useState, useCallback, ReactNode } from 'react';
import classNames from 'classnames';

import { keys } from '../../../../services';
import { EuiWrappingPopover, EuiPopoverProps } from '../../../popover';
import {
  DataGridCellPopoverContextShape,
  EuiDataGridCellPopoverElementProps,
} from '../../data_grid_types';

export const DataGridCellPopoverContext =
  createContext<DataGridCellPopoverContextShape>({
    popoverIsOpen: false,
    cellLocation: { rowIndex: 0, colIndex: 0 },
    openCellPopover: () => {},
    closeCellPopover: () => {},
    setPopoverAnchor: () => {},
    setPopoverAnchorPosition: () => {},
    setPopoverContent: () => {},
    setCellPopoverProps: () => {},
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
  const [popoverAnchorPosition, setPopoverAnchorPosition] = useState<
    'downLeft' | 'downRight'
  >('downLeft');
  const [popoverContent, setPopoverContent] = useState<ReactNode>();
  // Allow customization of most (not all) popover props by consumers
  const [cellPopoverProps, setCellPopoverProps] = useState<
    Partial<EuiPopoverProps>
  >({});

  const closeCellPopover = useCallback(() => setPopoverIsOpen(false), []);
  const openCellPopover = useCallback<
    DataGridCellPopoverContextShape['openCellPopover']
  >(
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
    setPopoverAnchorPosition,
    setPopoverContent,
    setCellPopoverProps,
  };

  // Override the default EuiPopover `onClickOutside` behavior, since the toggling
  // popover button isn't actually the DOM node we pass to `button`. Otherwise,
  // clicking the expansion cell action triggers an outside click
  const onClickOutside = useCallback(
    (event: Event) => {
      const cellActions =
        popoverAnchor?.parentElement?.parentElement?.previousElementSibling;
      if (!cellActions?.contains(event.target as Node)) {
        closeCellPopover();
      }
    },
    [popoverAnchor, closeCellPopover]
  );

  // Note that this popover is rendered once at the top grid level, rather than one popover per cell
  const cellPopover = popoverIsOpen && popoverAnchor && (
    <EuiWrappingPopover
      isOpen={popoverIsOpen}
      display="block"
      hasArrow={false}
      panelPaddingSize="s"
      anchorPosition={popoverAnchorPosition}
      repositionToCrossAxis={false}
      {...cellPopoverProps}
      focusTrapProps={{ onClickOutside, clickOutsideDisables: false }}
      panelProps={{
        'data-test-subj': 'euiDataGridExpansionPopover',
        ...(cellPopoverProps.panelProps || {}),
      }}
      panelClassName={classNames(
        'euiDataGridRowCell__popover',
        cellPopoverProps.panelClassName,
        cellPopoverProps.panelProps?.className
      )}
      panelStyle={{
        maxInlineSize: `min(75vw, max(${
          popoverAnchor.parentElement!.offsetWidth
        }px, 400px))`,
        maxBlockSize: '50vh',
      }}
      onKeyDown={(event) => {
        if (event.key === keys.F2 || event.key === keys.ESCAPE) {
          event.preventDefault();
          event.stopPropagation();
          closeCellPopover();
          const cell =
            popoverAnchor.parentElement?.parentElement?.parentElement;

          // Prevent cell animation flash while focus is being shifted between popover and cell
          cell?.setAttribute('data-keyboard-closing', 'true');
          // Ensure focus is returned to the parent cell, and remove animation stopgap
          requestAnimationFrame(() => {
            popoverAnchor.parentElement!.focus();
            cell?.removeAttribute('data-keyboard-closing');
          });
        }
      }}
      button={popoverAnchor}
      closePopover={closeCellPopover}
    >
      {popoverContent}
    </EuiWrappingPopover>
  );

  return { cellPopoverContext, cellPopover };
};

/**
 * Popover content renderers
 */
import { EuiText } from '../../../text';
import { EuiCodeBlock } from '../../../code';

export const DefaultCellPopover = ({
  schema,
  cellActions,
  children,
  cellContentsElement,
}: EuiDataGridCellPopoverElementProps) => {
  switch (schema) {
    case 'json':
      return (
        <>
          <JsonPopoverContent cellText={cellContentsElement.innerText} />
          {cellActions}
        </>
      );
    default:
      return (
        <>
          <EuiText>{children}</EuiText>
          {cellActions}
        </>
      );
  }
};

export const JsonPopoverContent = ({ cellText }: { cellText: string }) => {
  let formattedText = cellText;
  try {
    formattedText = JSON.stringify(JSON.parse(formattedText), null, 2);
  } catch (e) {}

  return (
    <EuiCodeBlock
      isCopyable
      transparentBackground
      paddingSize="none"
      language="json"
    >
      {formattedText}
    </EuiCodeBlock>
  );
};
