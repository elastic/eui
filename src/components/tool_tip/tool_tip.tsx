/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  cloneElement,
  Fragment,
  ReactElement,
  ReactNode,
  MouseEvent as ReactMouseEvent,
  KeyboardEvent,
} from 'react';
import classNames from 'classnames';

import { keysOf } from '../common';
import { EuiPortal } from '../portal';
import { EuiToolTipPopover } from './tool_tip_popover';
import { findPopoverPosition, htmlIdGenerator, keys } from '../../services';
import { enqueueStateChange } from '../../services/react';

import { EuiResizeObserver } from '../observer/resize_observer';

export type ToolTipPositions = 'top' | 'right' | 'bottom' | 'left';

const positionsToClassNameMap: { [key in ToolTipPositions]: string } = {
  top: 'euiToolTip--top',
  right: 'euiToolTip--right',
  bottom: 'euiToolTip--bottom',
  left: 'euiToolTip--left',
};

export const POSITIONS = keysOf(positionsToClassNameMap);

export type ToolTipDelay = 'regular' | 'long';

const delayToMsMap: { [key in ToolTipDelay]: number } = {
  regular: 250,
  long: 250 * 5,
};

interface ToolTipStyles {
  top: number;
  left: number | 'auto';
  right?: number | 'auto';
  opacity?: number;
  visibility?: 'hidden';
}

const displayToClassNameMap = {
  inlineBlock: undefined,
  block: 'euiToolTipAnchor--displayBlock',
};

const DEFAULT_TOOLTIP_STYLES: ToolTipStyles = {
  // position the tooltip content near the top-left
  // corner of the window so it can't create scrollbars
  // 50,50 because who knows what negative margins, padding, etc
  top: 50,
  left: 50,
  // just in case, avoid any potential flicker by hiding
  // the tooltip before it is positioned
  opacity: 0,
  // prevent accidental mouse interaction while positioning
  visibility: 'hidden',
};

export interface EuiToolTipProps {
  /**
   * Passes onto the the trigger.
   */
  anchorClassName?: string;
  /**
   * The in-view trigger for your tooltip.
   */
  children: ReactElement;
  /**
   * Passes onto the tooltip itself, not the trigger.
   */
  className?: string;
  /**
   * The main content of your tooltip.
   */
  content?: ReactNode;
  /**
   * Common display alternatives for the anchor wrapper
   */
  display?: keyof typeof displayToClassNameMap;
  /**
   * Delay before showing tooltip. Good for repeatable items.
   */
  delay: ToolTipDelay;
  /**
   * An optional title for your tooltip.
   */
  title?: ReactNode;
  /**
   * Unless you provide one, this will be randomly generated.
   */
  id?: string;
  /**
   * Suggested position. If there is not enough room for it this will be changed.
   */
  position: ToolTipPositions;

