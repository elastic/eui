import React, {
  Component,
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
      calculatedPosition: this.props.position,
      toolTipStyles: {},
      id: this.props.id || makeId(),
    };

    this.space = props.space || 16;

    this.showToolTip = this.showToolTip.bind(this);
    this.positionToolTip = this.positionToolTip.bind(this);
    this.hideToolTip = this.hideToolTip.bind(this);
    this.toggleToolTipVisibility = this.toggleToolTipVisibility.bind(this);
  }

  showToolTip() {
    this.setState({ visible: true });
  }

  positionToolTip(toolTipRect) {
    const wrapperRect = this.wrapper.getBoundingClientRect();
    const userPosition = this.props.position;

    const calculatedPosition = calculatePopoverPosition(wrapperRect, toolTipRect, userPosition);
    const toolTipStyles = calculatePopoverStyles(wrapperRect, toolTipRect, calculatedPosition);

    this.setState({
      visible: true,
      calculatedPosition,
      toolTipStyles,
    });
  }

  hideToolTip() {
    this.setState({ visible: false });
  }

  toggleToolTipVisibility(event) {
    event.preventDefault();
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  }

  render() {

    const {
      children,
      className,
      content,
      title,
      clickOnly,
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

    let toolTipProps;
    if (clickOnly) {
      // react fires onFocus before onClick, but onMouseDown gets called before onFocus
      // using onMouseDown so handler gets called before onFocus
      // https://stackoverflow.com/a/28963938/890809
      toolTipProps = {
        onMouseDown: this.toggleToolTipVisibility
      };
    } else {
      toolTipProps = {
        onMouseOver: this.showToolTip,
        onMouseOut: this.hideToolTip
      };
    }

    return (
      <span
        onFocus={this.showToolTip}
        onBlur={this.hideToolTip}
        ref={wrapper => this.wrapper = wrapper}
        aria-describedby={this.state.id}
        tabIndex={0}
        {...toolTipProps}
      >
        {children}
        {tooltip}
      </span>
    );
  }
}

EuiToolTip.propTypes = {
  /**
   * The in-view trigger for your tooltip.
   */
  children: PropTypes.node.isRequired,
  /**
   * The main content of your tooltip.
   */
  content: PropTypes.node.isRequired,

  /**
   * An optional title for your tooltip.
   */
  title: PropTypes.node,

  /**
   * Suggested position. If not enough room this might be changed.
   */
  position: PropTypes.string,

  /**
   * Passes onto the tooltip itself, not the trigger.
   */
  className: PropTypes.string,

  /**
   * Unless you provide one, this will be randomly generated.
   */
  id: PropTypes.string,
};
