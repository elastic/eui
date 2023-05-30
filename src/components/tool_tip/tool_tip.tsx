/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  ReactElement,
  ReactNode,
  MouseEvent as ReactMouseEvent,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { findPopoverPosition, htmlIdGenerator } from '../../services';
import { enqueueStateChange } from '../../services/react';
import { EuiResizeObserver } from '../observer/resize_observer';
import { EuiPortal } from '../portal';

import { EuiToolTipPopover, ToolTipPositions } from './tool_tip_popover';
import { EuiToolTipAnchor } from './tool_tip_anchor';
import { EuiToolTipArrow } from './tool_tip_arrow';
import { toolTipManager } from './tool_tip_manager';

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
   * Passes onto the span wrapping the trigger.
   */
  anchorClassName?: string;
  /**
   * Passes onto the span wrapping the trigger.
   */
  anchorProps?: CommonProps & HTMLAttributes<HTMLSpanElement>;
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
   * When `true`, the tooltip's position is re-calculated when the user
   * scrolls. This supports having fixed-position tooltip anchors.
   *
   * When nesting an `EuiTooltip` in a scrollable container, `repositionOnScroll` should be `true`
   */
  repositionOnScroll?: boolean;

  /**
   * If supplied, called when mouse movement causes the tool tip to be
   * hidden.
   */
  onMouseOut?: (event: ReactMouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

interface State {
  visible: boolean;
  hasFocus: boolean;
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
    hasFocus: false,
    calculatedPosition: this.props.position,
    toolTipStyles: DEFAULT_TOOLTIP_STYLES,
    arrowStyles: undefined,
    id: this.props.id || htmlIdGenerator()(),
  };

  static defaultProps: Partial<EuiToolTipProps> = {
    position: 'top',
    delay: 'regular',
    display: 'inlineBlock',
  };

  clearAnimationTimeout = () => {
    if (this.timeoutId) {
      this.timeoutId = clearTimeout(this.timeoutId) as undefined;
    }
  };

  componentDidMount() {
    this._isMounted = true;
    if (this.props.repositionOnScroll) {
      window.addEventListener('scroll', this.positionToolTip, true);
    }
  }

  componentWillUnmount() {
    this.clearAnimationTimeout();
    this._isMounted = false;
    window.removeEventListener('scroll', this.positionToolTip, true);
  }

  componentDidUpdate(prevProps: EuiToolTipProps, prevState: State) {
    if (prevState.visible === false && this.state.visible === true) {
      requestAnimationFrame(this.testAnchor);
    }

    // update scroll listener
    if (prevProps.repositionOnScroll !== this.props.repositionOnScroll) {
      if (this.props.repositionOnScroll) {
        window.addEventListener('scroll', this.positionToolTip, true);
      } else {
        window.removeEventListener('scroll', this.positionToolTip, true);
      }
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

  setAnchorRef = (ref: HTMLElement) => (this.anchor = ref);

  setPopoverRef = (ref: HTMLElement) => (this.popover = ref);

  showToolTip = () => {
    if (!this.timeoutId) {
      this.timeoutId = setTimeout(() => {
        enqueueStateChange(() => {
          this.setState({ visible: true });
          toolTipManager.registerTooltip(this.hideToolTip);
        });
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
        this.setState({
          visible: false,
          toolTipStyles: DEFAULT_TOOLTIP_STYLES,
          arrowStyles: undefined,
        });
        toolTipManager.deregisterToolTip(this.hideToolTip);
      }
    });
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

  onMouseOut = (event: ReactMouseEvent<HTMLSpanElement, MouseEvent>) => {
    // Prevent mousing over children from hiding the tooltip by testing for whether the mouse has
    // left the anchor for a non-child.
    if (
      this.anchor === event.relatedTarget ||
      (this.anchor != null &&
        !this.anchor.contains(event.relatedTarget as Node))
    ) {
      if (!this.state.hasFocus) {
        this.hideToolTip();
      }
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
      anchorProps,
      content,
      title,
      delay,
      display,
      repositionOnScroll,
      ...rest
    } = this.props;

    const { arrowStyles, id, toolTipStyles, visible, calculatedPosition } =
      this.state;

    const classes = classNames('euiToolTip', className);
    const anchorClasses = classNames(anchorClassName, anchorProps?.className);

    return (
      <>
        <EuiToolTipAnchor
          {...anchorProps}
          ref={this.setAnchorRef}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onMouseOver={this.showToolTip}
          onMouseOut={this.onMouseOut}
          id={this.state.id}
          className={anchorClasses}
          display={display!}
          isVisible={visible}
        >
          {children}
        </EuiToolTipAnchor>
        {visible && (content || title) && (
          <EuiPortal>
            <EuiToolTipPopover
              className={classes}
              style={toolTipStyles}
              positionToolTip={this.positionToolTip}
              popoverRef={this.setPopoverRef}
              title={title}
              id={id}
              role="tooltip"
              calculatedPosition={calculatedPosition}
              {...rest}
            >
              <EuiToolTipArrow
                style={arrowStyles}
                className="euiToolTip__arrow"
                position={calculatedPosition}
              />
              <EuiResizeObserver onResize={this.positionToolTip}>
                {(resizeRef) => <div ref={resizeRef}>{content}</div>}
              </EuiResizeObserver>
            </EuiToolTipPopover>
          </EuiPortal>
        )}
      </>
    );
  }
}
