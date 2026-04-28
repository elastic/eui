/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  CSSProperties,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { FocusOn } from 'react-focus-on';
import { ReactFocusOnProps } from 'react-focus-on/dist/es5/types';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

import {
  findElementBySelectorOrRef,
  ElementTarget,
  useUpdateEffect,
} from '../../services';
import { CommonProps } from '../common';
import { usePropsWithComponentDefaults } from '../provider/component_defaults';

export type FocusTarget = ElementTarget;

export type EuiFocusTrapProps = Omit<
  ReactFocusOnProps,
  // Inverted `disabled` prop used instead
  | 'enabled'
  // Omitted so that our props table & storybook actually register these props
  | 'style'
  | 'className'
  | 'css'
  // Props that differ from react-focus-on's default settings
  | 'gapMode'
  | 'crossFrame'
  | 'scrollLock'
  | 'noIsolation'
  | 'returnFocus'
> & {
  // For some reason, Storybook doesn't register these props if they're Pick<>'d
  className?: CommonProps['className'];
  css?: CommonProps['css'];
  style?: CSSProperties;
  /**
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether `onClickOutside` should be called on mouseup instead of mousedown.
   * This flag can be used to prevent conflicts with outside toggle buttons by delaying the closing click callback.
   */
  closeOnMouseup?: boolean;
  /**
   * Clicking outside the trap area will disable the trap
   * @default false
   */
  clickOutsideDisables?: boolean;
  /**
   * Reference to element that will get focus when the trap is initiated
   */
  initialFocus?: FocusTarget;
  /**
   * if `scrollLock` is set to true, the body's scrollbar width will be preserved on lock
   * via the `gapMode` CSS property. Depending on your custom CSS, you may prefer to use
   * `margin` instead of `padding`.
   * @default padding
   */
  gapMode?: 'padding' | 'margin';
  /**
   * Configures focus trapping between iframes.
   * By default, EuiFocusTrap allows focus to leave iframes and move to elements outside of it.
   * Set to `true` if you want focus to remain trapped within the iframe.
   * @default false
   */
  crossFrame?: ReactFocusOnProps['crossFrame'];
  /**
   * @default false
   */
  scrollLock?: ReactFocusOnProps['scrollLock'];
  /**
   * @default true
   */
  noIsolation?: ReactFocusOnProps['noIsolation'];
  /**
   * @default true
   */
  returnFocus?: ReactFocusOnProps['returnFocus'];
};

export const EuiFocusTrap: FunctionComponent<EuiFocusTrapProps> = (_props) => {
  const props = usePropsWithComponentDefaults('EuiFocusTrap', _props);
  const {
    children,
    disabled,
    clickOutsideDisables = false,
    returnFocus = true,
    noIsolation = true,
    crossFrame = false,
    scrollLock = false,
    initialFocus,
    gapMode = 'padding',
    closeOnMouseup,
    onClickOutside,
    ...rest
  } = props;
  const [hasBeenDisabledByClick, setHasBeenDisabledByClick] = useState(false);

  const isDisabled = disabled || hasBeenDisabledByClick;

  // Programmatically sets focus on a nested DOM node; optional
  const setInitialFocus = (initialFocus?: FocusTarget) => {
    if (!initialFocus) return;

    const node = findElementBySelectorOrRef(initialFocus);

    if (!node) return;
    // `data-autofocus` is part of the 'react-focus-on' API
    node.setAttribute('data-autofocus', 'true');
  };

  // Stabilize the onClickOutside callback
  const onClickOutsideRef = useRef(onClickOutside);
  onClickOutsideRef.current = onClickOutside;

  // We use a ref to store the listener to prevent circular dependencies
  // while still ensuring the listeners can properly be cleaned up
  const mouseupListenerRef = useRef<
    ((e: MouseEvent | TouchEvent) => void) | null
  >(null);

  const removeMouseupListener = useCallback(() => {
    if (mouseupListenerRef.current) {
      document.removeEventListener('mouseup', mouseupListenerRef.current);
      document.removeEventListener('touchend', mouseupListenerRef.current);
      mouseupListenerRef.current = null;
    }
  }, []);

  const addMouseupListener = useCallback(() => {
    removeMouseupListener();

    mouseupListenerRef.current = (e: MouseEvent | TouchEvent) => {
      removeMouseupListener();
      // Timeout gives precedence to the consumer to initiate close if it has toggle behavior.
      // Otherwise this event may occur first and the consumer toggle will reopen the flyout.
      setTimeout(() => onClickOutsideRef.current?.(e));
    };
    document.addEventListener('mouseup', mouseupListenerRef.current);
    document.addEventListener('touchend', mouseupListenerRef.current);
  }, [removeMouseupListener]);

  const handleOutsideClick = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (clickOutsideDisables) {
        setHasBeenDisabledByClick(true);
      }

      if (onClickOutside) {
        closeOnMouseup ? addMouseupListener() : onClickOutside(event);
      }
    },
    [clickOutsideDisables, closeOnMouseup, onClickOutside, addMouseupListener]
  );

  useEffect(() => {
    setInitialFocus(initialFocus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateEffect(() => {
    if (!disabled) {
      setHasBeenDisabledByClick(false);
    }
  }, [disabled]);

  // listener cleanup on unmount
  useEffect(() => () => removeMouseupListener(), [removeMouseupListener]);

  const focusOnProps = {
    returnFocus,
    noIsolation,
    initialFocus,
    crossFrame,
    enabled: !isDisabled,
    ...rest,
    onClickOutside: handleOutsideClick,
    /**
     * `scrollLock` should always be unset on FocusOn, as it can prevent scrolling on
     * portals (i.e. popovers, comboboxes, dropdown menus, etc.) within modals & flyouts
     * @see https://github.com/theKashey/react-focus-on/issues/49
     */
    scrollLock: false,
  };

  return (
    <FocusOn {...focusOnProps}>
      {children}
      {!isDisabled && scrollLock && <RemoveScrollBar gapMode={gapMode} />}
    </FocusOn>
  );
};
