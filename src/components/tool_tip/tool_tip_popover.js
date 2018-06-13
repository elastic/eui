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
    popoverRef: PropTypes.func,
  }

  updateDimensions = () => {
    requestAnimationFrame(() => {
      // Because of this delay, sometimes `positionToolTip` becomes unavailable.
      if (this.popover) {
        this.props.positionToolTip(this.popover.getBoundingClientRect());
      }
    });
  };

  setPopoverRef = ref => {
    this.popover = ref;
    if (this.props.popoverRef) {
      this.props.popoverRef(ref);
    }
  }

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
      popoverRef, // eslint-disable-line no-unused-vars
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
        ref={this.setPopoverRef}
        {...rest}
      >
        {optionalTitle}
        {children}
      </div>
    );
  }
}
