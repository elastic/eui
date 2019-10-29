import React, { Component, CSSProperties } from 'react';
import classnames from 'classnames';

import { keyCodes, EuiWindowEvent } from '../../services';

import { CommonProps, keysOf } from '../common';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask } from '../overlay_mask';
import { EuiButtonIcon } from '../button';

type EuiFlyoutSize = 's' | 'm' | 'l';

const sizeToClassNameMap: { [size in EuiFlyoutSize]: string } = {
  s: 'euiFlyout--small',
  m: 'euiFlyout--medium',
  l: 'euiFlyout--large',
};

export const SIZES = keysOf(sizeToClassNameMap);

export interface EuiFlyoutProps extends CommonProps {
  onClose: () => void;
  size?: EuiFlyoutSize;
  /**
   * Hides the default close button. You must provide another close button somewhere within the flyout.
   */
  hideCloseButton?: boolean;
  /**
   * Locks the mouse / keyboard focus to within the flyout
   */
  ownFocus?: boolean;
  /**
   * Specify an aria-label for the close button of the flyout.
   */
  closeButtonAriaLabel?: string;
  /**
   * Sets the max-width of the page,
   * set to `true` to use the default size,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  maxWidth?: boolean | number | string;

  style?: CSSProperties;
}

export class EuiFlyout extends Component<EuiFlyoutProps> {
  static defaultProps: Partial<EuiFlyoutProps> = {
    size: 'm',
    hideCloseButton: false,
    ownFocus: false,
    closeButtonAriaLabel: 'Closes this dialog',
    maxWidth: false,
  };

  onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      this.props.onClose();
    }
  };

  render() {
    const {
      className,
      children,
      hideCloseButton,
      onClose,
      ownFocus,
      size,
      closeButtonAriaLabel,
      maxWidth,
      style,
      ...rest
    } = this.props;

    let newStyle;
    let widthClassName;
    if (maxWidth === true) {
      widthClassName = 'euiFlyout--maxWidth-default';
    } else if (maxWidth !== false) {
      const value = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
      newStyle = { ...style, maxWidth: value };
    }

    const classes = classnames(
      'euiFlyout',
      sizeToClassNameMap[size!],
      widthClassName,
      className
    );

    let closeButton;
    if (onClose && !hideCloseButton) {
      closeButton = (
        <EuiButtonIcon
          className="euiFlyout__closeButton"
          iconType="cross"
          color="text"
          aria-label={closeButtonAriaLabel}
          onClick={onClose}
          data-test-subj="euiFlyoutCloseButton"
        />
      );
    }

    const flyoutContent = (
      <div
        role="dialog"
        className={classes}
        tabIndex={0}
        style={newStyle || style}
        {...rest}>
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
        <EuiWindowEvent event="keydown" handler={this.onKeyDown} />
        {optionalOverlay}
        {/* Trap focus even when ownFocus={false}, otherwise closing the flyout won't return focus
        to the originating button */}
        <EuiFocusTrap clickOutsideDisables={true}>{flyoutContent}</EuiFocusTrap>
      </span>
    );
  }
}
