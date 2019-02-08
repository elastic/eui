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
    // Disable focus trapping _only_ if the provided props have changed to indicate trapping should discontinue
    // If the inverse is true (props.disabled === false & state.isDisabled === true), we continue to use local state
    if (nextProps.disabled && !prevState.isDisabled) {
      return {
        isDisabled: true
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
  clickOutsideDisables: PropTypes.bool,
  disabled: PropTypes.bool,
  returnFocus: PropTypes.bool
};

EuiFocusTrap.defaultProps = {
  clickOutsideDisables: false,
  disabled: false,
  returnFocus: true
};
