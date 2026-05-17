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
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  ReactElement,
  ReactNode,
  type MouseEvent as ReactMouseEvent,
  type FocusEvent as ReactFocusEvent,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { findPopoverPosition, htmlIdGenerator, keys } from '../../services';
import { getRepositionOnScroll } from '../../services/popover/reposition_on_scroll';
import { type EuiPopoverPosition } from '../../services/popover';
import { EuiResizeObserver } from '../observer/resize_observer';
import { EuiPortal } from '../portal';
import { EuiComponentDefaultsContext } from '../provider/component_defaults';

import { EuiToolTipPopover, ToolTipPositions } from './tool_tip_popover';
import { EuiToolTipAnchor } from './tool_tip_anchor';
import { EuiToolTipArrow } from './tool_tip_arrow';
import { toolTipManager } from './tool_tip_manager';

export const POSITIONS = ['top', 'right', 'bottom', 'left'] as const;
const DISPLAYS = ['inlineBlock', 'block'] as const;

export const DEFAULT_TOOLTIP_OFFSET = 16;

/**
 * `:focus-visible` may throw in browsers that don't support the selector,
 * fall back to treating all focus as visible so tooltips still appear.
 */
const isFocusVisible = (element: Element): boolean => {
  try {
    return element.matches(':focus-visible');
  } catch {
    return element.matches(':focus');
  }
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
  /**
   * If supplied, called when the trigger loses focus.
   */
  onBlur?: () => void;

  /**
   * Offset in pixels from the anchor. Defaults to 16.
   */
  offset?: number;
}

export interface EuiToolTipRef {
  showToolTip: () => void;
  hideToolTip: () => void;
  id: string;
}

