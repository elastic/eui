/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useEuiTheme } from '../../../services';
import { setLayoutMode } from './actions';
import {
  useCurrentChildFlyout,
  useCurrentMainFlyout,
  useCurrentSession,
  useFlyoutWidth,
} from './selectors';
import { useFlyoutManager } from './hooks';
import { LAYOUT_MODE_SIDE_BY_SIDE, LAYOUT_MODE_STACKED } from './const';
import { EuiFlyoutLayoutMode } from './types';

/**
 * Hook to handle responsive layout mode for managed flyouts.
 * Decides whether to place flyouts side-by-side or stacked based on
 * viewport width and flyout widths/sizes.
 */
export const useApplyFlyoutLayoutMode = () => {
  const { euiTheme } = useEuiTheme();
  const context = useFlyoutManager();

  const currentSession = useCurrentSession();
  const parentFlyoutId = currentSession?.mainFlyoutId;
  const childFlyoutId = currentSession?.childFlyoutId;

  const parentFlyout = useCurrentMainFlyout();
  const childFlyout = useCurrentChildFlyout();

  const parentWidth = useFlyoutWidth(parentFlyoutId);
  const childWidth = useFlyoutWidth(childFlyoutId);
  const hasFlyouts = Boolean(parentFlyoutId);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : Infinity
  );

  // Extract specific context values
  const dispatch = context?.dispatch;
  const currentLayoutMode = context?.state?.layoutMode;

  const setMode = useCallback(
    (layoutMode: EuiFlyoutLayoutMode) => {
      if (dispatch) {
        dispatch(setLayoutMode(layoutMode));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let rafId = 0;

    const handleResize = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => setWindowWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate the desired layout mode
  const desiredLayoutMode = useMemo(() => {
    // Skip calculation if no flyouts open
    if (!hasFlyouts) {
      return null;
    }

    // Thresholds to prevent thrashing near the breakpoint.
    const THRESHOLD_TO_SIDE_BY_SIDE = 85;
    const THRESHOLD_TO_STACKED = 95;

    // If the window is too small, set the mode to stacked.
    //
    // The value is based on the maximum width of a flyout in
    // `composeFlyoutSizing` in `flyout.styles.ts` multiplied
    // by 2 (open flyouts side-by-side).
    if (windowWidth < Math.round(euiTheme.breakpoint.s * 1.4)) {
      return LAYOUT_MODE_STACKED;
    }

    if (!childFlyoutId) {
      return LAYOUT_MODE_SIDE_BY_SIDE;
    }

    let parentWidthValue = parentWidth;
    let childWidthValue = childWidth;

    if (!parentWidthValue && parentFlyout?.size) {
      parentWidthValue = getWidthFromSize(parentFlyout.size);
    }

    if (!childWidthValue && childFlyout?.size) {
      childWidthValue = getWidthFromSize(childFlyout.size);
    }

    if (!parentWidthValue || !childWidthValue) {
      return LAYOUT_MODE_SIDE_BY_SIDE;
    }

    const combinedWidth = parentWidthValue + childWidthValue;
    const combinedWidthPercentage = (combinedWidth / windowWidth) * 100;

    // Handle fill size flyouts: keep layout as side-by-side when fill flyout is present
    // This allows fill flyouts to dynamically calculate their width based on the other in the pair
    if (parentFlyout?.size === 'fill' || childFlyout?.size === 'fill') {
      // For fill flyouts, we want to maintain side-by-side layout to enable dynamic width calculation
      // Only stack if the viewport is too small (below the small breakpoint)
      if (windowWidth >= Math.round(euiTheme.breakpoint.s * 1.4)) {
        return LAYOUT_MODE_SIDE_BY_SIDE;
      }
    }

    if (currentLayoutMode === LAYOUT_MODE_STACKED) {
      return combinedWidthPercentage <= THRESHOLD_TO_SIDE_BY_SIDE
        ? LAYOUT_MODE_SIDE_BY_SIDE
        : LAYOUT_MODE_STACKED;
    } else {
      return combinedWidthPercentage >= THRESHOLD_TO_STACKED
        ? LAYOUT_MODE_STACKED
        : LAYOUT_MODE_SIDE_BY_SIDE;
    }
  }, [
    hasFlyouts,
    windowWidth,
    euiTheme,
    childFlyoutId,
    parentWidth,
    childWidth,
    parentFlyout?.size,
    childFlyout?.size,
    currentLayoutMode,
  ]);

  // Apply the desired layout mode
  useEffect(() => {
    if (desiredLayoutMode && currentLayoutMode !== desiredLayoutMode) {
      setMode(desiredLayoutMode);
    }
  }, [desiredLayoutMode, currentLayoutMode, setMode]);
};

/** Convert a flyout `size` value to a pixel width using theme breakpoints. */
export const getWidthFromSize = (size: string | number): number => {
  if (typeof size === 'number') {
    return size;
  }

  if (typeof size === 'string') {
    const parsed = parseInt(size, 10);

    if (!Number.isNaN(parsed)) {
      return parsed;
    }

    // Size is a function of a percentage of `vw`, defined in `composeFlyoutSizing` in `flyout.styles.ts`
    switch (size) {
      case 's':
        return Math.round(window.innerWidth * 0.25);
      case 'm':
        return Math.round(window.innerWidth * 0.5);
      case 'l':
        return Math.round(window.innerWidth * 0.75);
      case 'fill':
        return Math.round(window.innerWidth * 0.9);
      default:
        break;
    }
  }
  return 0;
};

/** Current layout mode for managed flyouts (`side-by-side` or `stacked`). */
export const useFlyoutLayoutMode = () => {
  const context = useFlyoutManager();
  return context?.state?.layoutMode || LAYOUT_MODE_SIDE_BY_SIDE;
};
