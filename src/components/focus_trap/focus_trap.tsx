/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, FunctionComponent, CSSProperties } from 'react';
import { FocusOn } from 'react-focus-on';
import { ReactFocusOnProps } from 'react-focus-on/dist/es5/types';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

import { CommonProps } from '../common';
import { findElementBySelectorOrRef, ElementTarget } from '../../services';
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

export const EuiFocusTrap: FunctionComponent<EuiFocusTrapProps> = (props) => {
  const propsWithDefaults = usePropsWithComponentDefaults(
    'EuiFocusTrap',
    props
  );
  return <EuiFocusTrapClass {...propsWithDefaults} />;
};

interface State {
  hasBeenDisabledByClick: boolean;
}

class EuiFocusTrapClass extends Component<EuiFocusTrapProps, State> {
  static defaultProps = {
    clickOutsideDisables: false,
    disabled: false,
    returnFocus: true,
    noIsolation: true,
    scrollLock: false,
    crossFrame: false,
    gapMode: 'padding', // EUI defaults to padding because Kibana's body/layout CSS ignores `margin`
  };

  state: State = {
    hasBeenDisabledByClick: false,
  };

  lastInterceptedEvent: Event | null = null;
  preventFocusExit = false;

  componentDidMount() {
    this.setInitialFocus(this.props.initialFocus);
  }

  componentDidUpdate(prevProps: EuiFocusTrapProps) {
    if (prevProps.disabled === true && this.props.disabled === false) {
      this.setState({ hasBeenDisabledByClick: false });
    }
  }

  componentWillUnmount() {
    this.removeMouseupListener();
  }

  // Programmatically sets focus on a nested DOM node; optional
  setInitialFocus = (initialFocus?: FocusTarget) => {
    if (!initialFocus) return;
    const node = findElementBySelectorOrRef(initialFocus);
    if (!node) return;
    // `data-autofocus` is part of the 'react-focus-on' API
    node.setAttribute('data-autofocus', 'true');
  };

  onMouseupOutside = (e: MouseEvent | TouchEvent) => {
    this.removeMouseupListener();
    // Timeout gives precedence to the consumer to initiate close if it has toggle behavior.
    // Otherwise this event may occur first and the consumer toggle will reopen the flyout.
    setTimeout(() => this.props.onClickOutside?.(e));
  };

  addMouseupListener = () => {
    document.addEventListener('mouseup', this.onMouseupOutside);
    document.addEventListener('touchend', this.onMouseupOutside);
  };

  removeMouseupListener = () => {
    document.removeEventListener('mouseup', this.onMouseupOutside);
    document.removeEventListener('touchend', this.onMouseupOutside);
  };

  handleOutsideClick: ReactFocusOnProps['onClickOutside'] = (event) => {
    const { onClickOutside, clickOutsideDisables, closeOnMouseup } = this.props;
    if (clickOutsideDisables) {
      this.setState({ hasBeenDisabledByClick: true });
    }

    if (onClickOutside) {
      closeOnMouseup ? this.addMouseupListener() : onClickOutside(event);
    }
  };

  render() {
    const {
      children,
      clickOutsideDisables,
      disabled,
      returnFocus,
      noIsolation,
      scrollLock,
      gapMode,
      ...rest
    } = this.props;
    const isDisabled = disabled || this.state.hasBeenDisabledByClick;
    const focusOnProps = {
      returnFocus,
      noIsolation,
      enabled: !isDisabled,
      ...rest,
      onClickOutside: this.handleOutsideClick,
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
  }
}
