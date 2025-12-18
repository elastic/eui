/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useState, useEffect } from 'react';

/**
 * A hook that tracks whether the mouse button is currently pressed.
 * Only responds to mouse pointer events (not touch or pen).
 * Useful for detecting text selection in progress.
 */
export function useIsMouseDown() {
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') {
        setIsMouseDown(true);
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') {
        setIsMouseDown(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return isMouseDown;
}
