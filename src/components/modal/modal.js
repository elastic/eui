import React, {
  Component,
} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import { keyCodes } from '../../services';

export class EuiModal extends Component {
  onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      this.props.onClose();
    }
  };

  render() {
    const {
      className,
      children,
      onClose, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const classes = classnames('euiModal', className);

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
          {...rest}
        >
          {children}
        </div>
      </FocusTrap>
    );
  }
}

EuiModal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
