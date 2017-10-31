import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class EuiComboBoxRow extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      children,
      className,
      ...rest,
    } = this.props;

    const classes = classNames(
      'euiComboBoxRow',
      className
    );

    return (
      <button
        className={classes}
        {...rest}
      >
        {children}
      </button>
    );
  }
}
