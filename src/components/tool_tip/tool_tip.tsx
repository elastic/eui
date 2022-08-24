/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  cloneElement,
  ReactElement,
  ReactNode,
  MouseEvent as ReactMouseEvent,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';
import { EuiPortal } from '../portal';
import { EuiToolTipPopover } from './tool_tip_popover';
import { enqueueStateChange } from '../../services/react';
import {
  findPopoverPosition,
  htmlIdGenerator,
  useEuiTheme,
} from '../../services';

import { EuiResizeObserver } from '../observer/resize_observer';

import { euiToolTipStyles, euiToolTipAnchorStyles } from './tool_tip.styles';

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

interface ArrowStyles {
  left: number;
  top: number;
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
   * Passes onto the span wrapping span wrapping the trigger.
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
  delay?: ToolTipDelay;
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
  position?: ToolTipPositions;

  /**
   * If supplied, called when mouse movement causes the tool tip to be
   * hidden.
   */
  onMouseOut?: (event: ReactMouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

interface ToolTipHandle {
  showToolTip: () => void;
  hideToolTip: () => void;
}

export const EuiToolTip = forwardRef<ToolTipHandle, EuiToolTipProps>(
  (
    {
      position = 'top',
      delay = 'regular',
      display = 'inlineBlock',
      id: propsId,
      children,
      className,
      anchorClassName,
      anchorProps,
      content,
      title,
      ...rest
    },
    ref
  ) => {
    const isMounted = useRef(false);
    const anchor = useRef<null | HTMLElement>(null);
    const popover = useRef<null | HTMLElement>(null);
    const timeoutId = useRef<ReturnType<typeof setTimeout>>();

    const [visible, _setVisible] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);
    const [calculatedPosition, setCalculatedPosition] = useState<
      ToolTipPositions
    >(position);
    const [toolTipStyles, setToolTipStyles] = useState<ToolTipStyles>(
      DEFAULT_TOOLTIP_STYLES
    );
    const [arrowStyles, setArrowStyles] = useState<ArrowStyles>();
    const id = useRef(propsId || htmlIdGenerator()());

    const euiTheme = useEuiTheme();
    const toolTipCss = euiToolTipStyles(euiTheme);
    const anchorCss = euiToolTipAnchorStyles();

    const clearAnimationTimeout = () => {
      if (timeoutId.current) {
        timeoutId.current = clearTimeout(timeoutId.current) as undefined;
      }
    };

    useEffect(() => {
      isMounted.current = true;

      return () => {
        clearAnimationTimeout();
        isMounted.current = false;
      };
    }, []);

    const testAnchor = useCallback(() => {
      // when the tooltip is visible, this checks if the anchor is still part of document
      // this fixes when the react root is removed from the dom without unmounting
      // https://github.com/elastic/eui/issues/1105
      if (document.body.contains(anchor.current) === false) {
        // the anchor is no longer part of `document`
        hideToolTip();
      } else {
        if (visible) {
          // if still visible, keep checking
          requestAnimationFrame(testAnchor);
        }
      }
    }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

    const setVisible = useCallback(
      (isVisible: boolean) => {
        _setVisible((prevState) => {
          if (prevState === false && isVisible === true) {
            requestAnimationFrame(testAnchor);
          }
          return isVisible;
        });
      },
      [testAnchor]
    );

    const showToolTip = useCallback(() => {
      if (!timeoutId.current) {
        timeoutId.current = setTimeout(() => {
          enqueueStateChange(() => setVisible(true));
        }, delayToMsMap[delay]);
      }
    }, [delay, setVisible]);

    const hideToolTip = useCallback(() => {
      clearAnimationTimeout();
      enqueueStateChange(() => {
        if (isMounted.current) {
          setVisible(false);
        }
      });
    }, [setVisible]);

    const setPopoverRef = (ref: HTMLElement) => {
      popover.current = ref;
    };

    const positionToolTip = () => {
      const requestedPosition = position;

      if (!anchor.current || !popover.current) {
        return;
      }

      const { position: newPosition, left, top, arrow } = findPopoverPosition({
        anchor: anchor.current,
        popover: popover.current,
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
          ? windowWidth - left - popover.current.offsetWidth
          : 'auto',
      };

      setVisible(true);
      setCalculatedPosition(newPosition);
      setToolTipStyles(toolTipStyles);
      setArrowStyles(arrow);
    };

    const onFocus = () => {
      setHasFocus(true);
      showToolTip();
    };

    const onBlur = () => {
      setHasFocus(false);
      hideToolTip();
    };

    const onMouseOut = (
      event: ReactMouseEvent<HTMLSpanElement, MouseEvent>
    ) => {
      // Prevent mousing over children from hiding the tooltip by testing for whether the mouse has
      // left the anchor for a non-child.
      if (
        anchor.current === event.relatedTarget ||
        (anchor.current != null &&
          !anchor.current.contains(event.relatedTarget as Node))
      ) {
        if (!hasFocus) {
          hideToolTip();
        }
      }

      if (rest.onMouseOut) {
        rest.onMouseOut(event);
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        showToolTip,
        hideToolTip,
      }),
      [showToolTip, hideToolTip]
    );

    const classes = classNames('euiToolTip', className);

    const anchorClasses = classNames(
      'euiToolTipAnchor',
      anchorClassName,
      anchorProps?.className
    );

    return (
      <>
        <span // eslint-disable-line jsx-a11y/mouse-events-have-key-events
          ref={anchor}
          {...anchorProps}
          css={[anchorCss.euiToolTipAnchor, anchorCss[display]]}
          {...anchorProps}
          className={anchorClasses}
          onMouseOver={showToolTip}
          onMouseOut={onMouseOut}
        >
          {/**
           * Re: jsx-a11y/mouse-events-have-key-events
           * We apply onFocus, onBlur, etc to the children element because that's the element
           * the user will be interacting with, as opposed to the enclosing anchor element.
           * For example, if the inner component is a button and the user tabs to it, we want
           * the enter key to trigger the button. That won't work if the enclosing anchor
           * element has focus.
           */}
          {cloneElement(children, {
            onFocus: (e: React.FocusEvent) => {
              onFocus();
              children.props.onFocus && children.props.onFocus(e);
            },
            onBlur: (e: React.FocusEvent) => {
              onBlur();
              children.props.onBlur && children.props.onBlur(e);
            },
            ...(visible && { 'aria-describedby': id.current }),
          })}
        </span>
        {visible && (content || title) && (
          <EuiPortal>
            <EuiToolTipPopover
              css={[toolTipCss.euiToolTip, toolTipCss[calculatedPosition]]}
              className={classes}
              style={toolTipStyles}
              positionToolTip={positionToolTip}
              popoverRef={setPopoverRef}
              title={title}
              id={id.current}
              role="tooltip"
              {...rest}
            >
              <div
                css={[toolTipCss.euiToolTip__arrow]}
                style={arrowStyles}
                className="euiToolTip__arrow"
              />
              <EuiResizeObserver onResize={positionToolTip}>
                {(resizeRef) => <div ref={resizeRef}>{content}</div>}
              </EuiResizeObserver>
            </EuiToolTipPopover>
          </EuiPortal>
        )}
      </>
    );
  }
);
EuiToolTip.displayName = 'EuiToolTip';
