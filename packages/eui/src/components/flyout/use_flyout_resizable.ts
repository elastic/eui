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
  useMemo,
  useRef,
  useState,
} from 'react';
import { keys } from '../../services';
import { getPosition } from '../resizable_container/helpers';
import type { EuiFlyoutResizableProps } from './flyout_resizable';

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
}: UseEuiFlyoutResizable) => {
  // Use container width when provided. When referenceWidth is 0 (e.g. container
  // not yet measured by ResizeObserver), do not fall back to viewport — that
  // would allow resizing beyond the container (e.g. over a sidebar). Use 0 so
  // the clamp keeps the flyout at minWidth until the real width is available.
  const _referenceWidth =
    referenceWidth !== undefined
      ? referenceWidth
      : typeof window !== 'undefined'
        ? window.innerWidth
        : Infinity;

  if (process.env.NODE_ENV === 'development' && enabled) {
    // eslint-disable-next-line no-console
    console.log('[EuiFlyout resize debug] useEuiFlyoutResizable', {
      referenceWidthIn: referenceWidth,
      _referenceWidth,
      usedViewportFallback: referenceWidth === undefined,
    });
  }

  const getFlyoutMinMaxWidth = useCallback(
    (width: number) => {
      const maxResizeWidth = siblingFlyoutWidth
        ? _referenceWidth * 0.9 - siblingFlyoutWidth
        : _referenceWidth * 0.9;

      // Clamp between minWidth and the maximum allowed width.
      // minWidth always takes precedence — if the available space
      // (maxResizeWidth) is smaller than minWidth, the flyout stays
      // at minWidth. The fill sibling's CSS will adjust accordingly.
      const upperBound = Math.min(maxWidth || Infinity, maxResizeWidth);
      return Math.max(minWidth, Math.min(width, upperBound));
    },
    [minWidth, maxWidth, siblingFlyoutWidth, _referenceWidth]
  );

  const [flyoutWidth, setFlyoutWidth] = useState(0);
  const [callOnResize, setCallOnResize] = useState(false);

  // Must use state for the flyout ref in order for the useEffect to be correctly called after render
  const [flyoutRef, setFlyoutRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return; // Don't measure when resizing is disabled
    if (!flyoutWidth && flyoutRef) {
      setCallOnResize(false); // Don't call `onResize` for non-user width changes
      setFlyoutWidth(getFlyoutMinMaxWidth(flyoutRef.offsetWidth));
    }
  }, [flyoutWidth, flyoutRef, getFlyoutMinMaxWidth, enabled]);

  // Track the previous `_size` prop to distinguish between a consumer size
  // change (which should reset the width) and a reference-width / constraint
  // change (which should re-clamp the existing width).
  // Initialized to `null` so the first render always takes the "reset" path.
  const prevSizeRef = useRef<string | number | null>(null);

  // Track the previous reference width so we can scale proportionally when
  // the container / viewport resizes (both shrink AND grow).
  const prevReferenceWidthRef = useRef(_referenceWidth);

  // Update flyout width when consumers pass in a new `size`, or scale
  // proportionally and re-clamp when constraints change (e.g. container
  // resize, sibling width change).
  useEffect(() => {
    if (!enabled) return; // Don't update width when resizing is disabled

    if (prevSizeRef.current !== _size) {
      // The consumer's `size` prop actually changed — reset so the new size takes effect
      prevSizeRef.current = _size;
      prevReferenceWidthRef.current = _referenceWidth;
      setCallOnResize(false);
      setFlyoutWidth(
        typeof _size === 'number' ? getFlyoutMinMaxWidth(_size) : 0
      );
    } else {
      // Only constraints changed (referenceWidth, sibling width, etc.) —
      // scale the pixel width proportionally to the reference width change
      // and then clamp. This preserves the flyout's percentage position in
      // both directions (viewport shrink AND grow).
      const prevRefWidth = prevReferenceWidthRef.current ?? _referenceWidth;
      prevReferenceWidthRef.current = _referenceWidth;

      setFlyoutWidth((currentWidth) => {
        if (currentWidth && prevRefWidth > 0 && _referenceWidth > 0) {
          const scaleFactor = _referenceWidth / prevRefWidth;
          return getFlyoutMinMaxWidth(currentWidth * scaleFactor);
        }
        // When reference width was 0 (e.g. container not yet measured), now
        // that we have a real width, reset from the size prop instead of scaling.
        if (_referenceWidth > 0) {
          return typeof _size === 'number'
            ? getFlyoutMinMaxWidth(_size)
            : 0;
        }
        return currentWidth;
      });
    }
  }, [_size, getFlyoutMinMaxWidth, enabled, _referenceWidth]);

  // Initial numbers to calculate from, on resize drag start
  const initialWidth = useRef(0);
  const initialMouseX = useRef(0);

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

      setFlyoutWidth(getFlyoutMinMaxWidth(changedFlyoutWidth));
    },
    [getFlyoutMinMaxWidth, direction, enabled]
  );

  const onMouseUp = useCallback(() => {
    setCallOnResize(true);

    if (!enabled) {
      return;
    }

    initialMouseX.current = 0;

    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('touchmove', onMouseMove);
    window.removeEventListener('touchend', onMouseUp);
  }, [onMouseMove, enabled]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setCallOnResize(false);

      if (!enabled) {
        return;
      }

      initialMouseX.current = getPosition(e, true);
      initialWidth.current = flyoutRef?.offsetWidth ?? 0;

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
      setCallOnResize(true);

      if (!enabled) {
        return;
      }

      const KEYBOARD_OFFSET = 10;

      switch (e.key) {
        case keys.ARROW_RIGHT:
          e.preventDefault(); // Safari+VO will screen reader navigate off the button otherwise
          setFlyoutWidth((flyoutWidth) =>
            getFlyoutMinMaxWidth(flyoutWidth + KEYBOARD_OFFSET * direction)
          );
          break;
        case keys.ARROW_LEFT:
          e.preventDefault(); // Safari+VO will screen reader navigate off the button otherwise
          setFlyoutWidth((flyoutWidth) =>
            getFlyoutMinMaxWidth(flyoutWidth - KEYBOARD_OFFSET * direction)
          );
      }
    },
    [getFlyoutMinMaxWidth, direction, enabled]
  );

  // To reduce unnecessary calls, only fire onResize callback:
  // 1. After initial mount / on user width change events only
  // 2. If not currently mouse dragging
  useEffect(() => {
    if (callOnResize && enabled) {
      onResize?.(flyoutWidth);
    }
  }, [onResize, callOnResize, flyoutWidth, enabled]);

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
