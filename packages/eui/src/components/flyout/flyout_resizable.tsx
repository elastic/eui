/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';

import { keys, useCombinedRefs, useEuiMemoizedStyles } from '../../services';
import { EuiResizableButton } from '../resizable_container';
import { getPosition } from '../resizable_container/helpers';

import { EuiFlyout, EuiFlyoutProps } from './flyout';
import { euiFlyoutResizableButtonStyles } from './flyout_resizable.styles';

export type EuiFlyoutResizableProps = {
  maxWidth?: number;
  minWidth?: number;
  /**
   * Optional callback that fires on user resize with the new flyout width
   */
  onResize?: (width: number) => void;
} & Omit<EuiFlyoutProps, 'maxWidth' | 'onResize'>; // If not omitted, the correct props don't show up in the docs prop table

export const EuiFlyoutResizable = forwardRef(
  (
    {
      size,
      maxWidth,
      minWidth = 200,
      onResize,
      side = 'right',
      type = 'overlay',
      ownFocus = true,
      children,
      ...rest
    }: EuiFlyoutResizableProps,
    ref
  ) => {
    const hasOverlay = type === 'overlay' && ownFocus;

    const styles = useEuiMemoizedStyles(euiFlyoutResizableButtonStyles);
    const cssStyles = [
      styles.euiFlyoutResizableButton,
      styles[type][side],
      !hasOverlay && styles.noOverlay.noOverlay,
      !hasOverlay && styles.noOverlay[side],
    ];

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
    const setRefs = useCombinedRefs([setFlyoutRef, ref]);

    useEffect(() => {
      if (!flyoutWidth && flyoutRef) {
        setCallOnResize(false); // Don't call `onResize` for non-user width changes
        setFlyoutWidth(getFlyoutMinMaxWidth(flyoutRef.offsetWidth));
      }
    }, [flyoutWidth, flyoutRef, getFlyoutMinMaxWidth]);

    // Update flyout width when consumers pass in a new `size`
    useEffect(() => {
      setCallOnResize(false);
      // For string `size`s, resetting flyoutWidth to 0 will trigger the above useEffect's recalculation
      setFlyoutWidth(typeof size === 'number' ? getFlyoutMinMaxWidth(size) : 0);
    }, [size, getFlyoutMinMaxWidth]);

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
        const mouseOffset = getPosition(e, true) - initialMouseX.current;
        const changedFlyoutWidth =
          initialWidth.current + mouseOffset * direction;

        setFlyoutWidth(getFlyoutMinMaxWidth(changedFlyoutWidth));
      },
      [getFlyoutMinMaxWidth, direction]
    );

    const onMouseUp = useCallback(() => {
      setCallOnResize(true);
      initialMouseX.current = 0;

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    }, [onMouseMove]);

    const onMouseDown = useCallback(
      (e: React.MouseEvent | React.TouchEvent) => {
        setCallOnResize(false);
        initialMouseX.current = getPosition(e, true);
        initialWidth.current = flyoutRef?.offsetWidth ?? 0;

        // Window event listeners instead of React events are used
        // in case the user's mouse leaves the component
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('touchmove', onMouseMove);
        window.addEventListener('touchend', onMouseUp);
      },
      [flyoutRef, onMouseMove, onMouseUp]
    );

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        setCallOnResize(true);
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
      [getFlyoutMinMaxWidth, direction]
    );

    // To reduce unnecessary calls, only fire onResize callback:
    // 1. After initial mount / on user width change events only
    // 2. If not currently mouse dragging
    useEffect(() => {
      if (callOnResize) {
        onResize?.(flyoutWidth);
      }
    }, [onResize, callOnResize, flyoutWidth]);

    return (
      <EuiFlyout
        {...rest}
        size={flyoutWidth || size}
        maxWidth={maxWidth}
        side={side}
        type={type}
        ownFocus={ownFocus}
        ref={setRefs}
      >
        <EuiResizableButton
          isHorizontal
          indicator="border"
          css={cssStyles}
          onMouseDown={onMouseDown}
          onTouchStart={onMouseDown}
          onKeyDown={onKeyDown}
        />
        {children}
      </EuiFlyout>
    );
  }
);
EuiFlyoutResizable.displayName = 'EuiFlyoutResizable';
