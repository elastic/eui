import React, {
  Component,
} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import { keyCodes } from '../../services';

import { EuiButtonIcon } from '../button';

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
      onClose, // eslint-disable-line no-unused-vars
      style,
      height,
      maxHeight,
      width,
      maxWidth,
      ...rest
    } = this.props;

    const classes = classnames('euiModal', className);

    let divStyle = { ...style };

    if (maxWidth !== false) {
      const value = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
      divStyle = { ...divStyle, maxWidth: value };
    }

    if (width !== false) {
      const value = typeof width === 'number' ? `${width}vw` : width;
      divStyle = { ...divStyle, width: value };
    }

    if (maxHeight !== false) {
      const value = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
      divStyle = { ...divStyle, maxHeight: value };
    }

    if (height !== false) {
      const value = typeof height === 'number' ? `${height}vh` : height;
      divStyle = { ...divStyle, height: value };
    }

    return (
      <FocusTrap
        focusTrapOptions={{
          fallbackFocus: () => this.modal,
        }}
      >
        {
          // Create a child div instead of applying these props directly to FocusTrap, or else
          // fallbackFocus won't work.
        }
        <div
          ref={node => { this.modal = node; }}
          className={classes}
          onKeyDown={this.onKeyDown}
          tabIndex={0}
          style={divStyle}
          {...rest}
        >
          <EuiButtonIcon
            iconType="cross"
            onClick={onClose}
            className="euiModal__closeIcon"
            color="text"
            aria-label="Closes this modal window"
          />
          <div className="euiModal__flex">
            {children}
          </div>
        </div>
      </FocusTrap>
    );
  }
}

EuiModal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),

  /**
   * Set a modal height regardless of content size.
   * Set to `false` to not set a height,
   * set to a number for a custom height in vh,
   * set to a string for a custom height in custom measurement.
   */
  height: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),

  /**
   * Set a max modal width regardless of content size.
   * Set to `false` to not restrict the maximum height,
   * set to a number for a custom max-height in px,
   * set to a string for a custom max-height in custom measurement.
   */
  maxHeight: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),

  /**
   * Set a modal width regardless of content size.
   * Set to `false` to not set a width,
   * set to a number for a custom width in vw,
   * set to a string for a custom width in custom measurement.
   */
  width: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),

  /**
   * Set a max modal width regardless of content size.
   * Set to `false` to not restrict the maximum width,
   * set to a number for a custom max-width in px,
   * set to a string for a custom max-width in custom measurement.
   */
  maxWidth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
};

EuiModal.defaultProps = {
  width: false,
  maxWidth: false,
  height: false,
  maxHeight: false,
};
