/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useEuiTheme } from '../../../services';
import { usePropsWithComponentDefaults } from '../../provider/component_defaults';
import { useResizeObserver } from '../../observer/resize_observer';
import { setLayoutMode } from './actions';
import { useFlyoutManager } from './hooks';
import { LAYOUT_MODE_SIDE_BY_SIDE, LAYOUT_MODE_STACKED } from './const';
import { EuiFlyoutLayoutMode } from './types';

/**
 * Hook to handle responsive layout mode for managed flyouts.
 * Decides whether to place flyouts side-by-side or stacked based on
 * the reference width (container width or viewport width) and flyout widths/sizes.
 */
export const useApplyFlyoutLayoutMode = () => {
  const { euiTheme } = useEuiTheme();
  const context = useFlyoutManager();
  const state = context?.state;

  // Read the container from manager state (set by flyout components when they
  // receive a container prop), falling back to componentDefaults (used when
  // the container is configured globally, e.g. by Kibana).
  const stateContainerElement = state?.containerElement;
  const { container: defaultContainer } = usePropsWithComponentDefaults(
    'EuiFlyout',
    {} as {
      container?: HTMLElement;
    }
  );
  const container = stateContainerElement ?? defaultContainer ?? null;

  // Derive all session/flyout data from the single context read above
  const sessions = state?.sessions;
  const currentSession = sessions
    ? sessions[sessions.length - 1] ?? null
    : null;
  const parentFlyoutId = currentSession?.mainFlyoutId;
  const childFlyoutId = currentSession?.childFlyoutId;

  const parentFlyout = parentFlyoutId
    ? state?.flyouts.find((f) => f.flyoutId === parentFlyoutId) ?? null
    : null;
  const childFlyout = childFlyoutId
    ? state?.flyouts.find((f) => f.flyoutId === childFlyoutId) ?? null
    : null;

  const parentWidth = parentFlyout?.width;
  const childWidth = childFlyout?.width;
  const hasFlyouts = Boolean(parentFlyoutId);

  // Observe the container element's width (returns { width: 0 } when null)
  const containerDimensions = useResizeObserver(container ?? null, 'width');

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : Infinity
  );

  // Use container width when available, otherwise fall back to window width
  const containerWidth = container
    ? containerDimensions.width || container.clientWidth
    : 0;
  const referenceWidth = containerWidth || windowWidth;

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

  // Only listen to window resize when not using a container
  useEffect(() => {
    if (typeof window === 'undefined' || container) {
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
  }, [container]);

  // Calculate the desired layout mode
  const desiredLayoutMode = useMemo(() => {
    // Skip calculation if no flyouts open
    if (!hasFlyouts) {
      return null;
    }

    // Thresholds to prevent thrashing near the breakpoint.
    const THRESHOLD_TO_SIDE_BY_SIDE = 85;
    const THRESHOLD_TO_STACKED = 95;

    // If the reference width is too small, set the mode to stacked.
    //
    // The value is based on the maximum width of a flyout in
    // `composeFlyoutSizing` in `flyout.styles.ts` multiplied
    // by 2 (open flyouts side-by-side).
    if (referenceWidth < Math.round(euiTheme.breakpoint.s * 1.4)) {
      return LAYOUT_MODE_STACKED;
    }

    if (!childFlyoutId) {
      return LAYOUT_MODE_SIDE_BY_SIDE;
    }

    const isFillParent = parentFlyout?.size === 'fill';
    const isFillChild = childFlyout?.size === 'fill';
    const hasFill = isFillParent || isFillChild;

    let parentWidthValue = parentWidth;
    let childWidthValue = childWidth;

    // Resolve unmeasured widths. For fill-size flyouts, estimate as
    // (90% of referenceWidth − sibling width) rather than a flat 90%.
    // This avoids the combined estimate exceeding 90% and incorrectly
    // triggering stacked mode on initial mount.
    if (!parentWidthValue && parentFlyout?.size) {
      if (isFillParent && childWidthValue) {
        parentWidthValue = Math.max(
          0,
          Math.round(referenceWidth * 0.9 - childWidthValue)
        );
      } else {
        parentWidthValue = getWidthFromSize(parentFlyout.size, referenceWidth);
      }
    }

    if (!childWidthValue && childFlyout?.size) {
      if (isFillChild && parentWidthValue) {
        childWidthValue = Math.max(
          0,
          Math.round(referenceWidth * 0.9 - parentWidthValue)
        );
      } else {
        childWidthValue = getWidthFromSize(childFlyout.size, referenceWidth);
      }
    }

    if (!parentWidthValue || !childWidthValue) {
      return LAYOUT_MODE_SIDE_BY_SIDE;
    }

    const combinedWidth = parentWidthValue + childWidthValue;
    const combinedWidthPercentage = (combinedWidth / referenceWidth) * 100;

    // Fill-size flyouts dynamically size to (90% − sibling), making the
    // combined width exactly ~90% in side-by-side mode by CSS construction.
    // This value falls between the hysteresis thresholds (85% return /
    // 95% stack), which makes the standard threshold logic unsuitable:
    //
    // - From side-by-side: 90% < 95%, so it correctly never stacks.
    // - From stacked: measured widths are inflated (fill = 90% without
    //   sibling subtraction), so combined > 85% and it would never
    //   return — an incorrect deadlock.
    //
    // Instead, base the layout decision solely on the reference width
    // threshold. The minimum breakpoint check (line 123) already handles
    // the stacked direction for very small containers.
    if (hasFill) {
      return referenceWidth >= Math.round(euiTheme.breakpoint.s * 1.4)
        ? LAYOUT_MODE_SIDE_BY_SIDE
        : LAYOUT_MODE_STACKED;
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
    referenceWidth,
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

/**
 * Convert a flyout `size` value to a pixel width.
 * When `referenceWidth` is provided, named sizes are calculated as a percentage
 * of that width (container-relative). Otherwise falls back to `window.innerWidth`.
 */
export const getWidthFromSize = (
  size: string | number,
  referenceWidth?: number
): number => {
  if (typeof size === 'number') {
    return size;
  }

  if (typeof size === 'string') {
    const parsed = parseInt(size, 10);

    if (!Number.isNaN(parsed)) {
      return parsed;
    }

    const refWidth =
      referenceWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 0);

    // Size is a function of a percentage of the reference width,
    // matching the proportions defined in `composeFlyoutSizing`
    switch (size) {
      case 's':
        return Math.round(refWidth * 0.25);
      case 'm':
        return Math.round(refWidth * 0.5);
      case 'l':
        return Math.round(refWidth * 0.75);
      case 'fill':
        return Math.round(refWidth * 0.9);
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
