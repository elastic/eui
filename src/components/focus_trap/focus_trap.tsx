/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component, CSSProperties } from 'react';
import { FocusOn } from 'react-focus-on';
import { ReactFocusOnProps } from 'react-focus-on/dist/es5/types';

import { CommonProps } from '../common';

/**
 * A DOM node, a selector string (which will be passed to
 * `document.querySelector()` to find the DOM node), or a function that
 * returns a DOM node.
 */
export type FocusTarget = HTMLElement | string | (() => HTMLElement);

interface EuiFocusTrapInterface {
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

  // Programmatically sets focus on a nested DOM node; optional
  setInitialFocus = (initialFocus?: FocusTarget) => {
    let node = initialFocus instanceof HTMLElement ? initialFocus : null;
    if (typeof initialFocus === 'string') {
      node = document.querySelector(initialFocus as string);
    } else if (typeof initialFocus === 'function') {
      node = (initialFocus as () => HTMLElement)();
    }
    if (!node) return;
    // `data-autofocus` is part of the 'react-focus-on' API
    node.setAttribute('data-autofocus', 'true');
  };

  handleOutsideClick: ReactFocusOnProps['onClickOutside'] = (...args) => {
    const { onClickOutside, clickOutsideDisables } = this.props;
    if (clickOutsideDisables) {
      this.setState({ hasBeenDisabledByClick: true });
    }

    if (onClickOutside) {
      onClickOutside(...args);
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
