/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { MouseEventHandler, useContext } from 'react';

import { EuiButtonContext } from './button_context';
import { isButtonDisabled } from './button_display/_button_display';

export interface EuiButtonCommonPropsInput<
  TSize extends string,
  TColor extends string
> {
  size: TSize;
  color: TColor;
  isDisabled?: boolean;
  hasAriaDisabled?: boolean;
  fullWidth?: boolean;
  fill?: boolean;
  display?: 'base' | 'fill' | 'empty';
  href?: string;
  disabled?: boolean;
  isLoading?: boolean;
  /**
   * The button's `id` attribute. Required for selection-group wiring via context.
   */
  id?: string;
  /**
   * The button's own `isSelected` prop, if any.
   */
  isSelected?: boolean;
  /**
   * The button's own `onClick` handler, if any. When inside a selection group,
   * it is merged with the group's `onSelect` callback.
   */
  onClick?: MouseEventHandler<HTMLElement>;
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
  display?: 'base' | 'fill' | 'empty';
  fill?: boolean;
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
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
  fill,
  display: _display,
  href,
  disabled,
  isLoading,
  id,
  isSelected: _isSelected,
  onClick: _onClick,
}: EuiButtonCommonPropsInput<TSize, TColor>): EuiButtonCommonPropsOutput<
  TSize,
  TColor
> {
  const groupContext = useContext(EuiButtonContext);

  const isDisabled = isButtonDisabled({
    href,
    isDisabled: (groupContext.isDisabled ?? _isDisabled) || disabled,
    isLoading,
  });

  const selectionProps =
    id != null ? groupContext.getSelectionProps?.(id) : undefined;

  const onClick = selectionProps
    ? (event: React.MouseEvent<HTMLElement>) => {
        selectionProps.onSelect();
        _onClick?.(event);
      }
    : _onClick;

  return {
    size: (groupContext.size ?? size) as TSize,
    color: (groupContext.color ?? color) as TColor,
    isDisabled,
    hasAriaDisabled: groupContext.hasAriaDisabled ?? hasAriaDisabled,
    fullWidth: groupContext.fullWidth ?? fullWidth,
    display: groupContext.display ?? selectionProps?.display ?? _display,
    fill:
      selectionProps?.fill !== undefined
        ? selectionProps.fill
        : groupContext.fill !== undefined
        ? groupContext.fill
        : fill,
    isSelected: selectionProps?.isSelected ?? _isSelected,
    onClick,
  };
}
