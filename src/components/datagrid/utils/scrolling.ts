/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useContext, useEffect, useCallback, MutableRefObject } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import { DataGridFocusContext } from './focus';

interface ScrollCellIntoView {
  rowIndex: number;
  colIndex: number;
}
interface Dependencies {
  gridRef: MutableRefObject<Grid | null>;
  outerGridRef: MutableRefObject<HTMLDivElement | null>;
  innerGridRef: MutableRefObject<HTMLDivElement | null>;
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

  return { scrollCellIntoView };
};

/**
 * Ensures that the passed cell is always fully in view by using cell position
 * checks and scroll adjustments/workarounds.
 */
export const useScrollCellIntoView = ({
  gridRef,
  outerGridRef,
  innerGridRef,
  headerRowHeight,
  footerRowHeight,
  visibleRowCount,
  hasStickyFooter,
}: Dependencies) => {
  const scrollCellIntoView = useCallback(
    async ({ rowIndex, colIndex }: ScrollCellIntoView) => {
      if (!gridRef.current || !outerGridRef.current || !innerGridRef.current) {
        return; // Grid isn't rendered yet or is empty
      }

      const gridDoesNotScroll =
        innerGridRef.current.offsetHeight ===
          outerGridRef.current.offsetHeight &&
        innerGridRef.current.offsetWidth === outerGridRef.current.offsetWidth;
      if (gridDoesNotScroll) {
        return; // If it doesn't scroll, there's nothing to do here
      }

      // Obtain the outermost wrapper of the current cell in view in order to
      // get scroll position/height/width calculations and determine what level
      // of scroll adjustment the cell needs
      const getCell = () =>
        outerGridRef.current!.querySelector<HTMLDivElement>(
          `[data-gridcell-id="${colIndex},${rowIndex}"]`
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
      const rightScrollBound = scrollLeft + outerGridRef.current.clientWidth; // Note: clientWidth accounts for scrollbars
      const rightWidthOutOfView = cellRightPos - rightScrollBound;
      if (rightWidthOutOfView > 0) {
        adjustedScrollLeft = scrollLeft + rightWidthOutOfView;
      }

      // Check if the cell's left side is outside the current scrolling bounds
      const cellLeftPos = cell.offsetLeft;
      const leftScrollBound = scrollLeft;
      const leftWidthOutOfView = leftScrollBound - cellLeftPos;
      if (leftWidthOutOfView > 0) {
        // Note: This overrides the right side being out of bounds, as we want to prefer
        // showing the top-left corner of items if a cell is somehow larger than the grid container
        adjustedScrollLeft = scrollLeft - leftWidthOutOfView;
      }

      // Skip top/bottom scroll adjustments for sticky headers & footers
      // since they should always be in view vertically
      const isStickyHeader = rowIndex === -1;
      const isStickyFooter = hasStickyFooter && rowIndex === visibleRowCount;

      if (!isStickyHeader && !isStickyFooter) {
        // Check if the cell's bottom side is outside the current scrolling bounds
        const cellBottomPos = cell.offsetTop + cell.offsetHeight;
        let bottomScrollBound = scrollTop + outerGridRef.current.clientHeight; // Note: clientHeight accounts for scrollbars
        if (hasStickyFooter) bottomScrollBound -= footerRowHeight; // Sticky footer is not always present
        const bottomHeightOutOfView = cellBottomPos - bottomScrollBound;
        if (bottomHeightOutOfView > 0) {
          adjustedScrollTop = scrollTop + bottomHeightOutOfView;
        }

        // Check if the cell's top side is outside the current scrolling bounds
        const cellTopPos = cell.offsetTop;
        const topScrollBound = scrollTop + headerRowHeight; // Sticky header is always present
        const topHeightOutOfView = topScrollBound - cellTopPos;
        if (topHeightOutOfView > 0) {
          // Note: This overrides the bottom side being out of bounds, as we want to prefer
          // showing the top-left corner of items if a cell is somehow larger than the grid container
          adjustedScrollTop = scrollTop - topHeightOutOfView;
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
      innerGridRef,
      headerRowHeight,
      footerRowHeight,
      visibleRowCount,
      hasStickyFooter,
    ]
  );

  return { scrollCellIntoView };
};
