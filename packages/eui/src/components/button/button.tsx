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

import { EuiDisabledProps } from '../../services/hooks/useEuiDisabledElement';
import {
  BUTTON_COLORS,
  useEuiButtonColorCSS,
  useEuiButtonFocusCSS,
  _EuiExtendedButtonColor,
} from '../../global_styling/mixins/_button';
import {
  EuiButtonDisplay,
  EuiButtonDisplayCommonProps,
  EuiButtonDisplayPropsForAnchor,
  EuiButtonDisplayPropsForButton,
} from './button_display/_button_display';
import { useEuiButtonCommonProps } from './use_button_common_props';

export const COLORS = BUTTON_COLORS;
export type EuiButtonColor = _EuiExtendedButtonColor;

export const SIZES = ['s', 'm'] as const;
export type EuiButtonSize = (typeof SIZES)[number];

interface BaseProps extends EuiDisabledProps {
  children?: ReactNode;
  /**
   * Make button a solid color for prominence
   */
  fill?: boolean;
  /**
   * Any of the named color palette options.
   *
   * Do not use the following colors for standalone buttons directly,
   * they exist to serve other components:
   *  - accent
   *  - warning
   *  - neutral
   *  - risk
   */
  color?: EuiButtonColor;
  /**
   * Use size `s` in confined spaces
   */
  size?: EuiButtonSize;
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

// For some reason, Storybook doesn't parse `EuiButtonDisplayCommonProps` unless we include it here
export type EuiButtonPropsForButton = EuiButtonDisplayCommonProps &
  PropsForButton<
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
 * @see {@link https://eui.elastic.co/docs/components/navigation/buttons/button/|EuiButton documentation}
 */
export const EuiButton: FunctionComponent<Props> = ({
  className,
  buttonRef,
  size: _size = 'm',
  color: _color = 'primary',
  fill: _fill,
  isDisabled: _isDisabled,
  hasAriaDisabled: _hasAriaDisabled,
  fullWidth: _fullWidth,
  id,
  onClick: _onClick,
  isSelected: _isSelected,
  ...rest
}) => {
  const {
    size,
    color,
    isDisabled,
    hasAriaDisabled,
    fullWidth,
    fill,
    isSelected,
    onClick,
  } = useEuiButtonCommonProps<EuiButtonSize, EuiButtonColor>({
    size: _size,
    color: _color,
    isDisabled: _isDisabled,
    hasAriaDisabled: _hasAriaDisabled,
    fullWidth: _fullWidth,
    fill: _fill,
    isSelected: _isSelected,
    href: rest.href,
    disabled: rest.disabled,
    isLoading: rest.isLoading,
    id,
    onClick: _onClick,
  });

  const buttonColorStyles = useEuiButtonColorCSS({
    display: fill ? 'fill' : 'base',
  })[isDisabled ? 'disabled' : color];

  const buttonFocusStyle = useEuiButtonFocusCSS();

  const classes = classNames('euiButton', className);
  const cssStyles = [buttonColorStyles, buttonFocusStyle];

  const buttonProps = {
    onClick,
    ...rest,
  } as EuiButtonDisplayPropsForButton;

  const anchorProps = {
    onClick,
    ...rest,
  } as EuiButtonDisplayPropsForAnchor;

  return (
    <EuiButtonDisplay
      ref={buttonRef}
      className={classes}
      css={cssStyles}
      size={size}
      isDisabled={isDisabled}
      hasAriaDisabled={hasAriaDisabled}
      fullWidth={fullWidth}
      id={id}
      isSelected={isSelected}
      {...(rest.href ? anchorProps : buttonProps)}
    />
  );
};
EuiButton.displayName = 'EuiButton';
