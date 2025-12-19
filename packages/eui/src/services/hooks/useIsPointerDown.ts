/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useState, useEffect } from 'react';

/**
 * A hook that tracks whether the pointer is currently down/pressed.
 * Useful for detecting text selection in progress.
 */
export function useIsPointerDown() {
  const [isPointerDown, setIsPointerDown] = useState(false);

  useEffect(() => {
    const handlePointerDown = () => {
      setIsPointerDown(true);
    };

    const handlePointerUp = () => {
      setIsPointerDown(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return isPointerDown;
}
