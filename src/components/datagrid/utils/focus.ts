/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  HTMLAttributes,
  KeyboardEvent,
  MutableRefObject,
} from 'react';
import { GridOnItemsRenderedProps } from 'react-window';
import tabbable from 'tabbable';
import { keys } from '../../../services';
import {
  DataGridFocusContextShape,
  EuiDataGridFocusedCell,
  EuiDataGridProps,
} from '../data_grid_types';

export const DataGridFocusContext = createContext<DataGridFocusContextShape>({
  focusedCell: undefined,
  setFocusedCell: () => {},
  setIsFocusedCellInView: () => {},
  onFocusUpdate: () => () => {},
  focusFirstVisibleInteractiveCell: () => {},
});

type FocusProps = Pick<HTMLAttributes<HTMLDivElement>, 'tabIndex' | 'onFocus'>;

/**
 * Main focus context and overarching focus state management
 */
export const useFocus = ({
  headerIsInteractive,
  gridItemsRendered,
}: {
  headerIsInteractive: boolean;
  gridItemsRendered: MutableRefObject<GridOnItemsRenderedProps | null>;
}): DataGridFocusContextShape & { focusProps: FocusProps } => {
  // Maintain a map of focus cell state callbacks
  const cellsUpdateFocus = useRef<Map<string, Function>>(new Map());

  const onFocusUpdate = useCallback(
    (cell: EuiDataGridFocusedCell, updateFocus: Function) => {
      const key = `${cell[0]}-${cell[1]}`;
      cellsUpdateFocus.current.set(key, updateFocus);
      return () => {
        cellsUpdateFocus.current.delete(key);
      };
    },
    []
  );

  // Current focused cell
  const [isFocusedCellInView, setIsFocusedCellInView] = useState(false);
  const [focusedCell, _setFocusedCell] = useState<
    EuiDataGridFocusedCell | undefined
  >(undefined);

  const setFocusedCell = useCallback((focusedCell: EuiDataGridFocusedCell) => {
    _setFocusedCell(focusedCell);
    setIsFocusedCellInView(true); // scrolling.ts ensures focused cells are fully in view
  }, []);

  const previousCell = useRef<EuiDataGridFocusedCell | undefined>(undefined);
  useEffect(() => {
    if (previousCell.current) {
      notifyCellOfFocusState(
        cellsUpdateFocus.current,
        previousCell.current,
        false
      );
    }
    previousCell.current = focusedCell;

    if (focusedCell) {
      notifyCellOfFocusState(cellsUpdateFocus.current, focusedCell, true);
    }
  }, [cellsUpdateFocus, focusedCell]);

  const focusFirstVisibleInteractiveCell = useCallback(() => {
    if (headerIsInteractive) {
      // The header (rowIndex -1) is sticky and will always be in view
      setFocusedCell([0, -1]);
    } else if (gridItemsRendered.current) {
      const {
        visibleColumnStartIndex,
        visibleRowStartIndex,
      } = gridItemsRendered.current;

      setFocusedCell([visibleColumnStartIndex, visibleRowStartIndex]);
    } else {
      // If the header is non-interactive and there are no rendered cells,
      // there's nothing to do - we might as well leave focus on the grid body wrapper
    }
  }, [setFocusedCell, headerIsInteractive, gridItemsRendered]);

  const focusProps = useMemo<FocusProps>(
    () =>
      isFocusedCellInView
        ? {
            // FireFox allows tabbing to a div that is scrollable, while Chrome does not
            tabIndex: -1,
          }
        : {
            tabIndex: 0,
            onFocus: (e) => {
              // if e.target (the source element of the `focus event`
              // matches e.currentTarget (always the div with this onFocus listener)
              // then the user has focused directly on the data grid wrapper (almost definitely by tabbing)
              // so shift focus to the first visible and interactive cell within the grid
              if (e.target === e.currentTarget) {
                focusFirstVisibleInteractiveCell();
              }
            },
          },
    [isFocusedCellInView, focusFirstVisibleInteractiveCell]
  );

  return {
    onFocusUpdate,
    focusedCell,
    setFocusedCell,
    setIsFocusedCellInView,
    focusFirstVisibleInteractiveCell,
    focusProps,
  };
};

export const notifyCellOfFocusState = (
  cellsUpdateFocus: Map<string, Function>,
  cell: EuiDataGridFocusedCell,
  isFocused: boolean
) => {
  const key = `${cell[0]}-${cell[1]}`;
  const onFocus = cellsUpdateFocus.get(key);
  if (onFocus) {
    onFocus(isFocused);
  }
};

/**
 * Keydown handler for connecting focus state with keyboard navigation
 */
