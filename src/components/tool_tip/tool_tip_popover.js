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

  updateDimensions = () => {
    requestAnimationFrame(() => {
      // Because of this delay, sometimes `positionToolTip` becomes unavailable.
      if (this.popover) {
        this.props.positionToolTip(this.popover.getBoundingClientRect());
      }
    });
  };

  componentDidMount() {
    document.body.classList.add('euiBody-hasPortalContent');

    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    document.body.classList.remove('euiBody-hasPortalContent');
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const {
      children,
      title,
      className,
      positionToolTip, // eslint-disable-line no-unused-vars
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
