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
  size: string | number;
};

/**
 * @internal
 */
export const useEuiFlyoutResizable = ({
  enabled,
  minWidth = 0,
  maxWidth,
  onResize,
  side,
  size: _size,
}: UseEuiFlyoutResizable) => {
  const getFlyoutMinMaxWidth = useCallback(
    (width: number) => {
      return Math.min(
        Math.max(width, minWidth),
        maxWidth || Infinity,
        window.innerWidth - 20 // Leave some offset
      );
    },
    [minWidth, maxWidth]
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

  // Update flyout width when consumers pass in a new `size`
  useEffect(() => {
    if (!enabled) return; // Don't update width when resizing is disabled
    setCallOnResize(false);
    // For string `size`s, resetting flyoutWidth to 0 will trigger the above useEffect's recalculation
    setFlyoutWidth(typeof _size === 'number' ? getFlyoutMinMaxWidth(_size) : 0);
  }, [_size, getFlyoutMinMaxWidth, enabled]);

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

  const size = useMemo(
    () => (enabled ? flyoutWidth || _size : _size),
    [enabled, flyoutWidth, _size]
  );

  return {
    onKeyDown,
    onMouseDown,
    setFlyoutRef,
    size,
  };
};
