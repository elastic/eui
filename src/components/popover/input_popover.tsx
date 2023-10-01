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
} from 'react';
import { css } from '@emotion/react';
import classnames from 'classnames';
import { tabbable } from 'tabbable';

import { logicalCSS } from '../../global_styling';
import { keys, useCombinedRefs, useEuiTheme } from '../../services';
import { CommonProps } from '../common';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiFocusTrap } from '../focus_trap';
import { euiFormVariables } from '../form/form.styles';

import { EuiPopover, EuiPopoverProps } from './popover';

export interface _EuiInputPopoverProps
  extends Omit<EuiPopoverProps, 'button' | 'buttonRef' | 'anchorPosition'> {
  /**
   * Alignment of the popover relative to the input
   */
  anchorPosition?: 'downLeft' | 'downRight' | 'downCenter';
  disableFocusTrap?: boolean;
  fullWidth?: boolean;
  input: EuiPopoverProps['button'];
  inputRef?: EuiPopoverProps['buttonRef'];
  onPanelResize?: (width?: number) => void;
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

export const EuiInputPopover: FunctionComponent<EuiInputPopoverProps> = ({
  children,
  className,
  closePopover,
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
  const euiThemeContext = useEuiTheme();
  const [inputEl, setInputEl] = useState<HTMLElement | null>(null);
  const [panelEl, setPanelEl] = useState<HTMLElement | null>(null);
  const popoverClassRef = useRef<EuiPopover | null>(null);

  const inputRef = useCombinedRefs([setInputEl, _inputRef]);
  const panelRef = useCombinedRefs([setPanelEl, _panelRef]);

  /**
   * Sizing/width logic
   */

  const inputWidth = useResizeObserver(inputEl, 'width').width;

  const panelWidth = useMemo(() => {
    return inputWidth < panelMinWidth ? panelMinWidth : inputWidth;
  }, [panelMinWidth, inputWidth]);

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

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      panelPropsOnKeyDown?.(event);

      if (event.key === keys.TAB) {
        if (disableFocusTrap) {
          closePopover();
        } else {
          const tabbableItems = tabbable(event.currentTarget).filter(
            (el) => !el.hasAttribute('data-focus-guard')
          );
          if (!tabbableItems.length) return;

          const tabbingFromLastItemInPopover =
            document.activeElement === tabbableItems[tabbableItems.length - 1];

          if (tabbingFromLastItemInPopover) {
            closePopover();
          }
        }
      }
    },
    [disableFocusTrap, closePopover, panelPropsOnKeyDown]
  );

  const classes = classnames('euiInputPopover', className);
  const form = euiFormVariables(euiThemeContext);

  return (
    <EuiPopover
      css={css(fullWidth ? undefined : logicalCSS('max-width', form.maxWidth))}
      repositionToCrossAxis={false}
      ownFocus={false}
      button={input}
      buttonRef={inputRef}
      panelRef={panelRef}
      className={classes}
      ref={popoverClassRef}
      closePopover={closePopover}
      {...props}
      panelProps={{ ...props.panelProps, onKeyDown }}
    >
      <EuiFocusTrap
        clickOutsideDisables={true}
        disabled={disableFocusTrap}
        {...focusTrapProps}
      >
        {children}
      </EuiFocusTrap>
    </EuiPopover>
  );
};

EuiInputPopover.defaultProps = {
  anchorPosition: 'downLeft',
  attachToAnchor: true,
  display: 'block',
  panelPaddingSize: 's',
};
