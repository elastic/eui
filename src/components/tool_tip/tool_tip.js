import React, {
  Component,
  cloneElement,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiPortal } from '../portal';
import { EuiToolTipPopover } from './tool_tip_popover';
import { calculatePopoverPosition, calculatePopoverStyles } from '../../services';

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

  positionToolTip = (toolTipRect) => {
    const wrapperRect = this.wrapper.getBoundingClientRect();
    const userPosition = this.props.position;

    const calculatedPosition = calculatePopoverPosition(wrapperRect, toolTipRect, userPosition);
    const toolTipStyles = calculatePopoverStyles(wrapperRect, toolTipRect, calculatedPosition);

    this.setState({
      visible: true,
      calculatedPosition,
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

  onMouseOut = () => {
    if (!this.state.hasFocus) {
      this.hideToolTip();
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

    const trigger = (
      <span ref={wrapper => this.wrapper = wrapper}>
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
        {trigger}
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
