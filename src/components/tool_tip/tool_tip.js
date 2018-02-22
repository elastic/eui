import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPortal } from '../portal'
import { EuiToolTipPopover } from './tool_tip_popover'
import { noOverflowPlacement } from '../../services';


export class EuiToolTip extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.width = props.width || 256;
    this.space = props.space || 16;

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.getRef = this.getRef.bind(this);
  }

  getPlacement() {
    const wrapperDOM = this.wrapper;
    const tipDOM = this.tip;
    const userPlacement = this.props.placement;
    const WINDOW_BUFFER = 16;
    return noOverflowPlacement(wrapperDOM, tipDOM, userPlacement, WINDOW_BUFFER);
  }

  getRef(ref) {
    console.log(ref)
  }

  showTooltip() {
    // some maths to align the tooltip with whatever you just hovered over (the 'target')
    // or maybe it's 'math' in your weird country
    const style = { width: this.width }; // this style object will be passed as the tooltip's 'style' prop
    const dimensions = this.wrapper.getBoundingClientRect(); // where on the screen is the target

    // center align the tooltip by taking both the target and tooltip widths into account
    style.left = (dimensions.left + (dimensions.width / 2)) - (this.width / 2);
    style.left = Math.max(this.space, style.left); // make sure it doesn't poke off the left side of the page
    style.left = Math.min(style.left, document.body.clientWidth - this.width - this.space); // or off the right

    if (dimensions.top < window.innerHeight / 2) { // the top half of the page
      // when on the top half of the page, position the top of the tooltip just below the target (it will stretch downwards)
      style.top = dimensions.top + dimensions.height + this.space;
    } else {
      // when on the bottom half, set the bottom of the tooltip just above the top of the target (it will stretch upwards)
      style.bottom = (window.innerHeight - dimensions.top) + this.space;
    }

    this.setState({
      visible: true,
      style,
    });
  }

  hideTooltip() {
    this.setState({visible: false});
  }

  render() {

    const {
      children,
      className,
      ...rest,
    } = this.props;

    const classes = classNames(
      'euiToolTip',
      className
    );

    let tooltip;
    if (this.state.visible) {
      tooltip = (
        <EuiPortal>
          <EuiToolTipPopover
            className={classes}
            style={this.state.style}
            getRef={this.getRef}
            {...rest}
          >
            {this.props.text}
          </EuiToolTipPopover>
        </EuiPortal>
      );
    }

    return (
      <span
        onMouseOver={this.showTooltip}
        onMouseOut={this.hideTooltip}
        ref={wrapper => this.wrapper = wrapper}
      >
        {children}
        {tooltip}
      </span>
    );
  }
}
