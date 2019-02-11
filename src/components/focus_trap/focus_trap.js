import React from 'react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';

import { EuiOutsideClickDetector } from '../outside_click_detector';

const OutsideEventDetector = ({ children, handleEvent, ...rest }) => {
  const eventHanders = ['onMouseDown', 'onTouchStart'].reduce((obj, eventName) => {
    obj[eventName] = handleEvent;
    return obj;
  }, {});
  return (
    <div {...eventHanders} {...rest}>
      {children}
    </div>
  );
};

export class EuiFocusTrap extends React.Component {
  state = {
    isDisabled: this.props.disabled,
    preventFocusExit: false,
    lastInterceptedEvent: null
  }

  componentDidMount() {
    this.setInitalFocus(this.props.initialFocus);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.disabled !== prevState.isDisabled) {
      return {
        isDisabled: nextProps.disabled
      };
    }
    return null;
  }

  setInitalFocus = (initialFocus) => {
    let node;
    if (initialFocus) {
      if (typeof initialFocus === 'string') {
        node = document.querySelector(initialFocus);
      }
      if (typeof initialFocus === 'function') {
        node = initialFocus();
      }
      if (!node) return;
      // `data-autofocus` is part of the 'react-focus-lock' API
      node.setAttribute('data-autofocus', true);
    }
  }

  toggleDisabled = (shouldDisable = !this.state.isDisabled) => {
    this.setState({
      isDisabled: shouldDisable
    });
  }

  toggleExitPrevented = (shouldPrevent = !this.state.preventFocusExit) => {
    this.setState({
      preventFocusExit: shouldPrevent
    });
  }

  handleOutsideClick = (event) => {
    if (this.state.preventFocusExit && event === this.state.lastInterceptedEvent) {
      this.toggleExitPrevented(false);
      return;
    }
    this.toggleDisabled(true);
  }

  handleBubbledEvent = (e) => {
    this.setState({
      lastInterceptedEvent: e.nativeEvent
    });
    this.toggleExitPrevented(true);
  }

  render() {
    const { children, clickOutsideDisables, disabled, ...rest } = this.props;
    const lockProps = {
      disabled: this.state.isDisabled,
      ...rest
    };
    return (
      clickOutsideDisables ? (
        <EuiOutsideClickDetector
          isDisabled={disabled}
          onOutsideClick={this.handleOutsideClick}
        >
          <OutsideEventDetector handleEvent={this.handleBubbledEvent}>
            <FocusLock {...lockProps}>
              {children}
            </FocusLock>
          </OutsideEventDetector>
        </EuiOutsideClickDetector>
      ) : (
        <FocusLock {...lockProps}>
          {children}
        </FocusLock>
      )
    );
  }
}

EuiFocusTrap.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Disables focus trap when clicks occur outside of the locked area
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
  initialFocus: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
  /**
   * From `react-focus-lock`.
   * When exiting/disabling, focus will return to the element that previously help focus
   */
  returnFocus: PropTypes.bool
};

EuiFocusTrap.defaultProps = {
  clickOutsideDisables: false,
  disabled: false,
  returnFocus: true
};
