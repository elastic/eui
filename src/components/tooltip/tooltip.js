import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SMALL = 's';
const MEDIUM = 'm';
const LARGE = 'l';
const AUTO = 'auto';

export class Tooltip extends React.PureComponent {
  static propTypes = {
    isVisible: PropTypes.bool,
    size: PropTypes.oneOf([AUTO,SMALL, MEDIUM, LARGE]),
    isSticky: PropTypes.bool,
    title: PropTypes.string
  };

  static defaultProps = {
    isVisible: true,
    size: AUTO,
    isSticky: false
  };

  render() {
    const {
      isSticky,
      isVisible,
      size,
      title,
      className,
      children,
      ...others
    } = this.props;

    const newClasses = classnames('tooltip-container', {
      'tooltip-container-visible': isVisible,
      'tooltip-container-hidden': !isVisible,
      'tooltip-hoverable': isSticky,
      [`tooltip-${size}`]: size !== 'auto'
    }, className);

    let tooltipTitle;
    if (title) {
      tooltipTitle = (
        <div className="tooltip-content tooltip-title">{title}</div>
      );
    }

    return (
      <div className={newClasses} {...others}>
        {tooltipTitle}
        <div className="tooltip-content">{children}</div>
      </div>
    );
  }
}

export class TooltipTrigger extends React.Component {
  static propTypes = {
    display: PropTypes.bool,
    title: PropTypes.string,
    tooltip: PropTypes.oneOfType([PropTypes.node, PropTypes.object]).isRequired,
    placement: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
    trigger: PropTypes.oneOf(['manual', 'hover', 'click']),
    clickHideDelay: PropTypes.number,
    onClick: PropTypes.func,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    theme: PropTypes.oneOf(['dark', 'light']),
    size: PropTypes.oneOf([AUTO, SMALL, MEDIUM, LARGE]),
    isSticky: PropTypes.bool
  };

  static defaultProps = {
    display: false,
    placement: 'top',
    trigger: 'hover',
    clickHideDelay: 1000,
    onClick: () => {},
    onEntered: () => {},
    onExited: () => {},
    theme: 'dark',
    size: AUTO,
    isSticky: false
  };

  constructor(props) {
    super(props);
    const openOnLoad = props.trigger === 'manual' ? props.display : false;
    this.state = { isVisible: openOnLoad };
    this.clickHandler = this.clickHandler.bind(this);
  }

  hoverHandler(e) {
    this.setState({isVisible: e.type === 'mouseenter'});
  }

  clickHandler(e, onClick) {
    this.setState({isVisible: true});
    onClick(e);
    setTimeout(() => {
      this.setState({isVisible: false});
    }, this.props.clickHideDelay);
  }

  componentWillReceiveProps(nextProps) {
    const triggerChanged = this.props.trigger !== nextProps.trigger;
    const displayChanged = this.props.display !== nextProps.display;

    if (triggerChanged && nextProps.trigger === 'manual') {
      this.setState({isVisible: nextProps.display});
    } else if (triggerChanged) {
      this.setState({isVisible: false});
    } else if (displayChanged) {
      this.setState({isVisible: nextProps.display});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.isVisible && !this.state.isVisible) {
      this.props.onExited();
    } else if(!prevState.isVisible && this.state.isVisible) {
      this.props.onEntered();
    }
  }

  getTriggerHandler(trigger, onClick) {
    switch(trigger) {
      case 'click':
        return {onClick: e => this.clickHandler(e, onClick)};
      case 'manual':
        return {};
      default:
        return {
          onClick,
          onMouseEnter: this.hoverHandler.bind(this),
          onMouseLeave: this.hoverHandler.bind(this)
        };
    }
  }

  render() {
    const {
      isSticky,
      placement,
      title,
      tooltip,
      trigger,
      className,
      clickHideDelay,
      onEntered,
      onExited,
      theme,
      size,
      onClick,
      display,
      ...others
    } = this.props;
    const { isVisible } = this.state;

    const triggerHandler = this.getTriggerHandler(trigger, onClick);

    const newClasses = classnames('tooltip', className, {
      'tooltip-light': theme === 'light',
      [`tooltip-${placement}`]: placement !== 'top'
    });
    const newProps = {
      className: newClasses,
      ...triggerHandler,
      ...others
    };
    const tooltipProps = { isSticky, size, isVisible, title };

    return (
      <div {...newProps}>
        {this.props.children}
        <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
      </div>
    );
  }
}
