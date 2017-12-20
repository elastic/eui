import React, {
  Component,
} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import { keyCodes } from '../../services';

import {
  EuiOutsideClickDetector,
} from '../../components';


export class EuiFlyout extends Component {
  onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      this.props.onClose();
    }
  };

  render() {
    const {
      className,
      children,
      onClose,
      ownFocus,
      ...rest
    } = this.props;

    const classes = classnames('euiFlyout', className);

    const flyoutContent = (
      <div
        ref={node => { this.flyout = node; }}
        className={classes}
        onKeyDown={this.onKeyDown}
        tabIndex={0}
        {...rest}
      >
        {children}
      </div>
    );

    let flyout;
    if (ownFocus) {
      flyout = (
        <EuiOutsideClickDetector onOutsideClick={onClose}>
          <FocusTrap
            focusTrapOptions={{
              fallbackFocus: () => this.flyout,
            }}
          >
            {flyoutContent}
          </FocusTrap>
        </EuiOutsideClickDetector>
      );
    } else {
      flyout = flyoutContent;
    }

    return (
      <span>
        {flyout}
      </span>
    );
  }
}

EuiFlyout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
