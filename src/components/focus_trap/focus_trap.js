import React from 'react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';

import { EuiOutsideClickDetector } from '../outside_click_detector';

const OutsideEventDetector = ({ children, handleEvent, ...rest }) => {
  const eventHanders = ['onMouseDown', 'onTouchStart'].reduce(
    (obj, eventName) => {
      obj[eventName] = handleEvent;
      return obj;
    },
    {}
  );
  return (
    <div {...eventHanders} {...rest}>
      {children}
    </div>
  );
};

export class EuiFocusTrap extends React.Component {
  state = {
    hasBeenDisabledByClick: false,
  };

  lastInterceptedEvent = null;
  preventFocusExit = false;

  componentDidMount() {
    this.setInitalFocus(this.props.initialFocus);
  }

  // Programmatically sets focus on a nested DOM node; optional
  setInitalFocus = initialFocus => {
    let node = initialFocus;
    if (typeof node === 'string') {
      node = document.querySelector(initialFocus);
    }
    if (typeof node === 'function') {
      node = initialFocus();
    }
    if (!node) return;
    // `data-autofocus` is part of the 'react-focus-lock' API
    node.setAttribute('data-autofocus', true);
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
  handleOutsideClick = event => {
    this.toggleExitPrevented(false);
    if (
      this.preventFocusExit &&
      event.target === this.lastInterceptedEvent.target
    )
      return;
    this.toggleDisabled(true);
  };

  // Event handler to capture events from within the focus trap subtree and prevent them from disabling the trap (mostly for portals)
  // Only applicable for `clickOutsideDisables`
  handleBubbledEvent = e => {
    this.lastInterceptedEvent = e.nativeEvent;
    this.toggleExitPrevented(true);
  };

  render() {
    const { children, clickOutsideDisables, disabled, ...rest } = this.props;
    const isDisabled = disabled || this.state.hasBeenDisabledByClick;
    const lockProps = {
      disabled: isDisabled,
      ...rest,
    };
    return clickOutsideDisables ? (
      <EuiOutsideClickDetector
        isDisabled={isDisabled}
        onOutsideClick={this.handleOutsideClick}>
        <OutsideEventDetector handleEvent={this.handleBubbledEvent}>
          <FocusLock {...lockProps}>{children}</FocusLock>
        </OutsideEventDetector>
      </EuiOutsideClickDetector>
    ) : (
      <FocusLock {...lockProps}>{children}</FocusLock>
    );
  }
}

EuiFocusTrap.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Disables the focus trap when clicks occur outside of the trapped area
   */
  clickOutsideDisables: PropTypes.bool,
  /**
   * From `react-focus-lock`.
   * Focus will not be trapped if false
   */
  disabled: PropTypes.bool,
  /**
   * A DOM node, a selector string (which will be passed to
   * `document.querySelector()` to find the DOM node), or a function that
   * returns a DOM node.
   */
  initialFocus: PropTypes.oneOfType([
    PropTypes.instanceOf(HTMLElement),
    PropTypes.func,
    PropTypes.string,
  ]),
  /**
   * From `react-focus-lock`.
   * When exiting/disabling, focus will return to the element that previously help focus
   */
  returnFocus: PropTypes.bool,
};

EuiFocusTrap.defaultProps = {
  clickOutsideDisables: false,
  disabled: false,
  returnFocus: true,
};
