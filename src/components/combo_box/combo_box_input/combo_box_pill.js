import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiBadge,
} from '../../badge';

export class EuiComboBoxPill extends Component {
  static propTypes = {
    option: PropTypes.object.isRequired,
    children: PropTypes.string,
    className: PropTypes.string,
    color: PropTypes.string,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    color: 'hollow',
  };

  onCloseButtonClick = () => {
    const { onClose, option } = this.props;
    onClose(option);
  };

  render() {
    const {
      children,
      className,
      option, // eslint-disable-line no-unused-vars
      onClose, // eslint-disable-line no-unused-vars
      color,
      ...rest
    } = this.props;
    const classes = classNames('euiComboBoxPill', className);

    if (onClose) {
      return (
        <EuiBadge
          className={classes}
          title={children}
          iconOnClick={this.onCloseButtonClick}
          iconOnClickAriaLabel={`Remove ${children} from selection in this group`}
          iconType="cross"
          iconSide="right"
          color={color}
          closeButtonProps={{
            tabIndex: '-1'
          }}
          {...rest}
        >
          {children}
        </EuiBadge>
      );
    }

    return (
      <EuiBadge
        className={classes}
        title={children}
        color={color}
        {...rest}
      >
        {children}
      </EuiBadge>
    );
  }
}
