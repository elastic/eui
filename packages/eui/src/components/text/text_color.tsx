/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, isValidElement } from 'react';
import { useEuiMemoizedStyles, cloneElementWithCss } from '../../services';
import type { SharedTextProps, CloneElement, EuiTextColors } from './types';
import { euiTextColorStyles } from './text_color.styles';

export const COLORS = [
  'default',
  'subdued',
  'success',
  'accent',
  'accentSecondary',
  'danger',
  'warning',
  'ghost',
  'inherit',
] as const;
export type TextColor = (typeof COLORS)[number];
export const _isNamedColor = (color: any): color is TextColor =>
  COLORS.includes(color);

export type EuiTextColorProps = SharedTextProps & CloneElement & EuiTextColors;

export const EuiTextColor: FunctionComponent<EuiTextColorProps> = ({
  children,
  color = 'default',
  component: Component = 'span',
  cloneElement = false,
  style,
  ...rest
}) => {
  const isNamedColor = _isNamedColor(color);

  const styles = useEuiMemoizedStyles(euiTextColorStyles);
  const cssStyles = [
    styles.euiTextColor,
    isNamedColor ? styles[color as TextColor] : styles.customColor,
  ];

  // We're checking if is a custom color.
  // If it is a custom color we set the `color` of the `.euiTextColor` div to that custom color.
  // This way the children text elements can `inherit` that color and border and backgrounds can get that `currentColor`.
  const euiTextStyle = !isNamedColor
    ? {
        color: color,
        ...style,
      }
    : { ...style };

  const props = { css: cssStyles, style: euiTextStyle, ...rest };

  if (isValidElement(children) && cloneElement) {
    const childrenStyle = { ...children.props.style, ...euiTextStyle };
    return cloneElementWithCss(children, { ...props, style: childrenStyle });
  } else {
    return <Component {...props}>{children}</Component>;
  }
};
