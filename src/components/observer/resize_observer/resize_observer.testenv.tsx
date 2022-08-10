/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEffect, useState } from 'react';
import { EuiResizeObserverProps } from './resize_observer';

// Re-export `hasResizeObserver` as-is
export const hasResizeObserver =
  typeof window !== 'undefined' && typeof window.ResizeObserver !== 'undefined';

/**
 * jsdom currently does not support ResizeObservers (@see https://github.com/jsdom/jsdom/issues/3368)
 * To mimic RO init behavior (should call onResize on mount), we're providing the below testenv mocks.
 */

export const EuiResizeObserver = ({
  onResize,
  children,
}: EuiResizeObserverProps) => {
  const [observedElement, setObservedElement] = useState<Element | null>(null);

  useEffect(() => {
    if (observedElement) {
      const { width, height } = observedElement.getBoundingClientRect();
      onResize({ width, height });
    }
  }, [observedElement, onResize]);

  return children(setObservedElement);
};

export const useResizeObserver = (
  container: Element | null,
  dimension?: 'width' | 'height'
) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (container != null) {
      const { width, height } = container.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [container, dimension]);

  return size;
};
