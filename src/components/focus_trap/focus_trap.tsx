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

import React, {
  Component,
  FunctionComponent,
  MouseEvent as ReactMouseEvent,
  EventHandler,
  CSSProperties,
} from 'react';
import FocusLock, { Props as ReactFocusLockProps } from 'react-focus-lock'; // eslint-disable-line import/named

import { CommonProps } from '../common';
import { EuiOutsideClickDetector } from '../outside_click_detector';

interface DetectorProps {
  handleEvent: EventHandler<any>;
}

const OutsideEventDetector: FunctionComponent<DetectorProps> = ({
  children,
  handleEvent,
  ...rest
}) => {
  return (
    <div onMouseDown={handleEvent} onTouchStart={handleEvent} {...rest}>
      {children}
    </div>
  );
};

/**
 * A DOM node, a selector string (which will be passed to
 * `document.querySelector()` to find the DOM node), or a function that
 * returns a DOM node.
 */
export type FocusTarget = HTMLElement | string | (() => HTMLElement);

interface EuiFocusTrapProps {
  clickOutsideDisables?: boolean;
  initialFocus?: FocusTarget;
  style?: CSSProperties;
}

type Props = CommonProps & ReactFocusLockProps & EuiFocusTrapProps;

interface State {
  hasBeenDisabledByClick: boolean;
}

export class EuiFocusTrap extends Component<Props, State> {
  state: State = {
    hasBeenDisabledByClick: false,
  };

  lastInterceptedEvent: Event | null = null;
  preventFocusExit = false;

  componentDidMount() {
    this.setInitialFocus(this.props.initialFocus);
  }

  componentDidUpdate(prevProps: Props) {
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
    // `data-autofocus` is part of the 'react-focus-lock' API
    node.setAttribute('data-autofocus', 'true');
  };

  // Sets whether the focus trap has been disabled by clicks outside its component tree
  // Only applicable for `clickOutsideDisables`
  toggleDisabled = (shouldDisable = !this.state.hasBeenDisabledByClick) => {
    this.setState({
      hasBeenDisabledByClick: shouldDisable,
    });
  };

  // Sets whether an event has been prevented from disabling the focus trap
  // Only applicable for `clickOutsideDisables`
  toggleExitPrevented = (shouldPrevent = !this.preventFocusExit) => {
    this.preventFocusExit = shouldPrevent;
  };

  // Event handler to determine whether a mouse or key event should disable the focus trap
  // Only applicable for `clickOutsideDisables`
  handleOutsideClick = (event: Event) => {
    this.toggleExitPrevented(false);
    if (
      this.preventFocusExit &&
      this.lastInterceptedEvent &&
      event.target === this.lastInterceptedEvent.target
    )
      return;
    this.toggleDisabled(true);
  };

  // Event handler to capture events from within the focus trap subtree and
  // prevent them from disabling the trap (mostly for portals)
  // Only applicable for `clickOutsideDisables`
  handleBubbledEvent = (e: ReactMouseEvent) => {
    this.lastInterceptedEvent = e.nativeEvent;
    this.toggleExitPrevented(true);
  };

  render() {
    const {
      children,
      clickOutsideDisables = false,
      disabled = false,
      returnFocus = true,
      style,
      ...rest
    } = this.props;
    const isDisabled = disabled || this.state.hasBeenDisabledByClick;
    const lockProps = {
      disabled: isDisabled,
      returnFocus,
      ...rest,
    };
    return clickOutsideDisables ? (
      <EuiOutsideClickDetector
        isDisabled={isDisabled}
        onOutsideClick={this.handleOutsideClick}>
        <OutsideEventDetector handleEvent={this.handleBubbledEvent}>
          <FocusLock lockProps={{ style }} {...lockProps}>
            {children}
          </FocusLock>
        </OutsideEventDetector>
      </EuiOutsideClickDetector>
    ) : (
      <FocusLock lockProps={{ style }} {...lockProps}>
        {children}
      </FocusLock>
    );
  }
}
