import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class Tooltip extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    size: PropTypes.oneOf(['auto','sm', 'md', 'lg']),
    isSticky: PropTypes.bool
  };

  static defaultProps = {
    visible: true,
    size: 'auto',
    isSticky: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {isSticky, visible, size, className, children, ...others} = this.props;

    const newClasses = classnames('tooltip-container', visible ? 'tooltip-container-visible' : 'tooltip-container-hidden',
                                  size === 'auto' ? null : `tooltip-${size}`,
                                  isSticky? 'tooltip-hoverable': null,
                                  className);

    return (
      <div className={newClasses} {...others}>
        <div className="tooltip-content">{children}</div>
      </div>
    );
  }
}

export class TooltipTrigger extends React.Component {
  static propTypes = {
    display: PropTypes.bool,
    tooltip: PropTypes.oneOfType([PropTypes.node, PropTypes.object]).isRequired,
    placement: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
    trigger: PropTypes.oneOf(['manual', 'hover', 'click']),
    clickHideDelay: PropTypes.number,
    onClick: PropTypes.func,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    theme: PropTypes.oneOf(['dark', 'light']),
    size: PropTypes.oneOf(['auto', 'sm', 'md', 'lg']),
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
    size: 'auto',
    isSticky: false
  };

  constructor(props) {
    super(props);
    this.state = {visible: props.trigger === 'manual' ? props.display : false};
    this.clickHandler = this.clickHandler.bind(this);
  }

  hoverHandler(e) {
    this.setState({visible: e.type === 'mouseenter'});
  }

  clickHandler(e, onClick) {
    this.setState({visible: true});
    onClick(e);
    setTimeout(() => {
      this.setState({visible: false});
    }, this.props.clickHideDelay);
  }

  componentWillReceiveProps(nextProps) {
    const triggerChanged = this.props.trigger !== nextProps.trigger;
    const displayChanged = this.props.display !== nextProps.display;

    if (triggerChanged && nextProps.trigger === 'manual') {
      this.setState({visible: nextProps.display});
    } else if (triggerChanged) {
      this.setState({visible: false});
    } else if (displayChanged) {
      this.setState({visible: nextProps.display});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.visible && !this.state.visible) {
      this.props.onExited();
    } else if(!prevState.visible && this.state.visible) {
      this.props.onEntered();
    }
  }

  render() {
    const {isSticky, placement, tooltip, trigger, className, clickHideDelay, onEntered, onExited, theme, size, onClick, display, ...others} = this.props;
    const {visible} = this.state;

    let placementClass;
    if(placement !== 'top') {
      placementClass = `tooltip-${placement}`;
    }

    let triggerHandler;
    switch(trigger) {
      case 'click':
        triggerHandler = {onClick: e => this.clickHandler(e, onClick)};
        break;
      case 'manual':
        triggerHandler = {};
        break;
      default:
        triggerHandler = {
          onClick,
          onMouseEnter: this.hoverHandler.bind(this),
          onMouseLeave: this.hoverHandler.bind(this)
        };
        break;
    }

    const newClasses = classnames('tooltip', className, placementClass,
      theme === 'light' ? 'tooltip-light' : null);
    const newProps = Object.assign({className: newClasses}, triggerHandler, others);

    return (
      <div {...newProps}>
        {this.props.children}
        <Tooltip {...{isSticky, size: this.props.size, visible}}>{tooltip}</Tooltip>
      </div>
    );
  }
}
