import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class EuiButtonToggle extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      children,
      className,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiButtonToggle',
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
