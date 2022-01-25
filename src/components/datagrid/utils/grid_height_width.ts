/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEffect, useState, useContext, MutableRefObject } from 'react';
import { IS_JEST_ENVIRONMENT } from '../../../test';
import { useUpdateEffect, useForceRender } from '../../../services';
import { useResizeObserver } from '../../observer/resize_observer';
import { EuiDataGridRowHeightsOptions } from '../data_grid_types';
import { RowHeightUtils } from './row_heights';
import { DataGridSortingContext } from './sorting';

export const useFinalGridDimensions = ({
  unconstrainedHeight,
  unconstrainedWidth,
  wrapperDimensions,
  wrapperRef,
  rowCount,
}: {
  unconstrainedHeight: number;
  unconstrainedWidth: number;
  wrapperDimensions: { width: number; height: number };
  wrapperRef: MutableRefObject<HTMLDivElement | null>;
  rowCount: number;
}) => {
  // Used if the grid needs to scroll
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);

  // Set the wrapper height on load, whenever the grid wrapper resizes, and whenever rowCount changes
  useEffect(() => {
    const boundingRect = wrapperRef.current!.getBoundingClientRect();

    if (boundingRect.height !== unconstrainedHeight) {
      setHeight(boundingRect.height);
    }
    if (boundingRect.width !== unconstrainedWidth) {
      setWidth(boundingRect.width);
    }
  }, [
    // Effects that should cause recalculations
    rowCount,
    wrapperDimensions,
    // Dependencies
    wrapperRef,
    unconstrainedHeight,
    unconstrainedWidth,
  ]);

  const finalHeight = IS_JEST_ENVIRONMENT
    ? Number.MAX_SAFE_INTEGER
    : height || unconstrainedHeight;
  const finalWidth = IS_JEST_ENVIRONMENT
    ? Number.MAX_SAFE_INTEGER
    : width || unconstrainedWidth;

  return { finalHeight, finalWidth };
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
  rowHeightUtils: RowHeightUtils;
  startRow: number;
  endRow: number;
  rowHeightsOptions?: EuiDataGridRowHeightsOptions;
  defaultRowHeight: number;
  headerRowHeight: number;
  footerRowHeight: number;
  scrollBarHeight: number;
  innerGridRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const { getCorrectRowIndex } = useContext(DataGridSortingContext);

  // when a row height is updated, force a re-render of the grid body to update the unconstrained height
  const forceRender = useForceRender();
  useEffect(() => {
    rowHeightUtils.setRerenderGridBody(forceRender);
  }, [rowHeightUtils, forceRender]);

  let knownHeight = 0; // tracks the pixel height of rows we know the size of
  let knownRowCount = 0; // how many rows we know the size of
  for (let i = startRow; i < endRow; i++) {
    const correctRowIndex = getCorrectRowIndex(i); // map visible row to logical row

    // lookup the height configuration of this row
    const rowHeightOption = rowHeightUtils.getRowHeightOption(
      correctRowIndex,
      rowHeightsOptions
    );

    if (rowHeightOption) {
      // this row's height is known
      knownRowCount++;
      knownHeight += rowHeightUtils.getCalculatedHeight(
        rowHeightOption,
        defaultRowHeight,
        correctRowIndex,
        rowHeightUtils.isRowHeightOverride(correctRowIndex, rowHeightsOptions)
      );
    }
  }

  // how many rows to provide space for on the screen
  const rowCountToAffordFor = endRow - startRow;

  // watch the inner element for a change to its width
  // which may cause the horizontal scrollbar to be added or removed
  const { width: innerWidth } = useResizeObserver(
    innerGridRef.current,
    'width'
  );
  useUpdateEffect(forceRender, [innerWidth]);

  const unconstrainedHeight =
    defaultRowHeight * (rowCountToAffordFor - knownRowCount) + // guess how much space is required for unknown rows
    knownHeight + // computed pixel height of the known rows
    headerRowHeight + // account for header
    footerRowHeight + // account for footer
    scrollBarHeight; // account for horizontal scrollbar

  return unconstrainedHeight;
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
    setTimeout(() => {
      if (virtualizeContainer?.clientWidth) {
        const containerWidth = virtualizeContainer.clientWidth;
        setVirtualizeContainerWidth(containerWidth);
      }
    }, 100);
  }, [pageSize, virtualizeContainer]);

  // Use clientWidth of the virtualization container to take scroll bar into account
  // If that's not possible, fall back to the width of the wrapper element
  return virtualizeContainerWidth || gridWidth;
};
