import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class EuiToolTipPopover extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.props.getRef(this.popover.getBoundingClientRect());
    });
  }

  render() {
    const {
      children,
      getRef,
      className,
      ...rest,
    } = this.props;

    const classes = classNames(
      'euiToolTipPopover',
      className
    );

    return (
      <div
        className={classes}
        ref={popover => this.popover = popover}
        {...rest}
      >
        {children}
      </div>
    );
  }
}
