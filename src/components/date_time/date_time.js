import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class EuiDateTime extends Component {
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
      'euiDateTime',
      className
    );

    return (
      <div
        className={classes}
        {...rest}
      >
        {children}
      </div>
    );
  }
}
