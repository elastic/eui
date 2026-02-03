/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useState, useEffect, MutableRefObject } from 'react';

/**
 * A hook that tracks whether the pointer is currently down/pressed.
 * Useful for detecting text selection in progress.
 */
export function useIsPointerDown(
  container?: MutableRefObject<HTMLElement | null>
) {
  const [isPointerDown, setIsPointerDown] = useState(false);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        container?.current &&
        !container.current.contains(event.target as Node)
      ) {
        return;
      }
      setIsPointerDown(true);
    };

    const handlePointerUpOrCancel = () => {
      setIsPointerDown(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsPointerDown(false);
      }
    };

    const controller = new AbortController();
    const options = { capture: true, signal: controller.signal };

    document.addEventListener('pointerdown', handlePointerDown, options);
    document.addEventListener('pointerup', handlePointerUpOrCancel, options);
    document.addEventListener(
      'pointercancel',
      handlePointerUpOrCancel,
      options
    );
    document.addEventListener('visibilitychange', handleVisibilityChange, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, [container]);

  return isPointerDown;
}
