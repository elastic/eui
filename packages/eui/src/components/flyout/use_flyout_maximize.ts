/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { EuiFlyoutMenuProps } from './flyout_menu';
import type { EuiFlyoutManagerState } from './manager/types';

/**
 * Whether a managed flyout is maximized. Both the managed wrapper and the
 * flyout component read this so they agree on the same render.
 * @internal
 */
export const getIsManagedFlyoutMaximized = (
  flyoutMenuProps: EuiFlyoutMenuProps | undefined,
  managerState: EuiFlyoutManagerState | undefined,
  flyoutId: string
): boolean =>
  !!flyoutMenuProps?.showMaximizeButton &&
  !!managerState?.flyouts.find((f) => f.flyoutId === flyoutId)?.maximized;

/**
 * @internal
 */
export interface UseEuiFlyoutMaximize {
  /** `flyoutMenuProps.showMaximizeButton` */
  enabled: boolean;
  flyoutId: string;
  isInManagedContext: boolean;
  /**
   * When this is a main flyout, the child of its own session, which is not
   * necessarily the foreground session. `null` for any other flyout.
   */
  childFlyoutId: string | null;
  /** For managed flyouts, the result of `getIsManagedFlyoutMaximized`. */
  maximized?: boolean;
  setMaximized?: (flyoutId: string, maximized: boolean) => void;
  onMaximizeChange?: (isMaximized: boolean) => void;
}

/**
 * Holds the maximized state for a flyout. Unmanaged flyouts keep it in local
 * state; managed flyouts keep it in their manager store entry so the managed
 * wrapper and the reducer see the same value.
 * @internal
 */
export const useEuiFlyoutMaximize = ({
  enabled,
  flyoutId,
  isInManagedContext,
  childFlyoutId,
  maximized,
  setMaximized,
  onMaximizeChange,
}: UseEuiFlyoutMaximize) => {
  const [localMaximized, setLocalMaximized] = useState(false);

  const isMaximized = isInManagedContext
    ? !!maximized
    : enabled && localMaximized;
  const canMaximize = enabled && !childFlyoutId;

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
 * @internal
 */
export interface FlyoutWidthHold {
  /** The last width measured while not maximized. */
  trusted?: number;
  /** The last width measured while maximized. */
  held?: number;
}

/**
 * Resolves the width used by the store and push padding. While maximized, the
 * measured width is the full container, so the last restored width stands in
 * for it. The first measurement after restoring is treated the same way
 * because the resize observer has not yet seen the restored layout. A missing
 * measurement (the observer is detached) drops the hold so a stale width
 * never persists.
 * @internal
 */
export const resolveFlyoutWidth = (
  hold: FlyoutWidthHold,
  isMaximized: boolean,
  width: number | undefined
): { hold: FlyoutWidthHold; width: number | undefined } => {
  if (!width) return { hold: {}, width };
  if (isMaximized) {
    return {
      hold: { trusted: hold.trusted, held: width },
      width: hold.trusted,
    };
  }
  if (width === hold.held) return { hold, width: hold.trusted ?? width };
  return { hold: { trusted: width }, width };
};
