/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  KeyboardEvent,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  createContext,
} from 'react';
import { css } from '@emotion/react';
import classnames from 'classnames';
import { tabbable } from 'tabbable';

import { logicalCSS } from '../../global_styling';
import { keys, useCombinedRefs, useEuiTheme } from '../../services';
import { CommonProps } from '../common';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiFocusTrap } from '../focus_trap';
import { euiFormMaxWidth } from '../form/form.styles';

import { EuiPopover, EuiPopoverProps } from './popover';

export interface _EuiInputPopoverProps
  extends Omit<EuiPopoverProps, 'button' | 'buttonRef' | 'anchorPosition'> {
  /**
   * Alignment of the popover relative to the input
   */
  anchorPosition?: 'downLeft' | 'downRight' | 'downCenter';
  disableFocusTrap?: boolean;
  /**
   * Allows automatically closing the input popover on page scroll
   */
  closeOnScroll?: boolean;
  fullWidth?: boolean;
  input: EuiPopoverProps['button'];
  inputRef?: EuiPopoverProps['popoverRef'];
  onPanelResize?: (width: number) => void;
  /**
   * By default, **EuiInputPopovers** inherit the same width as the passed input element.
   * However, if the input width is too small, you can pass a minimum panel width
   * (that should be based on the popover content).
   */
  panelMinWidth?: number;
}

export type EuiInputPopoverProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  _EuiInputPopoverProps;

// Used by child components that want to know the parent popover width
export const EuiInputPopoverWidthContext = createContext<number>(0);

export const EuiInputPopover: FunctionComponent<EuiInputPopoverProps> = ({
  children,
  className,
  closePopover,
  anchorPosition = 'downLeft',
  attachToAnchor = true,
  repositionToCrossAxis = false,
  display = 'block',
  panelPaddingSize = 's',
  closeOnScroll = false,
  ownFocus = false,
  disableFocusTrap = false,
  focusTrapProps,
  input,
  fullWidth = false,
  panelMinWidth = 0,
  onPanelResize,
  inputRef: _inputRef,
  panelRef: _panelRef,
  ...props
}) => {
  const classes = classnames('euiInputPopover', className);
  const euiTheme = useEuiTheme();
  const formMaxWidth = euiFormMaxWidth(euiTheme);

  /**
   * Ref setup
   */

  const popoverClassRef = useRef<EuiPopover>(null);
  // The inputEl state ensures that width is correctly tracked on initial load
  const [inputEl, setInputEl] = useState<HTMLElement | null>(null);
  // The panelEl state ensures that width is correctly set every time the popover opens
  const [panelEl, setPanelEl] = useState<HTMLElement | null>(null);

  const inputRef = useCombinedRefs([setInputEl, _inputRef]);
  const panelRef = useCombinedRefs([setPanelEl, _panelRef]);

  /**
   * Sizing/width logic
   */

  const inputWidth = useResizeObserver(inputEl, 'width').width;

  const panelWidth = useMemo(() => {
    return inputWidth < panelMinWidth ? panelMinWidth : inputWidth;
  }, [panelMinWidth, inputWidth]);

  // Resize callback
  useEffect(() => {
    onPanelResize?.(panelWidth);
  }, [panelWidth, onPanelResize]);

  useEffect(() => {
    if (panelEl) {
      // We have to modify the popover panel DOM node directly instead of using
      // `panelStyle`, as there's some weird positioning bugs on resize otherwise
      panelEl.style.inlineSize = `${panelWidth}px`;
    }
  }, [panelEl, panelWidth]);

  useEffect(() => {
    // This fires on all input width changes regardless of minimum size, because on
    // right/center anchored popovers, the input width affects the position of the popover
    if (panelEl) {
      popoverClassRef.current?.positionPopoverFluid();
    }
  }, [inputWidth, panelEl]);

  /**
   * Popover tab to close logic
   */

  const panelPropsOnKeyDown = props.panelProps?.onKeyDown;

  const handleTabNavigation = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const tabbableItems = tabbable(e.currentTarget).filter(
        (el) => !el.hasAttribute('data-focus-guard')
      );
      if (!tabbableItems.length) return;

      const tabbingFromFirstItemInPopover =
        document.activeElement === tabbableItems[0];
      const tabbingFromLastItemInPopover =
        document.activeElement === tabbableItems[tabbableItems.length - 1];

      if (
        (tabbingFromFirstItemInPopover && e.shiftKey) ||
        (tabbingFromLastItemInPopover && !e.shiftKey)
      ) {
        closePopover();
      }
    },
    [closePopover]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      panelPropsOnKeyDown?.(event);

      if (event.key === keys.TAB) {
        if (disableFocusTrap) {
          if (!ownFocus) {
            handleTabNavigation(event);
          }
        } else {
          if (!ownFocus) {
            handleTabNavigation(event);
          }
        }
      }
    },
    [disableFocusTrap, ownFocus, panelPropsOnKeyDown, handleTabNavigation]
  );

  /**
   * Optional close on scroll behavior
   */

  useEffect(() => {
    // When the popover opens, add a scroll listener to the page (& remove it after)
    if (closeOnScroll && panelEl) {
      const closePopoverOnScroll = (event: Event) => {
        const scrollTarget = event.target as Node;

        // Basic existence check
        if (!panelEl || !inputEl || !scrollTarget) {
          return;
        }
        // Do not close the popover if the input or popover itself was scrolled
        if (panelEl.contains(scrollTarget) || inputEl.contains(scrollTarget)) {
          return;
        }
        // Firefox will trigger a scroll event in many common situations (e.g. docs side nav)
        // when the options list div is appended to the DOM. To work around this, we should
        // check if the element that scrolled actually contains/will affect the input
        if (!scrollTarget.contains(inputEl)) {
          return;
        }

        closePopover();
      };

      // Kibana Cypress tests trigger a scroll event in many common situations when the options list div is appended
      // to the DOM; in testing it was always within 100ms, but setting a timeout here for 500ms to be safe
      const timeoutId = setTimeout(() => {
        window.addEventListener('scroll', closePopoverOnScroll, {
          passive: true, // for better performance as we won't call preventDefault
          capture: true, // scroll events don't bubble, they must be captured instead
        });
      }, 500);

      return () => {
        window.removeEventListener('scroll', closePopoverOnScroll, {
          capture: true,
        });
        clearTimeout(timeoutId);
      };
    }
  }, [closeOnScroll, closePopover, panelEl, inputEl]);

  return (
    <EuiPopover
      className={classes}
      css={css(fullWidth ? undefined : logicalCSS('max-width', formMaxWidth))}
      display={display}
      button={input}
      popoverRef={inputRef}
      panelRef={panelRef}
      ref={popoverClassRef}
      closePopover={closePopover}
      anchorPosition={anchorPosition}
      attachToAnchor={attachToAnchor}
      repositionToCrossAxis={repositionToCrossAxis}
      panelPaddingSize={panelPaddingSize}
      ownFocus={ownFocus}
      {...props}
      panelProps={{ ...props.panelProps, onKeyDown }}
    >
      <EuiFocusTrap
        clickOutsideDisables={true}
        disabled={disableFocusTrap}
        {...focusTrapProps}
      >
        <EuiInputPopoverWidthContext.Provider value={panelWidth}>
          {children}
        </EuiInputPopoverWidthContext.Provider>
      </EuiFocusTrap>
    </EuiPopover>
  );
};
