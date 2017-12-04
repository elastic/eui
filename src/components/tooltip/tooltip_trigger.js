import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Tooltip } from './tooltip';
import { SIZE } from './tooltip_constants';

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
    size: PropTypes.oneOf([SIZE.AUTO, SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE]),
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
    size: SIZE.AUTO,
    isSticky: false
  };

  constructor(props) {
    super(props);
    const openOnLoad = props.trigger === 'manual' ? props.display : false;
    this.state = {
      isVisible: openOnLoad,
      noOverflowPlacement: props.placement
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  hoverHandler(e) {
    const domNode = ReactDOM.findDOMNode(this);
    const tooltipContainer = domNode.getElementsByClassName('tooltip-container')[0];
    const rect = tooltipContainer.getBoundingClientRect();
    const vWidth   = window.innerWidth;
    const vHeight  = window.innerHeight;
    const windowOverflow = {
      top: rect.y - rect.height,
      right: vWidth - rect.right,
      bottom: vHeight - rect.bottom,
      left: rect.left
    };
    const userPlacement = this.props.placement;
    let bestPlacement = userPlacement;
    if (windowOverflow[userPlacement] <= 0) {
      // requested placement overflows window bounds
      // select direction what has the most free space
      Object.keys(windowOverflow).forEach((key) => {
        if (windowOverflow[key] > windowOverflow[bestPlacement]) {
          bestPlacement = key;
        }
      });
    }

    this.setState({
      isVisible: e.type === 'mouseenter',
      noOverflowPlacement: bestPlacement
    });
  }

  clickHandler(e, onClick) {
    this.setState({ isVisible: true });
    onClick(e);
    setTimeout(() => {
      this.setState({ isVisible: false });
    }, this.props.clickHideDelay);
  }

  componentWillReceiveProps(nextProps) {
    const triggerChanged = this.props.trigger !== nextProps.trigger;
    const displayChanged = this.props.display !== nextProps.display;

    if (triggerChanged && nextProps.trigger === 'manual') {
      this.setState({ isVisible: nextProps.display });
    } else if (triggerChanged) {
      this.setState({ isVisible: false });
    } else if (displayChanged) {
      this.setState({ isVisible: nextProps.display });
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
        return { onClick: e => this.clickHandler(e, onClick) };
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
      [`tooltip-${this.state.noOverflowPlacement}`]: this.state.noOverflowPlacement !== 'top'
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
