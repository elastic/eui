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
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import classnames from 'classnames';
import { tabbable, FocusableElement } from 'tabbable';

import { CommonProps } from '../common';
import { EuiFocusTrap } from '../focus_trap';
import { EuiPopover, EuiPopoverProps } from './popover';
import { EuiResizeObserver } from '../observer/resize_observer';
import {
  cascadingMenuKeys,
  useCombinedRefs,
  useEuiTheme,
} from '../../services';
import { euiFormVariables } from '../form/form.styles';
import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';

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
  const [inputElWidth, setInputElWidth] = useState<number>();
  const [panelEl, setPanelEl] = useState<HTMLElement | null>(null);
  const popoverClassRef = useRef<EuiPopover | null>(null);

  const inputRef = useCombinedRefs([setInputEl, _inputRef]);
  const panelRef = useCombinedRefs([setPanelEl, _panelRef]);

  const setPanelWidth = useCallback(
    (width?: number) => {
      if (panelEl && (!!inputElWidth || !!width)) {
        const newWidth = !!width ? width : inputElWidth;
        const widthToSet =
          newWidth && newWidth > panelMinWidth ? newWidth : panelMinWidth;

        panelEl.style.width = `${widthToSet}px`;
        onPanelResize?.(widthToSet);
      }
    },
    [panelEl, inputElWidth, onPanelResize, panelMinWidth]
  );
  const onResize = useCallback(() => {
    if (inputEl) {
      const width = inputEl.getBoundingClientRect().width;
      setInputElWidth(width);
      setPanelWidth(width);
      popoverClassRef.current?.positionPopoverFluid();
    }
  }, [inputEl, setPanelWidth]);
  useEffect(() => {
    onResize();
  }, [onResize]);
  useEffect(() => {
    setPanelWidth();
  }, [setPanelWidth]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (panelEl && event.key === cascadingMenuKeys.TAB) {
      const tabbableItems = tabbable(panelEl).filter((el: FocusableElement) => {
        return (
          Array.from(el.attributes)
            .map((el) => el.name)
            .indexOf('data-focus-guard') < 0
        );
      });
      if (
        disableFocusTrap ||
        (tabbableItems.length &&
          tabbableItems[tabbableItems.length - 1] === document.activeElement)
      ) {
        props.closePopover();
      }
    }
  };

  const classes = classnames('euiInputPopover', className);
  const form = euiFormVariables(euiThemeContext);

  return (
    <EuiPopover
      css={css(fullWidth ? undefined : logicalCSS('max-width', form.maxWidth))}
      ownFocus={false}
      button={
        <EuiResizeObserver onResize={onResize}>
          {(resizeRef) => <div ref={resizeRef}>{input}</div>}
        </EuiResizeObserver>
      }
      buttonRef={inputRef}
      panelRef={panelRef}
      className={classes}
      ref={popoverClassRef}
      {...props}
    >
      <EuiFocusTrap
        clickOutsideDisables={true}
        disabled={disableFocusTrap}
        {...focusTrapProps}
      >
        <div onKeyDown={onKeyDown}>{children}</div>
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
