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
  extends Omit<EuiPopoverProps, 'button' | 'buttonRef'> {
  disableFocusTrap?: boolean;
  fullWidth?: boolean;
  input: EuiPopoverProps['button'];
  inputRef?: EuiPopoverProps['buttonRef'];
  onPanelResize?: (width?: number) => void;
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
  onPanelResize,
  inputRef: _inputRef,
  panelRef: _panelRef,
  ...props
}) => {
  const euiThemeContext = useEuiTheme();
  const [inputEl, setInputEl] = useState<HTMLElement | null>(null);
  const [inputElWidth, setInputElWidth] = useState<number>();
  const [panelEl, setPanelEl] = useState<HTMLElement | null>(null);

  const inputRef = useCombinedRefs([setInputEl, _inputRef]);
  const panelRef = useCombinedRefs([setPanelEl, _panelRef]);

  const setPanelWidth = useCallback(
    (width?: number) => {
      if (panelEl && (!!inputElWidth || !!width)) {
        const newWidth = !!width ? width : inputElWidth;
        panelEl.style.width = `${newWidth}px`;
        if (onPanelResize) {
          onPanelResize(newWidth);
        }
      }
    },
    [panelEl, inputElWidth, onPanelResize]
  );
  const onResize = useCallback(() => {
    if (inputEl) {
      const width = inputEl.getBoundingClientRect().width;
      setInputElWidth(width);
      setPanelWidth(width);
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
