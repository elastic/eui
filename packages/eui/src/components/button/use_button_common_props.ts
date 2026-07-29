/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useContext } from 'react';

import { useIsInsideEuiPopover } from '../popover/popover_boundary_context';
import { isButtonDisabled } from './button_display/_button_display';
import { EuiButtonContext } from './button_context';

export interface EuiButtonCommonPropsInput<
  TSize extends string,
  TColor extends string
> {
  size: TSize;
  color: TColor;
  isDisabled?: boolean;
  hasAriaDisabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export interface EuiButtonCommonPropsOutput<
  TSize extends string,
  TColor extends string
> {
  size: TSize;
  color: TColor;
  isDisabled: boolean;
  hasAriaDisabled?: boolean;
  fullWidth?: boolean;
}

/**
 * Resolves inherited button props from EuiButtonContext,
 * popover boundary isolation and isDisabled computation.
 */
export function useEuiButtonCommonProps<
  TSize extends string,
  TColor extends string
>({
  size,
  color,
  isDisabled: _isDisabled,
  hasAriaDisabled,
  fullWidth,
  href,
  disabled,
  isLoading,
}: EuiButtonCommonPropsInput<TSize, TColor>): EuiButtonCommonPropsOutput<
  TSize,
  TColor
> {
  const buttonContext = useContext(EuiButtonContext);
  const isInsidePopover = useIsInsideEuiPopover();
  const groupContext = isInsidePopover ? {} : buttonContext;

  const isDisabled = isButtonDisabled({
    href,
    isDisabled: (groupContext.isDisabled ?? _isDisabled) || disabled,
    isLoading,
  });

  return {
    size: (groupContext.size ?? size) as TSize,
    color: (groupContext.color ?? color) as TColor,
    isDisabled,
    hasAriaDisabled: groupContext.hasAriaDisabled ?? hasAriaDisabled,
    fullWidth: groupContext.fullWidth ?? fullWidth,
  };
}