export const EuiToolTip = forwardRef<EuiToolTipRef, EuiToolTipProps>(
  (
    {
      children,
      className,
      anchorClassName,
      anchorProps,
      content,
      title,
      display = 'inlineBlock',
      repositionOnScroll,
      disableScreenReaderOutput = false,
      position: positionProp = 'top',
      offset,
      id: idProp,
      onMouseOut: onMouseOutProp,
      onBlur: onBlurProp,
      ...rest
    },
    ref
  ) => {
    const componentDefaultsContext = useContext(EuiComponentDefaultsContext);

    const [visible, setVisible] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);
    const [calculatedPosition, setCalculatedPosition] =
      useState<ToolTipPositions>(positionProp);
    const [toolTipStyles, setToolTipStyles] = useState<ToolTipStyles>(
      DEFAULT_TOOLTIP_STYLES
    );
    const [arrowStyles, setArrowStyles] = useState<
      Record<EuiPopoverPosition, number | string> | undefined
    >(undefined);

    const generatedId = useRef(htmlIdGenerator()());
    const id = idProp ?? generatedId.current;

    const anchorRef = useRef<HTMLSpanElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const positionToolTip = useCallback(() => {
      if (!anchorRef.current || !popoverRef.current) {
        return;
      }

      const { position, left, top, arrow } = findPopoverPosition({
        anchor: anchorRef.current,
        popover: popoverRef.current,
        position: positionProp,
        offset: offset ?? DEFAULT_TOOLTIP_OFFSET,
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

      const newToolTipStyles: ToolTipStyles = {
        top,
        left: useRightValue ? 'auto' : left,
        right: useRightValue
          ? windowWidth - left - popoverRef.current.offsetWidth
          : 'auto',
      };

      setCalculatedPosition(position);
      setToolTipStyles(newToolTipStyles);
      setArrowStyles(arrow);
    }, [positionProp, offset]);

    const setAnchorRef = useCallback((el: HTMLSpanElement | null) => {
      anchorRef.current = el;
    }, []);

    const setPopoverRef = useCallback(
      (el: HTMLDivElement | null) => {
        popoverRef.current = el;
        if (el) positionToolTip();
      },
      [positionToolTip]
    );

    const hideToolTip = useCallback(() => {
      setVisible(false);
      setToolTipStyles(DEFAULT_TOOLTIP_STYLES);
      setArrowStyles(undefined);
      toolTipManager.deregisterToolTip(hideToolTip);
    }, []);

    const showToolTip = useCallback(() => {
      if (!content && !title) return;
      setVisible(true);
      toolTipManager.registerTooltip(hideToolTip);
    }, [content, title, hideToolTip]);

    useImperativeHandle(ref, () => ({ showToolTip, hideToolTip, id }), [
      showToolTip,
      hideToolTip,
      id,
    ]);

    // If the anchor already has focus on mount (e.g. `autoFocus`), show the tooltip.
    // Important for StrictMode double-mount.
    useEffect(() => {
      if (
        anchorRef.current?.contains(document.activeElement) &&
        document.activeElement != null &&
        isFocusVisible(document.activeElement)
      ) {
        setHasFocus(true);
        showToolTip();
      }
    }, [showToolTip]);

    useEffect(() => {
      return () => {
        toolTipManager.deregisterToolTip(hideToolTip);
      };
    }, [hideToolTip]);

    // When the tooltip is visible, this checks if the anchor is still part of document.
    // This fixes when the react root is removed from the DOM without unmounting
    // See: https://github.com/elastic/eui/issues/1105
    useEffect(() => {
      if (!visible) return;

      let rafId: number;
      const testAnchor = () => {
        if (document.body.contains(anchorRef.current) === false) {
          // the anchor is no longer part of `document`
          hideToolTip();
        } else {
          rafId = requestAnimationFrame(testAnchor);
        }
      };
      rafId = requestAnimationFrame(testAnchor);

      return () => {
        cancelAnimationFrame(rafId);
      };
    }, [visible, hideToolTip]);

    // update scroll listener
    useEffect(() => {
      const shouldReposition = getRepositionOnScroll({
        repositionOnScroll,
        repositionFn: positionToolTip,
        componentDefaults: componentDefaultsContext.EuiToolTip,
      });

      if (shouldReposition) {
        window.addEventListener('scroll', positionToolTip, true);
      }

      return () => {
        window.removeEventListener('scroll', positionToolTip, true);
      };
    }, [
      repositionOnScroll,
      positionToolTip,
      componentDefaultsContext.EuiToolTip,
    ]);

    const onFocus = useCallback(
      (e: ReactFocusEvent) => {
        if (isFocusVisible(e.target as Element)) {
          setHasFocus(true);
          showToolTip();
        }
      },
      [showToolTip]
    );

    const onBlur = useCallback(() => {
      setHasFocus(false);
      hideToolTip();
      onBlurProp?.();
    }, [hideToolTip, onBlurProp]);

    const onEscapeKey = useCallback(
      (event: React.KeyboardEvent<HTMLSpanElement>) => {
        if (event.key === keys.ESCAPE) {
          // when the tooltip is only visual, we don't want it to add an additional key stop
          if (!disableScreenReaderOutput) {
            if (visible) event.stopPropagation();
          }
          setHasFocus(false); // Allows mousing over back into the tooltip to work correctly
          hideToolTip();
        }
      },
      [disableScreenReaderOutput, visible, hideToolTip]
    );

    const onMouseOut = useCallback(
      (event: ReactMouseEvent<HTMLSpanElement, MouseEvent>) => {
        // Prevent mousing over children from hiding the tooltip by testing for whether the mouse has
        // left the anchor for a non-child.
        if (
          anchorRef.current === event.relatedTarget ||
          (anchorRef.current != null &&
            !anchorRef.current.contains(event.relatedTarget as Node))
        ) {
          if (!hasFocus) {
            hideToolTip();
          }
        }

        if (onMouseOutProp) {
          onMouseOutProp(event);
        }
      },
      [hasFocus, hideToolTip, onMouseOutProp]
    );

    const classes = classNames('euiToolTip', className);
    const anchorClasses = classNames(anchorClassName, anchorProps?.className);

    return (
      <>
        <EuiToolTipAnchor
          {...anchorProps}
          ref={setAnchorRef}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onEscapeKey}
          onMouseOver={showToolTip}
          onMouseOut={onMouseOut}
          // `id` defines if the trigger and tooltip are automatically linked via `aria-describedby`.
          id={!disableScreenReaderOutput ? id : undefined}
          className={anchorClasses}
          display={display}
          isVisible={visible}
        >
          {children}
        </EuiToolTipAnchor>
        {visible && (content || title) && (
          <EuiPortal>
            <EuiToolTipPopover
              className={classes}
              style={toolTipStyles}
              positionToolTip={positionToolTip}
              popoverRef={setPopoverRef}
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
