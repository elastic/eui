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
    positionToolTip: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.classList.add('euiBody-hasToolTip');

    requestAnimationFrame(() => {
      this.props.positionToolTip(this.popover.getBoundingClientRect());
    });
  }

  componentWillUnmount() {
    document.body.classList.remove('euiBody-hasToolTip');
  }

  render() {
    const {
      children,
      title,
      className,
      /* eslint-disable */
      positionToolTip,
      /* eslint-enable */
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
