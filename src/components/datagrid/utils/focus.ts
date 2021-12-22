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
} from 'react';
import { keys } from '../../../services';
import {
  DataGridFocusContextShape,
  EuiDataGridFocusedCell,
  EuiDataGridProps,
} from '../data_grid_types';

export const DataGridFocusContext = createContext<DataGridFocusContextShape>({
  focusedCell: undefined,
  setFocusedCell: () => {},
  onFocusUpdate: () => () => {},
});

type FocusProps = Pick<HTMLAttributes<HTMLDivElement>, 'tabIndex' | 'onFocus'>;

/**
 * Main focus context and overarching focus state management
 */
export const useFocus = (
  headerIsInteractive: boolean
): DataGridFocusContextShape & { focusProps: FocusProps } => {
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
  const [focusedCell, setFocusedCell] = useState<
    EuiDataGridFocusedCell | undefined
  >(undefined);

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

  const hasHadFocus = useMemo(() => focusedCell != null, [focusedCell]);

  const focusProps = useMemo<FocusProps>(
    () =>
      hasHadFocus
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
              // so shift focus to the first interactive cell within the grid
              if (e.target === e.currentTarget) {
                setFocusedCell(headerIsInteractive ? [0, -1] : [0, 0]);
              }
            },
          },
    [hasHadFocus, setFocusedCell, headerIsInteractive]
  );

  return {
    onFocusUpdate,
    focusedCell,
    setFocusedCell,
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
  rowCount,
  pagination,
  hasFooter,
  headerIsInteractive,
  focusContext,
}: {
  gridElement: HTMLDivElement | null;
  visibleColCount: number;
  visibleRowCount: number;
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
        setFocusedCell([x, y + 1]);
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
      if (pagination) {
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
      if (pagination) {
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
