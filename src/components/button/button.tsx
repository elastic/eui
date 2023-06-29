/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, Ref, ReactNode } from 'react';
import classNames from 'classnames';

import {
  CommonProps,
  ExclusiveUnion,
  PropsForAnchor,
  PropsForButton,
} from '../common';

import {
  BUTTON_COLORS,
  useEuiButtonColorCSS,
  useEuiButtonFocusCSS,
  _EuiButtonColor,
} from '../../themes/amsterdam/global_styling/mixins/button';
import {
  EuiButtonDisplay,
  EuiButtonDisplayCommonProps,
  isButtonDisabled,
} from './button_display/_button_display';
import { EuiThemeProvider } from '../../services';

export const COLORS = [...BUTTON_COLORS, 'ghost'] as const;
export type EuiButtonColor = _EuiButtonColor | 'ghost';

export const SIZES = ['s', 'm'] as const;
export type EuiButtonSize = (typeof SIZES)[number];

interface BaseProps {
  children?: ReactNode;
  /**
   * Make button a solid color for prominence
   */
  fill?: boolean;
  /**
   * Any of the named color palette options.
   * **`'ghost'` is set for deprecation. Use EuiThemeProvide.colorMode = 'dark' instead.**
   */
  color?: EuiButtonColor;
  /**
   * Use size `s` in confined spaces
   */
  size?: EuiButtonSize;
  /**
   * `disabled` is also allowed
   */
  isDisabled?: boolean;
}

export interface EuiButtonProps
  extends BaseProps,
    Omit<EuiButtonDisplayCommonProps, 'size'>,
    CommonProps {}

export type EuiButtonPropsForAnchor = PropsForAnchor<
  EuiButtonProps,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

export type EuiButtonPropsForButton = PropsForButton<
  EuiButtonProps,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

export type Props = ExclusiveUnion<
  EuiButtonPropsForAnchor,
  EuiButtonPropsForButton
>;

/**
 * EuiButton is largely responsible for providing relevant props
 * and the logic for element-specific attributes
 */
export const EuiButton: FunctionComponent<Props> = (props) => {
  const {
    className,
    buttonRef,
    color: _color = 'primary',
    fill,
    ...rest
  } = props;

  const buttonIsDisabled = isButtonDisabled({
    href: rest.href,
    isDisabled: rest.isDisabled || rest.disabled,
    isLoading: rest.isLoading,
  });

  const color = buttonIsDisabled ? 'disabled' : _color;

  const buttonColorStyles = useEuiButtonColorCSS({
    display: fill ? 'fill' : 'base',
  })[color === 'ghost' ? 'text' : color];

  const buttonFocusStyle = useEuiButtonFocusCSS();

  const classes = classNames('euiButton', className);
  const cssStyles = [buttonColorStyles, buttonFocusStyle];

  if (_color === 'ghost') {
    // INCEPTION: If `ghost`, re-implement with a wrapping dark mode theme provider
    return (
      <EuiThemeProvider colorMode="dark" wrapperProps={{ cloneElement: true }}>
        <EuiButton {...props} color="text" />
      </EuiThemeProvider>
    );
  }

  return (
    <EuiButtonDisplay
      className={classes}
      css={cssStyles}
      ref={buttonRef}
      {...rest}
    />
  );
};

EuiButton.displayName = 'EuiButton';

// Use defaultProps for simple pass-through props
EuiButton.defaultProps = {
  size: 'm',
  color: 'primary',
};
