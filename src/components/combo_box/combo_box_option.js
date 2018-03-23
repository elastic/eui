import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class EuiComboBoxOption extends Component {
  static propTypes = {
    option: PropTypes.object.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { onClick, option } = this.props;
    onClick(option);
  };

  render() {
    const {
      children,
      className,
      option, // eslint-diable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const classes = classNames(
      'euiComboBoxRow',
      className
    );

    return (
      <button
        className={classes}
        onClick={this.onClick}
        {...rest}
      >
        {children}
      </button>
    );
  }
}
