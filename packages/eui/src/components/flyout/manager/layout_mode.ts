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

  // Get the flyout offset from CSS variable to account for viewport constraints (e.g., sidebar)
  const flyoutOffset =
    typeof window !== 'undefined'
      ? (() => {
          const offsetValue = getComputedStyle(document.documentElement)
            .getPropertyValue('--eui-flyout-offset')
            .trim();
          const offset = offsetValue ? parseInt(offsetValue, 10) : 0;
          return isNaN(offset) ? 0 : offset;
        })()
      : 0;

  // Calculate effective viewport width (accounting for sidebar offset)
  const effectiveViewportWidth = windowWidth - flyoutOffset;

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

    // Single threshold for layout mode switching
    const LAYOUT_MODE_THRESHOLD = 90;

    // If the effective viewport is too small, set the mode to stacked.
    // The value is based on the maximum width of a flyout in
    // `composeFlyoutSizing` in `flyout.styles.ts` multiplied
    // by 2 (open flyouts side-by-side).
    // Use effectiveViewportWidth to account for sidebar offset.
    if (effectiveViewportWidth < Math.round(euiTheme.breakpoint.s * 1.4)) {
      return LAYOUT_MODE_STACKED;
    }

    if (!childFlyoutId) {
      return LAYOUT_MODE_SIDE_BY_SIDE;
    }

    // IMPORTANT: Calculate widths based on size configuration rather than measured widths.
    // This avoids a circular dependency where:
    // - Measured widths depend on current layout mode (flyouts may be wider in stacked mode)
    // - Layout mode decisions depend on width calculations
    // - Result: Can get stuck in stacked mode even when viewport increases
    //
    // By calculating from size first, we get deterministic widths independent of layout mode.
    // Note: Use full windowWidth for size calculation (matches CSS vw units),
    // but use effectiveViewportWidth for fit percentage calculation.
    let parentWidthValue = 0;
    let childWidthValue = 0;

    if (parentFlyout?.size) {
      // Use windowWidth to match CSS vw-based sizing
      parentWidthValue = getWidthFromSize(parentFlyout.size, windowWidth);
    }

    if (childFlyout?.size) {
      // Use windowWidth to match CSS vw-based sizing
      childWidthValue = getWidthFromSize(childFlyout.size, windowWidth);
    }

    // Fall back to measured widths only if size is not available (rare edge case)
    if (!parentWidthValue && parentWidth) {
      parentWidthValue = parentWidth;
    }

    if (!childWidthValue && childWidth) {
      childWidthValue = childWidth;
    }

    if (!parentWidthValue || !childWidthValue) {
      return LAYOUT_MODE_SIDE_BY_SIDE;
    }

    const combinedWidth = parentWidthValue + childWidthValue;
    const combinedWidthPercentage =
      (combinedWidth / effectiveViewportWidth) * 100;

    // Handle fill size flyouts: keep layout as side-by-side when fill flyout is present
    // This allows fill flyouts to dynamically calculate their width based on the other in the pair
    if (parentFlyout?.size === 'fill' || childFlyout?.size === 'fill') {
      // For fill flyouts, we want to maintain side-by-side layout to enable dynamic width calculation
      // Only stack if the effective viewport is too small (below the small breakpoint)
      if (effectiveViewportWidth >= Math.round(euiTheme.breakpoint.s * 1.4)) {
        return LAYOUT_MODE_SIDE_BY_SIDE;
      }
    }

    // Switch to stacked mode if combined width exceeds threshold
    return combinedWidthPercentage > LAYOUT_MODE_THRESHOLD
      ? LAYOUT_MODE_STACKED
      : LAYOUT_MODE_SIDE_BY_SIDE;
  }, [
    hasFlyouts,
    windowWidth,
    effectiveViewportWidth,
    euiTheme,
    childFlyoutId,
    parentWidth,
    childWidth,
    parentFlyout?.size,
    childFlyout?.size,
  ]);

  // Apply the desired layout mode
  useEffect(() => {
    if (desiredLayoutMode && currentLayoutMode !== desiredLayoutMode) {
      setMode(desiredLayoutMode);
    }
  }, [desiredLayoutMode, currentLayoutMode, setMode]);
};

/**
 * Convert a flyout `size` value to a pixel width using theme breakpoints.
 * @param size - The size value (s, m, l, fill, or a number/string pixel value)
 * @param effectiveWidth - The effective viewport width (accounting for sidebar offset). Defaults to window.innerWidth.
 */
export const getWidthFromSize = (
  size: string | number,
  effectiveWidth?: number
): number => {
  if (typeof size === 'number') {
    return size;
  }

  if (typeof size === 'string') {
    const parsed = parseInt(size, 10);

    if (!Number.isNaN(parsed)) {
      return parsed;
    }

    // Use effective width if provided, otherwise fall back to window.innerWidth
    const baseWidth =
      effectiveWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 0);

    // Size is a function of a percentage of viewport width,
    // defined in `composeFlyoutSizing` in `flyout.styles.ts`
    switch (size) {
      case 's':
        return Math.round(baseWidth * 0.25);
      case 'm':
        return Math.round(baseWidth * 0.5);
      case 'l':
        return Math.round(baseWidth * 0.75);
      case 'fill':
        return Math.round(baseWidth * 0.9);
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
