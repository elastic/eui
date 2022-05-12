/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { EuiObserver } from '../observer';

export interface EuiResizeObserverProps {
  /**
   * ReactNode to render as this component's content
   */
  children: (ref: (e: HTMLElement | null) => void) => ReactNode;
  onResize: (dimensions: { height: number; width: number }) => void;
}

export const hasResizeObserver =
  typeof window !== 'undefined' && typeof window.ResizeObserver !== 'undefined';

export class EuiResizeObserver extends EuiObserver<EuiResizeObserverProps> {
  name = 'EuiResizeObserver';

  state = {
    height: 0,
    width: 0,
  };

  onResize: ResizeObserverCallback = () => {
    // `entry.contentRect` provides incomplete `height` and `width` data.
    // Use `getBoundingClientRect` to account for padding and border.
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly
    if (!this.childNode) return;
    const { height, width } = this.childNode.getBoundingClientRect();
    // Check for actual resize event
    if (this.state.height === height && this.state.width === width) {
      return;
    }

    this.props.onResize({
      height,
      width,
    });
    this.setState({ height, width });
  };

  beginObserve = () => {
    // The superclass checks that childNode is not null before invoking
    // beginObserve()
    const childNode = this.childNode!;
    this.observer = makeResizeObserver(childNode, this.onResize)!;
  };
}

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
    (dimensions) => {
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
      // ResizeObserver's first call to the observation callback is scheduled in the future
      // so find the container's initial dimensions now
      const boundingRect = container.getBoundingClientRect();
      setSize({
        width: boundingRect.width,
        height: boundingRect.height,
      });

      const observer = makeResizeObserver(container, () => {
        // `entry.contentRect` provides incomplete `height` and `width` data.
        // Use `getBoundingClientRect` to account for padding and border.
        // https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly
        const { height, width } = container.getBoundingClientRect();
        setSize({
          width,
          height,
        });
      });

      return () => observer && observer.disconnect();
    } else {
      setSize({ width: 0, height: 0 });
    }
  }, [container, setSize]);

  return size;
};
