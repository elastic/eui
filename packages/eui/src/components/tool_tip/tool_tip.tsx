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

import { CommonProps } from '../common';
import { findPopoverPosition, htmlIdGenerator, keys } from '../../services';
import { type EuiPopoverPosition } from '../../services/popover';
import { enqueueStateChange } from '../../services/react';
import { EuiResizeObserver } from '../observer/resize_observer';
import { EuiPortal } from '../portal';

import { EuiToolTipPopover, ToolTipPositions } from './tool_tip_popover';
import { EuiToolTipAnchor } from './tool_tip_anchor';
import { EuiToolTipArrow } from './tool_tip_arrow';
import { toolTipManager } from './tool_tip_manager';

export const POSITIONS = ['top', 'right', 'bottom', 'left'] as const;
const DISPLAYS = ['inlineBlock', 'block'] as const;

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

export interface EuiToolTipProps extends CommonProps {
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
  display?: (typeof DISPLAYS)[number];
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
   * Disables the tooltip content being read by screen readers when focusing the trigger element.
   * Do not use when the trigger `aria-label` and tooltip `content` can be rephrased to be standalone
   * information (action & additional information).
   * Enable this prop only when the trigger has a descriptive label that either duplicates or includes
   * the tooltip content and would result in repetitive output.
   * @default false
   */
  disableScreenReaderOutput?: boolean;
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
  arrowStyles?: Record<EuiPopoverPosition, number | string>;
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
    disableScreenReaderOutput: false,
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

  onEscapeKey = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === keys.ESCAPE) {
      if (this.state.visible) event.stopPropagation();
      this.setState({ hasFocus: false }); // Allows mousing over back into the tooltip to work correctly
      this.hideToolTip();
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
      disableScreenReaderOutput = false,
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
          onKeyDown={this.onEscapeKey}
          onMouseOver={this.showToolTip}
          onMouseOut={this.onMouseOut}
          // `id` defines if the trigger and tooltip are automatically linked via `aria-describedby`.
          id={!disableScreenReaderOutput ? id : undefined}
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
