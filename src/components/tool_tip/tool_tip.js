import React, {
  Component,
  cloneElement,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPortal } from '../portal';
import { EuiToolTipPopover } from './tool_tip_popover';
import { calculatePopoverPosition } from '../../services';

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
      id: this.props.id || makeId(),
    };
  }

  showToolTip = () => {
    this.setState({ visible: true });
  };

  positionToolTip = (toolTipBounds) => {
    const anchorBounds = this.anchor.getBoundingClientRect();
    const requestedPosition = this.props.position;

    const { position, left, top } = calculatePopoverPosition(anchorBounds, toolTipBounds, requestedPosition);

    const toolTipStyles = {
      top: top + window.scrollY,
      left,
    };

    this.setState({
      visible: true,
      calculatedPosition: position,
      toolTipStyles,
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
      content,
      title,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiToolTip',
      positionsToClassNameMap[this.state.calculatedPosition],
      className
    );

    let tooltip;
    if (this.state.visible) {
      tooltip = (
        <EuiPortal>
          <EuiToolTipPopover
            className={classes}
            style={this.state.toolTipStyles}
            positionToolTip={this.positionToolTip}
            title={title}
            id={this.state.id}
            role="tooltip"
            {...rest}
          >
            {content}
          </EuiToolTipPopover>
        </EuiPortal>
      );
    }

    const anchor = (
      <span
        ref={anchor => this.anchor = anchor}
        className="euiToolTipAnchor"
      >
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
