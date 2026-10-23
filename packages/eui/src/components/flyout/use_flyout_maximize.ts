/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * @internal
 */
export interface UseEuiFlyoutMaximize {
  /** `flyoutMenuProps.showMaximizeButton` */
  enabled: boolean;
  flyoutId: string;
  isInManagedContext: boolean;
  isMainFlyout: boolean;
  /** The child of this flyout's own session, which is not necessarily the foreground session */
  ownChildFlyoutId: string | null;
  /** The managed flyout's `maximized` flag from the manager store */
  maximized?: boolean;
  setMaximized?: (flyoutId: string, maximized: boolean) => void;
  onMaximizeChange?: (isMaximized: boolean) => void;
}

/**
 * Owns the maximized flag for a flyout. Unmanaged flyouts keep it in local
 * state; managed flyouts keep it on their manager store entry so the managed
 * wrapper and the reducer see the same value.
 * @internal
 */
export const useEuiFlyoutMaximize = ({
  enabled,
  flyoutId,
  isInManagedContext,
  isMainFlyout,
  ownChildFlyoutId,
  maximized,
  setMaximized,
  onMaximizeChange,
}: UseEuiFlyoutMaximize) => {
  const [localMaximized, setLocalMaximized] = useState(false);

  const isMaximized =
    enabled && (isInManagedContext ? !!maximized : localMaximized);
  const canMaximize = enabled && !(isMainFlyout && ownChildFlyoutId);

  const toggleMaximize = useCallback(() => {
    if (isInManagedContext) {
      setMaximized?.(flyoutId, !isMaximized);
    } else {
      setLocalMaximized(!isMaximized);
    }
  }, [isInManagedContext, setMaximized, flyoutId, isMaximized]);

  // The flag can be cleared by the reducer (a child opening restores its
  // main), so the callback follows the flag, not the click.
  const onMaximizeChangeRef = useRef(onMaximizeChange);
  useEffect(() => {
    onMaximizeChangeRef.current = onMaximizeChange;
  }, [onMaximizeChange]);
  const prevIsMaximizedRef = useRef(isMaximized);
  useEffect(() => {
    if (prevIsMaximizedRef.current === isMaximized) return;
    prevIsMaximizedRef.current = isMaximized;
    onMaximizeChangeRef.current?.(isMaximized);
  }, [isMaximized]);

  return { isMaximized, canMaximize, toggleMaximize };
};

/**
 * Decides whether a managed flyout's measured width may be written to the
 * manager store. Layout mode and sibling clamping trust the stored width, so
 * it must never hold the full-container width painted while maximized. The
 * first sample after restore is still the maximized width (`heldWidth`),
 * because the resize observer has not yet seen the restored layout.
 * @internal
 */
export const shouldPublishFlyoutWidth = ({
  isMaximized,
  width,
  heldWidth,
}: {
  isMaximized: boolean;
  width: number | undefined;
  heldWidth: number | undefined;
}): boolean => {
  if (!width || isMaximized) return false;
  return width !== heldWidth;
};
