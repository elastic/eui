import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { keyCodes } from '../../services';

import { EuiButtonIcon } from '../button';

import { EuiFocusTrap } from '../focus_trap';

import { EuiI18n } from '../i18n';

export class EuiModal extends Component {
  onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onClose();
    }
  };

  render() {
    const {
      className,
      children,
      initialFocus,
      onClose, // eslint-disable-line no-unused-vars
      maxWidth,
      style,
      ...rest
    } = this.props;

    let newStyle;
    let widthClassName;
    if (maxWidth === true) {
      widthClassName = 'euiModal--maxWidth-default';
    } else if (maxWidth !== false) {
      const value = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
      newStyle = { ...style, maxWidth: value };
    }

    const classes = classnames('euiModal', widthClassName, className);

    return (
      <EuiFocusTrap initialFocus={initialFocus}>
        {
          // Create a child div instead of applying these props directly to FocusTrap, or else
          // fallbackFocus won't work.
        }
        <div
          ref={node => {
            this.modal = node;
          }}
          className={classes}
          onKeyDown={this.onKeyDown}
          tabIndex={0}
          style={newStyle || style}
          {...rest}>
          <EuiI18n
            token="euiModal.closeModal"
            default="Closes this modal window">
            {closeModal => (
              <EuiButtonIcon
                iconType="cross"
                onClick={onClose}
                className="euiModal__closeIcon"
                color="text"
                aria-label={closeModal}
              />
            )}
          </EuiI18n>
          <div className="euiModal__flex">{children}</div>
        </div>
      </EuiFocusTrap>
    );
  }
}

EuiModal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  /**
   * Sets the max-width of the modal.
   * Set to `true` to use the default (`euiBreakpoints 'm'`),
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  maxWidth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
  /** specifies what element should initially have focus; Can be a DOM node, or a selector string (which will be passed to document.querySelector() to find the DOM node), or a function that returns a DOM node. */
  initialFocus: PropTypes.oneOfType([
    PropTypes.instanceOf(HTMLElement),
    PropTypes.func,
    PropTypes.string,
  ]),
};

EuiModal.defaultProps = {
  maxWidth: true,
};
