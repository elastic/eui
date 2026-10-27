/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { keys, useLatest } from '../../services';
import { getPosition } from '../resizable_container/helpers';
import type { EuiFlyoutResizableProps } from './flyout_resizable';
import { getWidthFromSize } from './manager/layout_mode';

// The share of the reference width a flyout and its sibling may fill together
const MAX_COMBINED_WIDTH_RATIO = 0.9;

type UseEuiFlyoutResizable = Pick<
  EuiFlyoutResizableProps,
  'onResize' | 'side'
> & {
  enabled: boolean;
  minWidth?: number;
  maxWidth: number | undefined;
  siblingFlyoutWidth?: number | null;
  referenceWidth?: number;
  size: string | number;
  /**
   * The ID of the child flyout open beside this main flyout. When a new child
   * doesn't fit beside a width wider than `size`, the width resets to `size`.
   */
  childFlyoutId?: string | null;
  /** The `size` of the child flyout open beside this main flyout. */
  childFlyoutSize?: string;
  /** Whether the flyouts are in stacked layout mode. */
  isStacked?: boolean;
  /**
   * Called with the pixel width applied by a reset to `size`, before paint.
   */
  onWidthReset?: (width: number) => void;
};

/**
 * @internal
 */
export const useEuiFlyoutResizable = ({
  enabled,
  minWidth = 0,
  maxWidth,
  siblingFlyoutWidth,
  referenceWidth,
  onResize,
  side,
  size: _size,
  childFlyoutId,
  childFlyoutSize,
  isStacked = false,
  onWidthReset,
}: UseEuiFlyoutResizable) => {
  // Without a `referenceWidth` (standalone flyouts), nothing else re-renders
  // the flyout on window resize, so track the viewport width here
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : Infinity
  );
  const tracksWindow = enabled && referenceWidth === undefined;
  useEffect(() => {
    if (!tracksWindow) return;

    let rafId = 0;
    const onWindowResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setWindowWidth(window.innerWidth));
    };
    // Catch up on resizes that happened while the window was not tracked
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onWindowResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [tracksWindow]);

  // Use container width when provided. When referenceWidth is 0 (e.g. container
  // not yet measured by ResizeObserver), do not fall back to viewport — that
  // would allow resizing beyond the container (e.g. over a sidebar). Use 0 so
  // the clamp keeps the flyout at minWidth until the real width is available.
  const _referenceWidth =
    referenceWidth !== undefined ? referenceWidth : windowWidth;

  const getFlyoutMinMaxWidth = useCallback(
    (width: number) => {
      const maxResizeWidth = siblingFlyoutWidth
        ? _referenceWidth * MAX_COMBINED_WIDTH_RATIO - siblingFlyoutWidth
        : _referenceWidth * MAX_COMBINED_WIDTH_RATIO;

      // Clamp between minWidth and the maximum allowed width.
      // minWidth always takes precedence — if the available space
      // (maxResizeWidth) is smaller than minWidth, the flyout stays
      // at minWidth. The fill sibling's CSS will adjust accordingly.
      const upperBound = Math.min(maxWidth || Infinity, maxResizeWidth);
      return Math.max(minWidth, Math.min(width, upperBound));
    },
    [minWidth, maxWidth, siblingFlyoutWidth, _referenceWidth]
  );

  const [flyoutWidth, _setFlyoutWidth] = useState(0);

  // The last width set, even before it renders. Handlers read it instead of
  // `flyoutWidth`, which is stale until then (e.g. a key press right after
  // mount, before the width from `size` has rendered).
  const flyoutWidthRef = useRef(0);
  const setFlyoutWidth = useCallback((width: number) => {
    flyoutWidthRef.current = width;
    _setFlyoutWidth(width);
  }, []);

  // Must use state for the flyout ref in order for the useEffect to be correctly called after render
  const [flyoutRef, setFlyoutRef] = useState<HTMLElement | null>(null);

  const onResizeRef = useLatest(onResize);

  useEffect(() => {
    if (!enabled) return; // Don't measure when resizing is disabled
    if (!flyoutWidth && flyoutRef) {
      setFlyoutWidth(getFlyoutMinMaxWidth(flyoutRef.offsetWidth));
    }
  }, [flyoutWidth, flyoutRef, getFlyoutMinMaxWidth, enabled, setFlyoutWidth]);

  // Track the previous `_size` prop to distinguish between a consumer size
  // change (which should reset the width) and a reference-width / constraint
  // change (which should re-clamp the existing width).
  // Initialized to `null` so the first render always takes the "reset" path.
  const prevSizeRef = useRef<string | number | null>(null);

  // Track the previous reference width so we can scale proportionally when
  // the container / viewport resizes (both shrink AND grow).
  const prevReferenceWidthRef = useRef(_referenceWidth);

  // The width last set by a numeric `size` or by the user, before clamping.
  // Clamping always starts from it, so a flyout squeezed by a narrow container
  // returns to this width once there is room again.
  const requestedWidthRef = useRef<number | null>(null);

  // Update flyout width when consumers pass in a new `size`, or re-clamp
  // when constraints change (e.g. container resize, sibling width change).
  useEffect(() => {
    if (!enabled) return; // Don't update width when resizing is disabled

    if (prevSizeRef.current !== _size) {
      // The consumer's `size` prop actually changed — reset so the new size takes effect
      prevSizeRef.current = _size;
      prevReferenceWidthRef.current = _referenceWidth;
      requestedWidthRef.current = typeof _size === 'number' ? _size : null;
      setFlyoutWidth(
        typeof _size === 'number' ? getFlyoutMinMaxWidth(_size) : 0
      );
    } else if (typeof _size === 'number') {
      // A numeric `size` is a pixel width, so it is only re-clamped, not scaled
      if (_referenceWidth > 0) {
        setFlyoutWidth(
          getFlyoutMinMaxWidth(requestedWidthRef.current ?? _size)
        );
      }
    } else {
      // Named sizes are percentages — scale the pixel width proportionally to
      // the reference width change and then clamp. This preserves the flyout's
      // percentage position in both directions (viewport shrink AND grow).
      const prevRefWidth = prevReferenceWidthRef.current ?? _referenceWidth;
      prevReferenceWidthRef.current = _referenceWidth;

      const currentWidth = flyoutWidthRef.current;
      if (currentWidth && prevRefWidth > 0 && _referenceWidth > 0) {
        const scaleFactor = _referenceWidth / prevRefWidth;
        setFlyoutWidth(getFlyoutMinMaxWidth(currentWidth * scaleFactor));
      } else if (_referenceWidth > 0) {
        // When reference width was 0 (e.g. container not yet measured), now
        // that we have a real width, reset from the size prop instead of scaling.
        setFlyoutWidth(0);
      }
    }
  }, [_size, getFlyoutMinMaxWidth, enabled, _referenceWidth, setFlyoutWidth]);

  // When a new child opens beside a main flyout dragged wider than its `size`,
  // and the pair doesn't fit, the main flyout resets to `size`. Otherwise the
  // pair would be pushed into stacked layout mode, or the main flyout clamped.
  // This runs before paint and reports the width through `onWidthReset`,
  // because the manager decides the layout mode from the width it has stored,
  // and the `ResizeObserver` that normally updates it only fires after paint.
  // Only `childFlyoutId` and `enabled` are dependencies: running on every
  // reference or sibling width change would discard the user's width.
  const resetInputsRef = useLatest({
    _size,
    _referenceWidth,
    getFlyoutMinMaxWidth,
    childFlyoutSize,
    isStacked,
    onWidthReset,
  });
  useLayoutEffect(() => {
    if (!enabled || !childFlyoutId) return;

    const {
      _size,
      _referenceWidth,
      getFlyoutMinMaxWidth,
      childFlyoutSize,
      isStacked,
      onWidthReset,
    } = resetInputsRef.current!;
    // Without a measured reference width, there is no way to tell whether the
    // child fits
    if (!_referenceWidth) return;
    // Layout mode doesn't depend on the widths of a `fill` pair, or of a pair
    // that is already stacked
    if (isStacked || !childFlyoutSize || childFlyoutSize === 'fill') return;

    // The child isn't measured yet, so estimate it the way layout mode does
    const childWidth = getWidthFromSize(childFlyoutSize, _referenceWidth);
    const currentWidth = flyoutWidthRef.current;
    if (
      Math.round(currentWidth + childWidth) <=
      Math.round(_referenceWidth * MAX_COMBINED_WIDTH_RATIO)
    ) {
      return;
    }

    const width = getFlyoutMinMaxWidth(
      getWidthFromSize(_size, _referenceWidth)
    );
    if (Math.round(currentWidth) <= Math.round(width)) return;

    requestedWidthRef.current = typeof _size === 'number' ? _size : null;
    prevReferenceWidthRef.current = _referenceWidth;
    setFlyoutWidth(width);
    onWidthReset?.(width);
    onResizeRef.current?.(width);
  }, [childFlyoutId, enabled, resetInputsRef, setFlyoutWidth, onResizeRef]);

  // `onResize` is called for user interactions and for the reset to `size`
  // when a new child flyout doesn't fit, never for other width changes caused
  // by the consumer or by layout constraints
  const onUserResize = useCallback(
    (width: number) => {
      requestedWidthRef.current = width;
      onResizeRef.current?.(width);
    },
    [onResizeRef]
  );

  // Initial numbers to calculate from, on resize drag start
  const initialWidth = useRef(0);
  const initialMouseX = useRef(0);
  const drag = useRef({ startWidth: 0, width: 0 });

  // Account for flyout side and logical property direction
  const direction = useMemo(() => {
    let modifier = side === 'right' ? -1 : 1;
    if (flyoutRef) {
      const languageDirection = window.getComputedStyle(flyoutRef).direction;
      if (languageDirection === 'rtl') modifier *= -1;
    }
    return modifier;
  }, [side, flyoutRef]);

  const onMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!enabled) {
        return;
      }

      const mouseOffset = getPosition(e, true) - initialMouseX.current;
      const changedFlyoutWidth = initialWidth.current + mouseOffset * direction;

      drag.current.width = getFlyoutMinMaxWidth(changedFlyoutWidth);
      setFlyoutWidth(drag.current.width);
    },
    [getFlyoutMinMaxWidth, direction, enabled, setFlyoutWidth]
  );

  const onMouseUp = useCallback(() => {
    if (!enabled) {
      return;
    }

    initialMouseX.current = 0;

    // Clicking the handle, or dragging against the clamp, changes nothing
    const { startWidth, width } = drag.current;
    if (width !== startWidth) onUserResize(width);

    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('touchmove', onMouseMove);
    window.removeEventListener('touchend', onMouseUp);
  }, [onMouseMove, onUserResize, enabled]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!enabled) {
        return;
      }

      initialMouseX.current = getPosition(e, true);
      initialWidth.current = flyoutRef?.offsetWidth ?? 0;
      const startWidth = flyoutWidthRef.current;
      drag.current = { startWidth, width: startWidth };

      // Window event listeners instead of React events are used
      // in case the user's mouse leaves the component
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onMouseMove);
      window.addEventListener('touchend', onMouseUp);
    },
    [flyoutRef, onMouseMove, onMouseUp, enabled]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!enabled) {
        return;
      }

      const KEYBOARD_OFFSET = 10;
      let offset: number;

      switch (e.key) {
        case keys.ARROW_RIGHT:
          offset = KEYBOARD_OFFSET * direction;
          break;
        case keys.ARROW_LEFT:
          offset = -KEYBOARD_OFFSET * direction;
          break;
        default:
          return;
      }
      e.preventDefault(); // Safari+VO will screen reader navigate off the button otherwise

      const currentWidth = flyoutWidthRef.current;
      const newWidth = getFlyoutMinMaxWidth(currentWidth + offset);
      if (newWidth === currentWidth) return; // Already at the clamp
      setFlyoutWidth(newWidth);
      onUserResize(newWidth);
    },
    [getFlyoutMinMaxWidth, direction, enabled, onUserResize, setFlyoutWidth]
  );

  const size = useMemo(() => {
    if (enabled && flyoutWidth && _referenceWidth > 0) {
      const pctValue = (flyoutWidth / _referenceWidth) * 100;
      return `${pctValue}%`;
    }
    return _size;
  }, [enabled, flyoutWidth, _referenceWidth, _size]);

  return {
    onKeyDown,
    onMouseDown,
    setFlyoutRef,
    size,
  };
};
