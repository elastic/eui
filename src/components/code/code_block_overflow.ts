/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEffect, useState, useMemo, CSSProperties } from 'react';
import { useMutationObserver } from '../observer/mutation_observer';
import { useResizeObserver } from '../observer/resize_observer';

/**
 * Overflow logic - returns overflow-related state/logic/utils
 *
 * Detects whether the code block overflows and returns a tabIndex of 0 if so,
 * which allows keyboard users to use the up/down arrow keys to scroll through
 * the container.
 */
export const useOverflow = ({
  overflowHeight,
}: {
  overflowHeight?: number | string;
}) => {
  const [wrapperRef, setWrapperRef] = useState<Element | null>(null);
  const [tabIndex, setTabIndex] = useState<-1 | 0>(-1);
  const { width, height } = useResizeObserver(wrapperRef);

  const doesOverflow = () => {
    if (!wrapperRef) return;

    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = wrapperRef;
    const doesOverflow =
      scrollHeight > clientHeight || scrollWidth > clientWidth;

    setTabIndex(doesOverflow ? 0 : -1);
  };

  useMutationObserver(wrapperRef, doesOverflow, {
    subtree: true,
    childList: true,
  });

  useEffect(doesOverflow, [width, height, wrapperRef]);

  const overflowHeightStyles: CSSProperties = useMemo(() => {
    if (overflowHeight) {
      const property =
        typeof overflowHeight === 'string' ? 'blockSize' : 'maxBlockSize';
      return {
        [property]: overflowHeight,
      };
    }
    return {};
  }, [overflowHeight]);

  return { setWrapperRef, tabIndex, overflowHeightStyles };
};
