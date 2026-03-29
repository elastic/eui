/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useObserver } from '../observer';

export interface EuiResizeObserverProps {
  /**
   * ReactNode to render as this component's content
   */
  children: (ref: (e: HTMLElement | null) => void) => ReactNode;
  onResize: (dimensions: { height: number; width: number }) => void;
}

export const hasResizeObserver =
  typeof window !== 'undefined' && typeof window.ResizeObserver !== 'undefined';

export const EuiResizeObserver: React.FunctionComponent<
  EuiResizeObserverProps
> = ({ children, onResize }) => {
  const onResizeRef = useRef(onResize);
  onResizeRef.current = onResize;

  const sizeRef = useRef({ height: 0, width: 0 });

  const resizeCallback: ResizeObserverCallback = useCallback(([entry]) => {
    const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];

    // Check for actual resize event
    if (sizeRef.current.height === height && sizeRef.current.width === width) {
      return;
    }

    sizeRef.current = { height, width };
    onResizeRef.current({ height, width });
  }, []);

  const beginObserve = useCallback(
    (node: Element) => makeResizeObserver(node, resizeCallback),
    [resizeCallback]
  );

  const updateChildNode = useObserver(beginObserve, 'EuiResizeObserver');

  return children(updateChildNode) as React.ReactElement;
};

const makeResizeObserver = (
  node: Element,
  callback: ResizeObserverCallback
) => {
  let observer;
  if (hasResizeObserver) {
    observer = new window.ResizeObserver(callback);
    observer.observe(node);
  }
  return observer;
};

export const useResizeObserver = (
  container: Element | null,
  dimension?: 'width' | 'height'
) => {
  const [size, _setSize] = useState({ width: 0, height: 0 });

  // _currentDimensions and _setSize are used to only store the
  // new state (and trigger a re-render) when the new dimensions actually differ
  const _currentDimensions = useRef(size);
  const setSize = useCallback(
    (dimensions: { width: number; height: number }) => {
      const doesWidthMatter = dimension !== 'height';
      const doesHeightMatter = dimension !== 'width';
      if (
        (doesWidthMatter &&
          _currentDimensions.current.width !== dimensions.width) ||
        (doesHeightMatter &&
          _currentDimensions.current.height !== dimensions.height)
      ) {
        _currentDimensions.current = dimensions;
        _setSize(dimensions);
      }
    },
    [dimension]
  );

  useEffect(() => {
    if (container != null) {
      const observer = makeResizeObserver(container, ([entry]) => {
        const { inlineSize, blockSize } = entry.borderBoxSize[0];
        setSize({
          width: inlineSize,
          height: blockSize,
        });
      });

      return () => observer && observer.disconnect();
    } else {
      setSize({ width: 0, height: 0 });
    }
  }, [container, setSize]);

  return size;
};
