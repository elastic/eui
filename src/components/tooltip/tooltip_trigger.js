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

  noOverflowPlacement() {
    const domNode = ReactDOM.findDOMNode(this);
    const domNodeRect = domNode.getBoundingClientRect();
    const tooltipContainer = domNode.getElementsByClassName('tooltip-container')[0];
    const tooltipRect = tooltipContainer.getBoundingClientRect();
    const BUFFER = 10; // avoid tooltip from getting touching window edge and account for padding

    // determine tooltip overflow in each direction
    // negative values signal window overflow, large values signal lots of free space
    const tooltipOverflow = {
      top: domNodeRect.top - (tooltipRect.height + BUFFER),
      right: window.innerWidth - (domNodeRect.right + tooltipRect.width + BUFFER),
      bottom: window.innerHeight - (domNodeRect.bottom + tooltipRect.height + BUFFER),
      left: domNodeRect.left - (domNodeRect.width + BUFFER)
    };

    function hasCrossDimensionOverflow(key) {
      if (key === 'left' || key === 'right') {
        const domNodeCenterY = domNodeRect.top + (domNodeRect.height / 2);
        const tooltipTop = domNodeCenterY - ((tooltipRect.height / 2) + BUFFER);
        if (tooltipTop <= 0) {
          return true;
        }
        const tooltipBottom = domNodeCenterY + (tooltipRect.height / 2) + BUFFER;
        if (tooltipBottom >= window.innerHeight) {
          return true;
        }
      } else {
        const domNodeCenterX = domNodeRect.left + (domNodeRect.width / 2);
        const tooltipLeft = domNodeCenterX - ((tooltipRect.width / 2) + BUFFER);
        if (tooltipLeft <= 0) {
          return true;
        }
        const tooltipRight = domNodeCenterX + (tooltipRect.width / 2) + BUFFER;
        if (tooltipRight >= window.innerWidth) {
          return true;
        }
      }
      return false;
    }

    const userPlacement = this.props.placement;
    let bestPlacement = userPlacement;
    if (tooltipOverflow[userPlacement] <= 0 || hasCrossDimensionOverflow(userPlacement)) {
      // requested placement overflows window bounds
      // select direction what has the most free space
      Object.keys(tooltipOverflow).forEach((key) => {
        if (tooltipOverflow[key] > tooltipOverflow[bestPlacement] && !hasCrossDimensionOverflow(key)) {
          bestPlacement = key;
        }
      });
    }

    return bestPlacement;
  }

  hoverHandler(e) {
    this.setState({
      isVisible: e.type === 'mouseenter',
      noOverflowPlacement: this.noOverflowPlacement()
    });
  }

  clickHandler(e, onClick) {
    this.setState({
      isVisible: true,
      noOverflowPlacement: this.noOverflowPlacement()
    });
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
      clickHideDelay, // eslint-disable-line no-unused-vars
      onEntered, // eslint-disable-line no-unused-vars
      onExited, // eslint-disable-line no-unused-vars
      theme,
      size,
      onClick,
      display, // eslint-disable-line no-unused-vars
      ...rest
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
      ...rest
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
