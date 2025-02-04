/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  useEffect,
  useState,
  useContext,
  MutableRefObject,
  useMemo,
} from 'react';
import { IS_JEST_ENVIRONMENT } from '../../../utils';
import { useUpdateEffect, useForceRender } from '../../../services';
import { useResizeObserver } from '../../observer/resize_observer';
import { EuiDataGridRowHeightsOptions } from '../data_grid_types';
import { RowHeightUtilsType } from './row_heights';
import { DataGridSortedContext } from './sorting';

export const useFinalGridDimensions = ({
  unconstrainedHeight,
  unconstrainedWidth,
  wrapperDimensions,
  wrapperRef,
  isFullScreen,
  rowCount,
}: {
  unconstrainedHeight: number;
  unconstrainedWidth: number;
  wrapperDimensions: { width: number; height: number };
  wrapperRef: MutableRefObject<HTMLDivElement | null>;
  isFullScreen: boolean;
  rowCount: number;
}) => {
  // Used if the grid needs to scroll
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);
  // Tracking fullscreen height separately is necessary to correctly restore the grid back to non-fullscreen height
  const [fullScreenHeight, setFullScreenHeight] = useState(0);

  // Set the wrapper height on load, whenever the grid wrapper resizes, and whenever rowCount changes
  useEffect(() => {
    if (!wrapperRef.current) return;
    const wrapperHeight = wrapperRef.current.getBoundingClientRect().height;

    if (isFullScreen) {
      setFullScreenHeight(wrapperHeight);
    } else {
      // NOTE: Math.round() is necessary here to account for browser zoom level
      // Otherwise, both `wrapperHeight` and `unconstrainedHeight` can return values
      // that are slightly off by small decimal rounding, which are essentially
      // equivalent but causes the wrapper height to get set when it shouldn't
      if (Math.round(wrapperHeight) !== Math.round(unconstrainedHeight)) {
        setHeight(wrapperHeight);
      }
    }
  }, [
    rowCount,
    isFullScreen,
    wrapperDimensions.height,
    unconstrainedHeight,
    wrapperRef,
  ]);

  // Set the wrapper width on load and whenever the grid wrapper resizes
  useEffect(() => {
    if (!wrapperRef.current) return;
    const wrapperWidth = wrapperRef.current.getBoundingClientRect().width;

    if (wrapperWidth !== unconstrainedWidth) {
      setWidth(wrapperWidth);
    }
  }, [wrapperDimensions.width, unconstrainedWidth, wrapperRef]);

  const finalHeight = isFullScreen
    ? fullScreenHeight
    : height || unconstrainedHeight;
  const finalWidth = width || unconstrainedWidth;

  return IS_JEST_ENVIRONMENT
    ? {
        finalHeight: Number.MAX_SAFE_INTEGER,
        finalWidth: Number.MAX_SAFE_INTEGER,
      }
    : { finalHeight, finalWidth };
};

/**
 * Computes the unconstrained (total possible) height of a grid
 */
export const useUnconstrainedHeight = ({
  rowHeightUtils,
  startRow,
  endRow,
  rowHeightsOptions,
  defaultRowHeight,
  headerRowHeight,
  footerRowHeight,
  scrollBarHeight,
  innerGridRef,
}: {
  rowHeightUtils: RowHeightUtilsType;
  startRow: number;
  endRow: number;
  rowHeightsOptions?: EuiDataGridRowHeightsOptions;
  defaultRowHeight: number;
  headerRowHeight: number;
  footerRowHeight: number;
  scrollBarHeight: number;
  innerGridRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const { getCorrectRowIndex } = useContext(DataGridSortedContext);
  // watch the inner element for a change to its width
  // which may cause the horizontal scrollbar to be added or removed
  const { width: innerWidth } = useResizeObserver(
    innerGridRef.current,
    'width'
  );
  const forceRender = useForceRender();
  useUpdateEffect(forceRender, [innerWidth]);

  return useMemo(() => {
    let knownHeight = 0; // tracks the pixel height of rows we know the size of
    let knownRowCount = 0; // how many rows we know the size of
    for (let i = startRow; i < endRow; i++) {
      const correctRowIndex = getCorrectRowIndex(i); // map visible row to logical row

      // lookup the height configuration of this row
      const rowHeightOption = rowHeightUtils.getRowHeightOption(
        correctRowIndex,
        rowHeightsOptions
      );

      if (rowHeightOption && rowHeightOption !== 'auto') {
        // this row's height is known
        knownRowCount++;
        knownHeight += rowHeightUtils.getCalculatedHeight(
          rowHeightOption,
          defaultRowHeight,
          correctRowIndex,
          rowHeightsOptions
        );
      }
    }

    // how many rows to provide space for on the screen
    const rowCountToAffordFor = endRow - startRow;

    const unconstrainedHeight =
      defaultRowHeight * (rowCountToAffordFor - knownRowCount) + // guess how much space is required for unknown rows
      knownHeight + // computed pixel height of the known rows
      headerRowHeight + // account for header
      footerRowHeight + // account for footer
      scrollBarHeight; // account for horizontal scrollbar

    return unconstrainedHeight;
  }, [
    defaultRowHeight,
    endRow,
    footerRowHeight,
    headerRowHeight,
    startRow,
    getCorrectRowIndex,
    rowHeightUtils,
    rowHeightsOptions,
    scrollBarHeight,
  ]);
};

/**
 * Returns the size of the cell container minus the scroll bar width.
 * To do so, this hook is listening for size changes of the container itself,
 * as well as pagination changes to make sure every update is caught.
 *
 * This is necessary because there is no callback/event fired by the browser
 * indicating the scroll bar state has changed.
 * @param resizeRef the wrapper element containging the data grid
 * @param pageSize the currently applied page size
 */
export const useVirtualizeContainerWidth = (
  virtualizeContainer: HTMLDivElement | null,
  gridWidth: number,
  pageSize: number | undefined
) => {
  const [virtualizeContainerWidth, setVirtualizeContainerWidth] = useState(0);
  useResizeObserver(virtualizeContainer);

  // re-render data grid on size changes
  const forceRender = useForceRender();
  useUpdateEffect(forceRender, [gridWidth, forceRender]);

  useEffect(() => {
    if (virtualizeContainer?.clientWidth) {
      setVirtualizeContainerWidth(virtualizeContainer.clientWidth);
    }
  }, [virtualizeContainer?.clientWidth]);

  useEffect(() => {
    // wait for layout to settle, then measure virtualize container
    const timerId = setTimeout(() => {
      if (virtualizeContainer?.clientWidth) {
        const containerWidth = virtualizeContainer.clientWidth;
        setVirtualizeContainerWidth(containerWidth);
      }
    }, 100);

    return () => clearTimeout(timerId);
  }, [pageSize, virtualizeContainer]);

  // Use clientWidth of the virtualization container to take scroll bar into account
  // If that's not possible, fall back to the width of the wrapper element
  return virtualizeContainerWidth || gridWidth;
};
