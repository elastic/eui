/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, CSSProperties } from 'react';
import { FocusOn } from 'react-focus-on';
import { ReactFocusOnProps } from 'react-focus-on/dist/es5/types';

import { CommonProps } from '../common';
import { findElementBySelectorOrRef, ElementTarget } from '../../services';

export type FocusTarget = ElementTarget;

interface EuiFocusTrapInterface {
  /**
   * Whether `onClickOutside` should be called on mouseup instead of mousedown.
   * This flag can be used to prevent conflicts with outside toggle buttons by delaying the closing click callback.
   */
  closeOnMouseup?: boolean;
  /**
   * Clicking outside the trap area will disable the trap
   */
  clickOutsideDisables?: boolean;
  /**
   * Reference to element that will get focus when the trap is initiated
   */
  initialFocus?: FocusTarget;
  style?: CSSProperties;
  disabled?: boolean;
}

export interface EuiFocusTrapProps
  extends CommonProps,
    Omit<ReactFocusOnProps, 'enabled'>, // Inverted `disabled` prop used instead
    EuiFocusTrapInterface {}

interface State {
  hasBeenDisabledByClick: boolean;
}

export class EuiFocusTrap extends Component<EuiFocusTrapProps, State> {
  static defaultProps = {
    clickOutsideDisables: false,
    disabled: false,
    returnFocus: true,
    noIsolation: true,
    scrollLock: false,
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
      // eslint-disable-next-line react/no-did-update-set-state
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
      ...rest
    } = this.props;
    const isDisabled = disabled || this.state.hasBeenDisabledByClick;
    const focusOnProps = {
      returnFocus,
      noIsolation,
      scrollLock,
      enabled: !isDisabled,
      ...rest,
      onClickOutside: this.handleOutsideClick,
    };
    return <FocusOn {...focusOnProps}>{children}</FocusOn>;
  }
}
