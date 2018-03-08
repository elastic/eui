import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class EuiToolTipPopover extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.node,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.props.showToolTip(this.popover.getBoundingClientRect());
    });
  }

  render() {
    const {
      children,
      title,
      className,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiToolTipPopover',
      className
    );

    let optionalTitle;
    if (title) {
      optionalTitle = (
        <div className="euiToolTip__title">{title}</div>
      );
    }

    return (
      <div
        className={classes}
        ref={popover => this.popover = popover}
        {...rest}
      >
        {optionalTitle}
        {children}
      </div>
    );
  }
}
