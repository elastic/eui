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
  useCallback,
} from 'react';

import { keys, useCombinedRefs, useEuiTheme } from '../../services';
import { EuiResizableButton } from '../resizable_container';

import { EuiFlyout, EuiFlyoutProps } from './flyout';
import { euiFlyoutResizableButtonStyles } from './flyout_resizable.styles';

export type EuiFlyoutResizableProps = Omit<EuiFlyoutProps, 'maxWidth'> & {
  maxWidth?: number;
  minWidth?: number;
};

export const EuiFlyoutResizable = forwardRef(
  (
    {
      size,
      maxWidth,
      minWidth = 200,
      children,
      ...rest
    }: EuiFlyoutResizableProps,
    ref
  ) => {
    const euiTheme = useEuiTheme();
    const styles = euiFlyoutResizableButtonStyles(euiTheme);
    const cssStyles = [styles.euiFlyoutResizableButton];

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

    // Must use state for the flyout ref in order for the useEffect to be correctly called after render
    const [flyoutRef, setFlyoutRef] = useState<HTMLElement | null>(null);
    const setRefs = useCombinedRefs([setFlyoutRef, ref]);
    useEffect(() => {
      setFlyoutWidth(
        flyoutRef ? getFlyoutMinMaxWidth(flyoutRef.offsetWidth) : 0
      );
    }, [flyoutRef, getFlyoutMinMaxWidth, size]);

    // Initial numbers to calculate from, on resize drag start
    const initialWidth = useRef(0);
    const initialMouseX = useRef(0);

    const onMouseMove = useCallback(
      (e: MouseEvent | TouchEvent) => {
        const mouseOffset = getMouseOrTouchX(e) - initialMouseX.current;
        const changedFlyoutWidth = initialWidth.current - mouseOffset;

        setFlyoutWidth(getFlyoutMinMaxWidth(changedFlyoutWidth));
      },
      [getFlyoutMinMaxWidth]
    );

    const onMouseUp = useCallback(() => {
      initialMouseX.current = 0;

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    }, [onMouseMove]);

    const onMouseDown = useCallback(
      (e: React.MouseEvent | React.TouchEvent) => {
        initialMouseX.current = getMouseOrTouchX(e);
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
        const KEYBOARD_OFFSET = 10;

        switch (e.key) {
          case keys.ARROW_RIGHT:
            e.preventDefault(); // Safari+VO will screen reader navigate off the button otherwise
            setFlyoutWidth((flyoutWidth) =>
              getFlyoutMinMaxWidth(flyoutWidth - KEYBOARD_OFFSET)
            );
            break;
          case keys.ARROW_LEFT:
            e.preventDefault(); // Safari+VO will screen reader navigate off the button otherwise
            setFlyoutWidth((flyoutWidth) =>
              getFlyoutMinMaxWidth(flyoutWidth + KEYBOARD_OFFSET)
            );
        }
      },
      [getFlyoutMinMaxWidth]
    );

    return (
      <EuiFlyout
        {...rest}
        size={flyoutWidth || size}
        maxWidth={maxWidth}
        ref={setRefs}
      >
        <EuiResizableButton
          isHorizontal
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

const getMouseOrTouchX = (
  e: TouchEvent | MouseEvent | React.MouseEvent | React.TouchEvent
): number => {
  // Some Typescript fooling is needed here
  const x = (e as TouchEvent).targetTouches
    ? (e as TouchEvent).targetTouches[0].pageX
    : (e as MouseEvent).pageX;
  return x;
};
