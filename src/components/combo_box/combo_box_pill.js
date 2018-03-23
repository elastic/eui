import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
} from '../icon';

export class EuiComboBoxPill extends Component {
  static propTypes = {
    option: PropTypes.object.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    onClose: PropTypes.func.isRequired,
  }

  onClickClose = () => {
    const { onClose, option } = this.props;
    onClose(option);
  }

  render() {
    const {
      children,
      className,
      option, // eslint-diable-line no-unused-vars
      onClose, // eslint-diable-line no-unused-vars
      ...rest,
    } = this.props;

    const classes = classNames('euiComboBoxPill', className);

    return (
      <div
        className={classes}
        {...rest}
      >
        <div className="euiComboBoxPill__label">
          {children}
        </div>

        <button className="euiComboBoxPill__close" onClick={this.onClickClose}>
          <EuiIcon type="cross" className="euiComboBoxPill__closeIcon" />
        </button>
      </div>
    );
  }
}
