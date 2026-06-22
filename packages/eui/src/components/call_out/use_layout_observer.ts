/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RefObject, useEffect, useRef } from 'react';

import { hasResizeObserver } from '../observer/resize_observer/resize_observer';
import { EuiCallOutSize } from './types';

const SUPER_NARROW_WIDTH = 400;
const WIDE_BREAKPOINTS: Record<EuiCallOutSize, number> = {
  s: 800,
  m: 1000,
};

/**
 * Observes the rendered width and sets `data-layout` on the root
 * element so that CSS can respond to size changes.
 *
 * This is an alternative to native CSS container queries. Its purpose is to handle cases where
 * container queries would collapse if the element is placed inside a container without a defined size.
 */
export const useLayoutObserver = (
  size: EuiCallOutSize
): RefObject<HTMLDivElement> => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !hasResizeObserver) return;

    const wide = WIDE_BREAKPOINTS[size];

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.borderBoxSize[0].inlineSize;

      if (width <= SUPER_NARROW_WIDTH) {
        element.setAttribute('data-layout', 'superNarrow');
      } else if (width >= wide) {
        element.setAttribute('data-layout', 'wide');
      } else {
        element.removeAttribute('data-layout');
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [size]);

  return elementRef;
};
