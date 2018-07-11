import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import { keyCodes } from '../../services';

import { EuiOverlayMask } from '../overlay_mask';
import { EuiButtonIcon } from '../button';

const sizeToClassNameMap = {
  s: 'euiFlyout--small',
  m: 'euiFlyout--medium',
  l: 'euiFlyout--large',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export class EuiFlyout extends Component {
  onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onClose();
    }
  };

  render() {
    const { className, children, hideCloseButton, onClose, ownFocus, size, ...rest } = this.props;

    const classes = classnames('euiFlyout', sizeToClassNameMap[size], className);

    let closeButton;
    if (onClose && !hideCloseButton) {
      closeButton = (
        <EuiButtonIcon
          className="euiFlyout__closeButton"
          iconType="cross"
          color="text"
          aria-label="Closes this dialog"
          onClick={onClose}
          data-test-subj="euiFlyoutCloseButton"
        />
      );
    }

    const flyoutContent = (
      <div
        role="dialog"
        ref={node => {
          this.flyout = node;
        }}
        className={classes}
        tabIndex={0}
        onKeyDown={this.onKeyDown}
        {...rest}
      >
        {closeButton}
        {children}
      </div>
    );

    // If ownFocus is set, show an overlay behind the flyout and allow the user
    // to click it to close it.
    let optionalOverlay;
    if (ownFocus) {
      optionalOverlay = <EuiOverlayMask onClick={onClose} />;
    }

    return (
      <span>
        {optionalOverlay}
        {/* Trap focus even when ownFocus={false}, otherwise closing the flyout won't return focus
            to the originating button */}
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
  /**
   * Hides the default close button. You must provide another close button somewhere within the flyout.
   */
  hideCloseButton: PropTypes.bool,
  /**
   * Locks the mouse / keyboard focus to within the flyout
   */
  ownFocus: PropTypes.bool,
};

EuiFlyout.defaultProps = {
  size: 'm',
  hideCloseButton: false,
  ownFocus: false,
};
