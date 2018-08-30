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
import { EuiMutationObserver } from '../mutation_observer';

const positionsToClassNameMap = {
  top: 'euiToolTip--top',
  right: 'euiToolTip--right',
  bottom: 'euiToolTip--bottom',
  left: 'euiToolTip--left',
};

export const POSITIONS = Object.keys(positionsToClassNameMap);

const DEFAULT_TOOLTIP_STYLES = {
  // position the tooltip content near the top-left
  // corner of the window so it can't create scrollbars
  // 50,50 because who knows what negative margins, padding, etc
  top: 50,
  left: 50,
  // just in case, avoid any potential flicker by hiding
  // the tooltip before it is positioned
  opacity: 0
};

export class EuiToolTip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      hasFocus: false,
      calculatedPosition: this.props.position,
      toolTipStyles: DEFAULT_TOOLTIP_STYLES,
      arrowStyles: {},
      id: this.props.id || makeId(),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.visible === false && this.state.visible === true) {
      requestAnimationFrame(this.testAnchor);
    }
  }

  testAnchor = () => {
    // when the tooltip is visible, this checks if the anchor is still part of document
    // this fixes when the react root is removed from the dom without unmounting
    // https://github.com/elastic/eui/issues/1105
    if (document.contains(this.anchor) === false) {
      // the anchor is no longer part of `document`
      this.hideToolTip();
    } else {
      if (this.state.visible) {
        // if still visible, keep checking
        requestAnimationFrame(this.testAnchor);
      }
    }
  }

  setPopoverRef = ref => {
    this.popover = ref;

    // if the popover has been unmounted, clear
    // any previous knowledge about its size
    if (ref == null) {
      this.setState({
        toolTipStyles: DEFAULT_TOOLTIP_STYLES,
        arrowStyles: {}
      });
    }
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
        arrowWidth: 12,
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

    if (this.props.onMouseOut) {
      this.props.onMouseOut();
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
    if (visible && (content || title)) {
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
            <EuiMutationObserver
              observerOptions={{ subtree: true, childList: true, characterData: true, attributes: true }}
              onMutation={this.positionToolTip}
            >
              {content}
            </EuiMutationObserver>
          </EuiToolTipPopover>
        </EuiPortal>
      );
    }

    const anchor = (
      <span
        ref={anchor => this.anchor = anchor}
        className={anchorClasses}
        onMouseOver={this.showToolTip}
        onMouseOut={this.onMouseOut}
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
  content: PropTypes.node,

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