export const createKeyDownHandler = ({
  gridElement,
  visibleColCount,
  visibleRowCount,
  visibleRowStartIndex,
  rowCount,
  pagination,
  hasFooter,
  headerIsInteractive,
  focusContext,
}: {
  gridElement: HTMLDivElement | null;
  visibleColCount: number;
  visibleRowCount: number;
  visibleRowStartIndex: number;
  rowCount: EuiDataGridProps['rowCount'];
  pagination: EuiDataGridProps['pagination'];
  hasFooter: boolean;
  headerIsInteractive: boolean;
  focusContext: DataGridFocusContextShape;
}) => {
  return (event: KeyboardEvent<HTMLDivElement>) => {
    const { focusedCell, setFocusedCell } = focusContext;
    if (focusedCell == null) return;

    if (gridElement == null || !gridElement.contains(document.activeElement)) {
      // if the `contentElement` does not contain the focused element, don't handle the event
      // this happens when React bubbles the key event through a portal
      return;
    }

    const [x, y] = focusedCell;
    const { key, ctrlKey } = event;

    if (key === keys.ARROW_DOWN) {
      event.preventDefault();
      if (hasFooter ? y < visibleRowCount : y < visibleRowCount - 1) {
        if (y === -1) {
          // The header is sticky, so on scrolling virtualized grids, row 0 will not
          // always be rendered to navigate down to. We need to account for this by
          // sending the down arrow to the first visible/virtualized row instead
          setFocusedCell([x, visibleRowStartIndex]);
        } else {
          setFocusedCell([x, y + 1]);
        }
      }
    } else if (key === keys.ARROW_LEFT) {
      event.preventDefault();
      if (x > 0) {
        setFocusedCell([x - 1, y]);
      }
    } else if (key === keys.ARROW_UP) {
      event.preventDefault();
      const minimumIndex = headerIsInteractive ? -1 : 0;
      if (y > minimumIndex) {
        setFocusedCell([x, y - 1]);
      }
    } else if (key === keys.ARROW_RIGHT) {
      event.preventDefault();
      if (x < visibleColCount - 1) {
        setFocusedCell([x + 1, y]);
      }
    } else if (key === keys.PAGE_DOWN) {
      if (pagination && pagination.pageSize > 0) {
        event.preventDefault();
        const pageSize = pagination.pageSize;
        const pageCount = Math.ceil(rowCount / pageSize);
        const pageIndex = pagination.pageIndex;
        if (pageIndex < pageCount - 1) {
          pagination.onChangePage(pageIndex + 1);
        }
        setFocusedCell([focusedCell[0], 0]);
      }
    } else if (key === keys.PAGE_UP) {
      if (pagination && pagination.pageSize > 0) {
        event.preventDefault();
        const pageIndex = pagination.pageIndex;
        if (pageIndex > 0) {
          pagination.onChangePage(pageIndex - 1);
        }
        setFocusedCell([focusedCell[0], pagination.pageSize - 1]);
      }
    } else if (key === (ctrlKey && keys.END)) {
      event.preventDefault();
      setFocusedCell([visibleColCount - 1, visibleRowCount - 1]);
    } else if (key === (ctrlKey && keys.HOME)) {
      event.preventDefault();
      setFocusedCell([0, 0]);
    } else if (key === keys.END) {
      event.preventDefault();
      setFocusedCell([visibleColCount - 1, y]);
    } else if (key === keys.HOME) {
      event.preventDefault();
      setFocusedCell([0, y]);
    }
  };
};

/**
 * Mutation observer for the grid body, which exists to pick up DOM changes
 * in cells and remove interactive elements from the page's tab index, as
 * we want to move between cells via arrow keys instead of tabbing.
 */
export const preventTabbing = (records: MutationRecord[]) => {
  // multiple mutation records can implicate the same cell
  // so be sure to only check each cell once
  const processedCells = new Set();

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    // find the cell content owning this mutation
    const cell = getParentCellContent(record.target);
    if (processedCells.has(cell)) continue;
    processedCells.add(cell);

    if (cell) {
      // if we found it, disable tabbable elements
      const tabbables = tabbable(cell);
      for (let i = 0; i < tabbables.length; i++) {
        const element = tabbables[i];
        if (!element.hasAttribute('data-euigrid-tab-managed')) {
          element.setAttribute('tabIndex', '-1');
          element.setAttribute('data-datagrid-interactable', 'true');
        }
      }
    }
  }
};

// Starts with a Node or HTMLElement returned by a mutation record
// and search its ancestors for a div[data-datagrid-cellcontent], if any,
// which is a valid target for disabling tabbing within
export const getParentCellContent = (_element: Node | HTMLElement) => {
  let element: HTMLElement | null =
    _element.nodeType === document.ELEMENT_NODE
      ? (_element as HTMLElement)
      : _element.parentElement;

  while (
    element && // we haven't walked off the document yet
    element.nodeName !== 'div' && // looking for a div
    !element.hasAttribute('data-datagrid-cellcontent') // that has data-datagrid-cellcontent
  ) {
    element = element.parentElement;
  }
  return element;
};

/**
 * Focus fixes & workarounds
 */

// If the focus is on the header, and the header is no longer interactive,
// move the focus down to the first row
export const useHeaderFocusWorkaround = (headerIsInteractive: boolean) => {
  const { focusedCell, setFocusedCell } = useContext(DataGridFocusContext);
  useEffect(() => {
    if (!headerIsInteractive && focusedCell && focusedCell[1] === -1) {
      setFocusedCell([focusedCell[0], 0]);
    }
  }, [headerIsInteractive, focusedCell, setFocusedCell]);
};
