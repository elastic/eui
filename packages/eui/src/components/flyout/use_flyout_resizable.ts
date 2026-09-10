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
      const measuredWidth = getFlyoutMinMaxWidth(flyoutRef.offsetWidth);
      requestedWidthRef.current ??= measuredWidth;
      setFlyoutWidth(measuredWidth);
    }
  }, [flyoutWidth, flyoutRef, getFlyoutMinMaxWidth, enabled]);

  // Track the previous `_size` prop to distinguish between a consumer size
  // change (which should reset the width) and a reference-width / constraint
  // change (which should re-clamp the existing width).
  // Initialized to `null` so the first render always takes the "reset" path.
  const prevSizeRef = useRef<string | number | null>(null);

  // Track the previous reference width so we can detect container / viewport
  // resizes, and scale proportionally for named (percentage) sizes.
  const prevReferenceWidthRef = useRef(_referenceWidth);

  // Set when the pending width change came from a container / viewport resize
  // rather than from the user. `setCallOnResize(false)` alone cannot suppress
  // the `onResize` effect below, because that effect can re-run in the *same*
  // render the resize arrives in (e.g. a parent rerender also hands down a new
  // inline `onResize`) and would still read the pre-update `callOnResize`.
  // A ref is written synchronously by the effect below, which is declared
  // before the `onResize` effect and so always runs first within a commit.
  // Cleared by the user interaction handlers — the only callers that set
  // `callOnResize` back to `true`.
  const isContainerResizeRef = useRef(false);

  // The pixel width last *asked for* — by the consumer via a numeric `size`, or
  // by the user via a drag / keyboard resize. This is deliberately kept apart
  // from `flyoutWidth`, which is that request clamped to the space currently
  // available. Re-clamping the already-clamped `flyoutWidth` would be lossy:
  // shrinking the container past the request and growing it back would leave
  // the flyout stuck at the shrunken width instead of returning to the request.
  const requestedWidthRef = useRef<number | null>(null);

  // Update flyout width when consumers pass in a new `size`, or re-clamp
  // (numeric `size`) / scale proportionally and re-clamp (named `size`) when
  // constraints change (e.g. container resize, sibling width change).
  useEffect(() => {
    if (!enabled) return; // Don't update width when resizing is disabled

    if (prevSizeRef.current !== _size) {
      // The consumer's `size` prop actually changed — reset so the new size takes effect
      prevSizeRef.current = _size;
      prevReferenceWidthRef.current = _referenceWidth;
      requestedWidthRef.current = typeof _size === 'number' ? _size : null;
      setCallOnResize(false);
      setFlyoutWidth(
        typeof _size === 'number' ? getFlyoutMinMaxWidth(_size) : 0
      );
    } else {
      // Only constraints changed (referenceWidth, sibling width, etc.).
      // How the current pixel width is updated depends on the `size` contract:
      // named sizes are percentages, so they scale proportionally with the
      // reference width; numeric sizes are pixels, so they are only re-clamped.
      const prevRefWidth = prevReferenceWidthRef.current ?? _referenceWidth;
      prevReferenceWidthRef.current = _referenceWidth;

      if (_referenceWidth !== prevRefWidth) {
        // A container resize is not a user resize
        isContainerResizeRef.current = true;
        setCallOnResize(false);
      }

      setFlyoutWidth((currentWidth) => {
        if (currentWidth && prevRefWidth > 0 && _referenceWidth > 0) {
          // A numeric `size` is a pixel contract — the consumer supplied an
          // exact width and may persist it — so re-clamp the requested width
          // rather than rescaling. Clamping is applied to the request, never to
          // the previous result, so the flyout returns to the requested width
          // once there is room for it again. Named sizes are percentages (see
          // `flyout.styles.ts`) and keep scaling, preserving their percentage
          // position in both directions (reference width shrink AND grow).
          if (typeof _size === 'number') {
            return getFlyoutMinMaxWidth(requestedWidthRef.current ?? _size);
          }
          const scaleFactor = _referenceWidth / prevRefWidth;
          return getFlyoutMinMaxWidth(currentWidth * scaleFactor);
        }
        // When reference width was 0 (e.g. container not yet measured), now
        // that we have a real width, reset from the size prop instead of scaling.
        if (_referenceWidth > 0) {
          requestedWidthRef.current = typeof _size === 'number' ? _size : null;
          return typeof _size === 'number' ? getFlyoutMinMaxWidth(_size) : 0;
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

      // The dragged width becomes the new request — the user cannot drag past
      // the clamp, so what they see is what they asked for
      const newWidth = getFlyoutMinMaxWidth(changedFlyoutWidth);
      requestedWidthRef.current = newWidth;
      setFlyoutWidth(newWidth);
    },
    [getFlyoutMinMaxWidth, direction, enabled]
  );

  const onMouseUp = useCallback(() => {
    isContainerResizeRef.current = false;
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
      isContainerResizeRef.current = false;
      setCallOnResize(true);

      if (!enabled) {
        return;
      }

      const KEYBOARD_OFFSET = 10;

      // Steps from the currently rendered width, and the result becomes the new
      // request. Assigning the ref from the updater keeps it in step with the
      // width actually committed; the computation is idempotent, so a
      // double-invoked updater (StrictMode) resolves to the same value.
      const resizeBy = (offset: number) =>
        setFlyoutWidth((flyoutWidth) => {
          const newWidth = getFlyoutMinMaxWidth(flyoutWidth + offset);
          requestedWidthRef.current = newWidth;
          return newWidth;
        });

      switch (e.key) {
        case keys.ARROW_RIGHT:
          e.preventDefault(); // Safari+VO will screen reader navigate off the button otherwise
          resizeBy(KEYBOARD_OFFSET * direction);
          break;
        case keys.ARROW_LEFT:
          e.preventDefault(); // Safari+VO will screen reader navigate off the button otherwise
          resizeBy(-KEYBOARD_OFFSET * direction);
      }
    },
    [getFlyoutMinMaxWidth, direction, enabled]
  );

  // To reduce unnecessary calls, only fire onResize callback:
  // 1. After initial mount / on user width change events only
  // 2. If not currently mouse dragging
  // 3. Not for container / viewport driven resizes (see `isContainerResizeRef`)
  useEffect(() => {
    if (isContainerResizeRef.current) return;
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
