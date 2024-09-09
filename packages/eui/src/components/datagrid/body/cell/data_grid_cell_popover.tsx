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
  useMemo,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { keys, useEuiMemoizedStyles } from '../../../../services';
import { EuiWrappingPopover, EuiPopoverProps } from '../../../popover';

import {
  DataGridCellPopoverContextShape,
  EuiDataGridCellPopoverElementProps,
} from '../../data_grid_types';
import { euiDataGridVariables } from '../../data_grid.styles';
import { euiDataGridCellPopoverStyles } from './data_grid_cell_popover.styles';

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
    'downLeft' | 'upLeft'
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

  // Override the default EuiPopover `onClickOutside` behavior, since the toggling
  // popover button isn't actually the DOM node we pass to `button`. Otherwise,
  // clicking the expansion cell action triggers an outside click
  const onClickOutside = useCallback(
    (event: Event) => {
      const cellActions = popoverAnchor?.closest(
        '.euiDataGridRowCell__actionsWrapper'
      );
      if (!cellActions?.contains(event.target as Node)) {
        closeCellPopover();
      }
    },
    [popoverAnchor, closeCellPopover]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === keys.F2 || event.key === keys.ESCAPE) {
        event.preventDefault();
        event.stopPropagation();
        closeCellPopover();
        const cell = popoverAnchor?.closest<HTMLElement>('.euiDataGridRowCell');

        // Prevent cell animation flash while focus is being shifted between popover and cell
        cell?.setAttribute('data-keyboard-closing', 'true');
        // Ensure focus is returned to the parent cell, and remove animation stopgap
        requestAnimationFrame(() => {
          cell?.focus();
          cell?.removeAttribute('data-keyboard-closing');
        });
      }
    },
    [popoverAnchor, closeCellPopover]
  );

  const cellPopoverContext = useMemo(() => {
    return {
      popoverIsOpen,
      closeCellPopover,
      openCellPopover,
      cellLocation,
      setPopoverAnchorPosition,
      setPopoverAnchor,
      setPopoverContent,
      setCellPopoverProps,
    };
  }, [popoverIsOpen, closeCellPopover, openCellPopover, cellLocation]);

  const styles = useEuiMemoizedStyles(euiDataGridCellPopoverStyles);
  const { levels } = useEuiMemoizedStyles(euiDataGridVariables);

  const cellPopover = useMemo(() => {
    if (!popoverIsOpen || !popoverAnchor) return null;

    const cell = popoverAnchor.closest<HTMLElement>('.euiDataGridRowCell');

    // Note that this popover is rendered once at the top grid level, rather than one popover per cell
    return (
      <EuiWrappingPopover
        isOpen={popoverIsOpen}
        display="block"
        hasArrow={false}
        attachToAnchor={true} // required for https://github.com/elastic/eui/issues/6151
        panelPaddingSize="s"
        anchorPosition={popoverAnchorPosition}
        repositionToCrossAxis={false}
        zIndex={levels.cellPopover}
        {...cellPopoverProps}
        focusTrapProps={{ onClickOutside, clickOutsideDisables: false }}
        panelProps={{
          'data-test-subj': 'euiDataGridExpansionPopover',
          ...(cellPopoverProps.panelProps || {}),
          css: [styles.euiDataGridRowCell__popover, cellPopoverProps.css],
        }}
        panelClassName={classNames(
          'euiDataGridRowCell__popover',
          cellPopoverProps.panelClassName,
          cellPopoverProps.panelProps?.className
        )}
        panelStyle={{
          maxInlineSize: `min(75vw, max(${cell?.offsetWidth ?? 0}px, 400px))`,
          maxBlockSize: '50vh',
        }}
        onKeyDown={onKeyDown}
        button={popoverAnchor}
        closePopover={closeCellPopover}
      >
        {popoverContent}
      </EuiWrappingPopover>
    );
  }, [
    styles,
    levels.cellPopover,
    popoverIsOpen,
    popoverAnchor,
    popoverContent,
    cellPopoverProps,
    closeCellPopover,
    onClickOutside,
    onKeyDown,
    popoverAnchorPosition,
  ]);

  return useMemo(
    () => ({
      cellPopoverContext,
      cellPopover,
    }),
    [cellPopoverContext, cellPopover]
  );
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