  /**
   * If supplied, called when mouse movement causes the tool tip to be
   * hidden.
   */
  onMouseOut?: (event: ReactMouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

interface State {
  visible: boolean;
  calculatedPosition: ToolTipPositions;
  toolTipStyles: ToolTipStyles;
  arrowStyles: undefined | { left: number; top: number };
  id: string;
}

export class EuiToolTip extends Component<EuiToolTipProps, State> {
  _isMounted = false;
  anchor: null | HTMLElement = null;
  popover: null | HTMLElement = null;
  private timeoutId?: ReturnType<typeof setTimeout>;

  state: State = {
    visible: false,
    calculatedPosition: this.props.position,
    toolTipStyles: DEFAULT_TOOLTIP_STYLES,
    arrowStyles: undefined,
    id: this.props.id || htmlIdGenerator()(),
  };

  static defaultProps: Partial<EuiToolTipProps> = {
    position: 'top',
    delay: 'regular',
  };

  clearAnimationTimeout = () => {
    if (this.timeoutId) {
      this.timeoutId = clearTimeout(this.timeoutId) as undefined;
    }
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this.clearAnimationTimeout();
    this._isMounted = false;
    window.removeEventListener('mousemove', this.hasFocusMouseMoveListener);
  }

  componentDidUpdate(prevProps: EuiToolTipProps, prevState: State) {
    if (prevState.visible === false && this.state.visible === true) {
      requestAnimationFrame(this.testAnchor);
    }
  }

  testAnchor = () => {
    // when the tooltip is visible, this checks if the anchor is still part of document
    // this fixes when the react root is removed from the dom without unmounting
    // https://github.com/elastic/eui/issues/1105
    if (document.body.contains(this.anchor) === false) {
      // the anchor is no longer part of `document`
      this.hideToolTip();
    } else {
      if (this.state.visible) {
        // if still visible, keep checking
        requestAnimationFrame(this.testAnchor);
      }
    }
  };

  setPopoverRef = (ref: HTMLElement) => {
    this.popover = ref;

    // if the popover has been unmounted, clear
    // any previous knowledge about its size
    if (ref == null) {
      this.setState({
        toolTipStyles: DEFAULT_TOOLTIP_STYLES,
        arrowStyles: undefined,
      });
    }
  };

  showToolTip = () => {
    if (!this.timeoutId) {
      this.timeoutId = setTimeout(() => {
        enqueueStateChange(() => this.setState({ visible: true }));
      }, delayToMsMap[this.props.delay]);
    }
  };

  positionToolTip = () => {
    const requestedPosition = this.props.position;

    if (!this.anchor || !this.popover) {
      return;
    }

    const { position, left, top, arrow } = findPopoverPosition({
      anchor: this.anchor,
      popover: this.popover,
      position: requestedPosition,
      offset: 16, // offset popover 16px from the anchor
      arrowConfig: {
        arrowWidth: 12,
        arrowBuffer: 4,
      },
    });

    // If encroaching the right edge of the window:
    // When `props.content` changes and is longer than `prevProps.content`, the tooltip width remains and
    // the resizeObserver callback will fire twice (once for vertical resize caused by text line wrapping,
    // once for a subsequent position correction) and cause a flash rerender and reposition.
    // To prevent this, we can orient from the right so that text line wrapping does not occur, negating
    // the second resizeObserver callback call.
    const windowWidth =
      document.documentElement.clientWidth || window.innerWidth;
    const useRightValue = windowWidth / 2 < left;

    const toolTipStyles: ToolTipStyles = {
      top,
      left: useRightValue ? 'auto' : left,
      right: useRightValue
        ? windowWidth - left - this.popover.offsetWidth
        : 'auto',
    };

    this.setState({
      visible: true,
      calculatedPosition: position,
      toolTipStyles,
      arrowStyles: arrow,
    });
  };

  hideToolTip = () => {
    this.clearAnimationTimeout();
    enqueueStateChange(() => {
      if (this._isMounted) {
        this.setState({ visible: false });
      }
    });
  };

  hasFocusMouseMoveListener = () => {
    this.hideToolTip();
    window.removeEventListener('mousemove', this.hasFocusMouseMoveListener);
  };

  onKeyUp = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === keys.TAB) {
      window.addEventListener('mousemove', this.hasFocusMouseMoveListener);
    }
  };

  onMouseOut = (event: ReactMouseEvent<HTMLSpanElement, MouseEvent>) => {
    // Prevent mousing over children from hiding the tooltip by testing for whether the mouse has
    // left the anchor for a non-child.
    if (
      this.anchor === event.relatedTarget ||
      (this.anchor != null &&
        !this.anchor.contains(event.relatedTarget as Node))
    ) {
      this.hideToolTip();
    }

    if (this.props.onMouseOut) {
      this.props.onMouseOut(event);
    }
  };

  render() {
    const {
      children,
      className,
      anchorClassName,
      content,
      title,
      delay,
      display = 'inlineBlock',
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
      display ? displayToClassNameMap[display] : null,
      anchorClassName
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
            {...rest}>
            <div style={arrowStyles} className="euiToolTip__arrow" />
            <EuiResizeObserver onResize={this.positionToolTip}>
              {(resizeRef) => <div ref={resizeRef}>{content}</div>}
            </EuiResizeObserver>
          </EuiToolTipPopover>
        </EuiPortal>
      );
    }

    const anchor = (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <span
        ref={(anchor) => (this.anchor = anchor)}
        className={anchorClasses}
        onMouseOver={this.showToolTip}
        onMouseOut={this.onMouseOut}
        onKeyUp={(event) => {
          this.onKeyUp(event);
        }}>
        {/**
         * Re: jsx-a11y/mouse-events-have-key-events
         * We apply onFocus, onBlur, etc to the children element because that's the element
         * the user will be interacting with, as opposed to the enclosing anchor element.
         * For example, if the inner component is a button and the user tabs to it, we want
         * the enter key to trigger the button. That won't work if the enclosing anchor
         * element has focus.
         */}
        {cloneElement(children, {
          onFocus: this.showToolTip,
          onBlur: this.hideToolTip,
          ...(visible && { 'aria-describedby': this.state.id }),
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
