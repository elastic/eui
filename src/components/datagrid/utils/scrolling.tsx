/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useContext,
  useEffect,
  useCallback,
  useMemo,
  MutableRefObject,
  ReactNode,
} from 'react';
import { VariableSizeGrid as Grid } from 'react-window';

import { DataGridCellPopoverContext } from '../body/cell';
import { EuiDataGridStyle } from '../data_grid_types';
import { DataGridFocusContext } from './focus';

interface ScrollCellIntoView {
  rowIndex: number;
  colIndex: number;
}
interface Dependencies {
  gridRef: MutableRefObject<Grid | null>;
  outerGridRef: MutableRefObject<HTMLDivElement | null>;
  hasGridScrolling: boolean;
  headerRowHeight: number;
  footerRowHeight: number;
  visibleRowCount: number;
  hasStickyFooter: boolean;
}

/**
 * The primary goal of this scroll logic is to ensure keyboard navigation works accessibly,
 * but there are other scenarios where it applies (e.g. clicking partially-visible cells)
 * or is useful for (e.g. manually scrolling to cell that is currently out of viewport
 * while accounting for headers/footers/scrollbars)
 */
export const useScroll = (args: Dependencies) => {
  const { scrollCellIntoView } = useScrollCellIntoView(args);

  const { focusedCell } = useContext(DataGridFocusContext);
  useEffect(() => {
    if (focusedCell) {
      scrollCellIntoView({
        rowIndex: focusedCell[1],
        colIndex: focusedCell[0],
      });
    }
  }, [focusedCell, scrollCellIntoView]);

  const { popoverIsOpen, cellLocation } = useContext(
    DataGridCellPopoverContext
  );
  useEffect(() => {
    if (popoverIsOpen) {
      scrollCellIntoView({
        rowIndex: cellLocation.rowIndex,
        colIndex: cellLocation.colIndex,
      });
    }
  }, [popoverIsOpen, cellLocation, scrollCellIntoView]);

  return { scrollCellIntoView };
};

/**
 * Ensures that the passed cell is always fully in view by using cell position
 * checks and scroll adjustments/workarounds.
 */
export const useScrollCellIntoView = ({
  gridRef,
  outerGridRef,
  hasGridScrolling,
  headerRowHeight,
  footerRowHeight,
  visibleRowCount,
  hasStickyFooter,
}: Dependencies) => {
  const scrollCellIntoView = useCallback(
    // Note: in order for this UX to work correctly with react-window's APIs,
    // the `rowIndex` arg expected is actually our internal `visibleRowIndex`,
    // not the `rowIndex` from the raw unsorted/unpaginated user data
    async ({ rowIndex, colIndex }: ScrollCellIntoView) => {
      if (!gridRef.current || !outerGridRef.current) {
        return; // Grid isn't rendered yet or is empty
      }

      if (!hasGridScrolling) {
        return; // If it doesn't scroll, there's nothing to do here
      }

      // Obtain the outermost wrapper of the current cell in view in order to
      // get scroll position/height/width calculations and determine what level
      // of scroll adjustment the cell needs
      const getCell = () =>
        outerGridRef.current!.querySelector<HTMLDivElement>(
          `[data-gridcell-column-index="${colIndex}"][data-gridcell-visible-row-index="${rowIndex}"]`
        );
      let cell = getCell();

      // If the cell is completely out of view, we need to use react-window's
      // scrollToItem API to get it virtualized and rendered.
      const cellIsInView = !!getCell();
      if (!cellIsInView) {
        gridRef.current.scrollToItem({ rowIndex, columnIndex: colIndex });
        await new Promise(requestAnimationFrame); // The cell does not immediately render - we need to wait an async tick
        cell = getCell();
      }
      if (!cell) return; // If for some reason we can't find a valid cell, short-circuit

      // We now manually adjust scroll positioning around the cell to ensure it's
      // fully in view on all sides. A couple of notes on this:
      // 1. We're avoiding relying on react-window's scrollToItem for this because it also
      //    does not account for sticky items (see https://github.com/bvaughn/react-window/issues/586)
      // 2. The current scroll position we're using as a base comes from either by
      //    `scrollToItem` or native .focus()'s automatic scroll behavior. This gets us
      //    halfway there, but doesn't guarantee the *full* cell in view, or account for
      //    sticky positioned rows or OS scrollbars, hence these workarounds
      const { scrollTop, scrollLeft } = outerGridRef.current;
      let adjustedScrollTop;
      let adjustedScrollLeft;

      // Check if the cell's right side is outside the current scrolling bounds
      const cellRightPos = cell.offsetLeft + cell.offsetWidth;
      const rightScrollBound = scrollLeft + outerGridRef.current.clientWidth; // Note: We specifically want clientWidth and not offsetWidth here to account for scrollbars
      const rightWidthOutOfView = cellRightPos - rightScrollBound;
      if (rightWidthOutOfView > 0) {
        adjustedScrollLeft = scrollLeft + rightWidthOutOfView;
      }

      // Check if the cell's left side is outside the current scrolling bounds
      const cellLeftPos = cell.offsetLeft;
      const leftScrollBound = adjustedScrollLeft ?? scrollLeft;
      const leftWidthOutOfView = leftScrollBound - cellLeftPos;
      if (leftWidthOutOfView > 0) {
        // Note: This overrides the right side being out of bounds, as we want to prefer
        // showing the top-left corner of items if a cell is larger than the grid container
        adjustedScrollLeft = cellLeftPos;
      }

      // Skip top/bottom scroll adjustments for sticky headers & footers
      // since they should always be in view vertically
      const isStickyHeader = rowIndex === -1;
      const isStickyFooter = hasStickyFooter && rowIndex === visibleRowCount;

      if (!isStickyHeader && !isStickyFooter) {
        const parentRow = cell.parentNode as HTMLDivElement;

        // Check if the cell's bottom side is outside the current scrolling bounds
        const cellBottomPos = parentRow.offsetTop + cell.offsetHeight;
        let bottomScrollBound = scrollTop + outerGridRef.current.clientHeight; // Note: We specifically want clientHeight and not offsetHeight here to account for scrollbars
        if (hasStickyFooter) bottomScrollBound -= footerRowHeight; // Sticky footer is not always present
        const bottomHeightOutOfView = cellBottomPos - bottomScrollBound;
        if (bottomHeightOutOfView > 0) {
          adjustedScrollTop = scrollTop + bottomHeightOutOfView;
        }

        // Check if the cell's top side is outside the current scrolling bounds
        const cellTopPos = parentRow.offsetTop;
        const topScrollBound = adjustedScrollTop ?? scrollTop + headerRowHeight; // Sticky header is always present
        const topHeightOutOfView = topScrollBound - cellTopPos;
        if (topHeightOutOfView > 0) {
          // Note: This overrides the bottom side being out of bounds, as we want to prefer
          // showing the top-left corner of items if a cell is larger than the grid container
          adjustedScrollTop = cellTopPos - headerRowHeight;
        }
      }

      // Check for undefined specifically (because 0 is a valid scroll position)
      // to avoid unnecessarily calling scrollTo or hijacking scroll
      if (adjustedScrollTop !== undefined || adjustedScrollLeft !== undefined) {
        gridRef.current.scrollTo({
          scrollLeft: adjustedScrollLeft ?? scrollLeft,
          scrollTop: adjustedScrollTop ?? scrollTop,
        });
      }
    },
    [
      gridRef,
      outerGridRef,
      hasGridScrolling,
      headerRowHeight,
      footerRowHeight,
      visibleRowCount,
      hasStickyFooter,
    ]
  );

  return { scrollCellIntoView };
};

