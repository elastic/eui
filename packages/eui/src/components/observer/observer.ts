/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useEffect, useRef } from 'react';

export interface Observer {
  disconnect: () => void;
  observe: (element: Element, options?: { [key: string]: any }) => void;
}

/**
 * A shared custom hook that provides a pattern for observing DOM nodes
 * via browser observer APIs. Used by `EuiResizeObserver` and `EuiMutationObserver`.
 *
 * @param beginObserve - A callback that receives the target DOM element and should
 *   create and return the observer instance (e.g., `ResizeObserver`).
 * @param componentName - Optional name used in error messages when no ref is
 *   attached on mount, mirroring the guard previously in `EuiObserver`.
 */
export const useObserver = (
  beginObserve: (node: Element) => Observer | undefined,
  componentName: string = 'useObserver'
) => {
  const childNodeRef = useRef<Element | null>(null);
  const observerRef = useRef<Observer | null>(null);

  // Store beginObserve in a ref so the ref callback doesn't cycle
  const beginObserveRef = useRef(beginObserve);
  beginObserveRef.current = beginObserve;

  // Guard: throw if the ref callback was never called (no element attached),
  // mirroring the check previously in EuiObserver.componentDidMount.
  // Also cleans up the observer on unmount.
  useEffect(() => {
    if (childNodeRef.current == null) {
      throw new Error(`${componentName} did not receive a ref`);
    }
    return () => {
      observerRef.current?.disconnect();
    };
  }, [componentName]);

  const updateChildNode = useCallback((ref: Element | null) => {
    if (childNodeRef.current === ref) return; // node hasn't changed

    // if there's an existing observer disconnect it
    if (observerRef.current != null) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    childNodeRef.current = ref;

    if (childNodeRef.current != null) {
      observerRef.current =
        beginObserveRef.current(childNodeRef.current) ?? null;
    }
  }, []);

  return updateChildNode;
};
