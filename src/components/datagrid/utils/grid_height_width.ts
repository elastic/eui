/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEffect, useState } from 'react';
import { useResizeObserver } from '../../observer/resize_observer';

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

  // re-render data grid on size changes
  useResizeObserver(virtualizeContainer);

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