/**
 * Checks whether the current grid scrolls and/or has scrollbars
 */
export const useScrollBars = (
  outerGridRef: MutableRefObject<HTMLDivElement | null>,
  borderStyle: EuiDataGridStyle['border'] = 'all'
): {
  scrollBarHeight: number;
  scrollBarWidth: number;
  hasVerticalScroll: boolean;
  hasHorizontalScroll: boolean;
  scrollBorderOverlay: ReactNode;
} => {
  // https://stackoverflow.com/a/40568748/4294462
  const scrollBarHeight = outerGridRef.current
    ? outerGridRef.current.offsetHeight - outerGridRef.current.clientHeight
    : 0;
  const scrollBarWidth = outerGridRef.current
    ? outerGridRef.current.offsetWidth - outerGridRef.current.clientWidth
    : 0;

  // https://stackoverflow.com/a/5038256
  // Note that it is possible (MacOS) for a grid to scroll but not have scrollbar widths/heights
  const hasHorizontalScroll = outerGridRef.current
    ? outerGridRef.current.scrollWidth > outerGridRef.current.clientWidth
    : false;
  const hasVerticalScroll = outerGridRef.current
    ? outerGridRef.current.scrollHeight > outerGridRef.current.clientHeight
    : false;

  // If the grid scrolls or has scrollbars, we add custom border overlays
  // (since borders are normally set by cells) to ensure our grid body has
  // ending borders regardless of scroll position
  const scrollBorderOverlay = useMemo(() => {
    if (!hasHorizontalScroll && !hasVerticalScroll) {
      return null; // Nothing to render if the grid doesn't scroll
    }
    if (borderStyle === 'none') {
      return null; // Nothing to render if the grid doesn't use borders
    }
    return (
      <div className="euiDataGrid__scrollOverlay" role="presentation">
        {scrollBarHeight > 0 && (
          <div
            className="euiDataGrid__scrollBarOverlayBottom"
            style={{ bottom: scrollBarHeight, right: 0 }}
          />
        )}
        {scrollBarWidth > 0 && (
          <div
            className="euiDataGrid__scrollBarOverlayRight"
            style={{ bottom: scrollBarHeight, right: scrollBarWidth }}
          />
        )}
      </div>
    );
  }, [
    hasHorizontalScroll,
    hasVerticalScroll,
    scrollBarHeight,
    scrollBarWidth,
    borderStyle,
  ]);

  return {
    scrollBarHeight,
    scrollBarWidth,
    hasVerticalScroll,
    hasHorizontalScroll,
    scrollBorderOverlay,
  };
};
