import React, {
  Component,
} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import { keyCodes } from '../../services';

import {
  EuiOverlayMask,
} from '../overlay_mask';

const sizeToClassNameMap = {
  s: 'euiFlyout--small',
  m: 'euiFlyout--medium',
  l: 'euiFlyout--large',
};

export const SIZES = Object.keys(sizeToClassNameMap);

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
      size,
      ...rest
    } = this.props;

    const classes = classnames(
      'euiFlyout',
      sizeToClassNameMap[size],
      className
    );

    const flyoutContent = (
      <div
        ref={node => { this.flyout = node; }}
        className={classes}
        tabIndex={0}
        onKeyDown={this.onKeyDown}
        {...rest}
      >
        {children}
      </div>
    );

    // If ownFocus is set, show an overlay behind the flyout and allow the user
    // to click it to close it.
    let optionalOverlay;
    if (ownFocus) {
      optionalOverlay = (
        <EuiOverlayMask onClick={onClose} />
      );
    }

    return (
      <span>
        {optionalOverlay}
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: () => this.flyout,
            clickOutsideDeactivates: true,
          }}
        >
          {flyoutContent}
        </FocusTrap>
      </span>
    );
  }
}

EuiFlyout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(SIZES),
};

EuiFlyout.defaultProps = {
  size: 'm',
};
