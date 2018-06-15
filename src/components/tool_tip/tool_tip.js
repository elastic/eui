import React, {
  Component,
  cloneElement,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPortal } from '../portal';
import { EuiToolTipPopover } from './tool_tip_popover';
import { findPopoverPosition } from '../../services';

import makeId from '../form/form_row/make_id';

const positionsToClassNameMap = {
  top: 'euiToolTip--top',
  right: 'euiToolTip--right',
  bottom: 'euiToolTip--bottom',
  left: 'euiToolTip--left',
};

export const POSITIONS = Object.keys(positionsToClassNameMap);

export class EuiToolTip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      hasFocus: false,
      calculatedPosition: this.props.position,
      toolTipStyles: {},
      arrowStyles: {},
      id: this.props.id || makeId(),
    };
  }

  setPopoverRef = ref => {
    this.popover = ref;
  }

  showToolTip = () => {
    this.setState({ visible: true });
  };

  positionToolTip = () => {
    const requestedPosition = this.props.position;

    const { position, left, top, arrow } = findPopoverPosition({
      anchor: this.anchor,
      popover: this.popover,
      position: requestedPosition,
      offset: 16, // offset popover 16px from the anchor
      arrowConfig: {
        arrowWidth: 14,
        arrowBuffer: 4
      }
    });

    const toolTipStyles = {
      top,
      left,
    };

    this.setState({
      visible: true,
      calculatedPosition: position,
      toolTipStyles,
      arrowStyles: arrow,
    });
  };

  hideToolTip = () => {
    this.setState({ visible: false });
  };

  onFocus = () => {
    this.setState({
      hasFocus: true,
    });
    this.showToolTip();
  };

  onBlur = () => {
    this.setState({
      hasFocus: false,
    });
    this.hideToolTip();
  };

  onMouseOut = (e) => {
    // Prevent mousing over children from hiding the tooltip by testing for whether the mouse has
    // left the anchor for a non-child.
    if (this.anchor === e.relatedTarget || !this.anchor.contains(e.relatedTarget)) {
      if (!this.state.hasFocus) {
        this.hideToolTip();
      }
    }
  };

  render() {
    const {
      children,
      className,
      anchorClassName,
      content,
      title,
      ...rest
    } = this.props;

    const { arrowStyles, id, toolTipStyles, visible } = this.state;

    const classes = classNames(
      'euiToolTip',
      positionsToClassNameMap[this.state.calculatedPosition],
      className
    );

    const anchorClasses = classNames(
      'euiToolTipAnchor',
      anchorClassName,
    );

    let tooltip;
    if (visible) {
      tooltip = (
        <EuiPortal>
          <EuiToolTipPopover
            className={classes}
            style={toolTipStyles}
            positionToolTip={this.positionToolTip}
            popoverRef={this.setPopoverRef}
            title={title}
            id={id}
            role="tooltip"
            {...rest}
          >
            <div style={arrowStyles} className="euiToolTip__arrow"/>
            {content}
          </EuiToolTipPopover>
        </EuiPortal>
      );
    }

    const anchor = (
      <span
        ref={anchor => this.anchor = anchor}
        className={anchorClasses}
      >
        {/**
          * We apply onFocus, onBlur, etc to the children element because that's the element
          * the user will be interacting with, as opposed to the enclosing anchor element.
          * For example, if the inner component is a button and the user tabs to it, we want
          * the enter key to trigger the button. That won't work if the enclosing anchor
          * element has focus.
          */}
        {cloneElement(children, {
          onFocus: this.showToolTip,
          onBlur: this.hideToolTip,
          'aria-describedby': this.state.id,
          onMouseOver: this.showToolTip,
          onMouseOut: this.onMouseOut
        })}
      </span>
    );

    return (
      <Fragment>
        {anchor}
        {tooltip}
      </Fragment>
    );
  }
}

EuiToolTip.propTypes = {
  /**
   * The in-view trigger for your tooltip.
   */
  children: PropTypes.element.isRequired,
  /**
   * The main content of your tooltip.
   */
  content: PropTypes.node.isRequired,

  /**
   * An optional title for your tooltip.
   */
  title: PropTypes.node,

  /**
   * Suggested position. If there is not enough room for it this will be changed.
   */
  position: PropTypes.oneOf(POSITIONS),

  /**
   * Passes onto the tooltip itself, not the trigger.
   */
  className: PropTypes.string,

  /**
   * Unless you provide one, this will be randomly generated.
   */
  id: PropTypes.string,
};

EuiToolTip.defaultProps = {
  position: 'top',
};
