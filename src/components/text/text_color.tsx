/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, CSSProperties } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

const colorsToClassNameMap = {
  default: 'euiTextColor--default',
  subdued: 'euiTextColor--subdued',
  secondary: 'euiTextColor--secondary',
  success: 'euiTextColor--success',
  accent: 'euiTextColor--accent',
  danger: 'euiTextColor--danger',
  warning: 'euiTextColor--warning',
  ghost: 'euiTextColor--ghost',
  inherit: 'euiTextColor--inherit',
};

export type TextColor = keyof typeof colorsToClassNameMap;

export const COLORS = keysOf(colorsToClassNameMap);

export type EuiTextColorProps = CommonProps &
  Omit<
    HTMLAttributes<HTMLDivElement> & HTMLAttributes<HTMLSpanElement>,
    'color'
  > & {
    /**
     * **`secondary` color is DEPRECATED, use `success` instead**
     * Any of our named colors or a `hex`, `rgb` or `rgba` value.
     */
    color?: TextColor | CSSProperties['color'];
    /**
     * Determines the root element
     */
    component?: 'div' | 'span';
  };

export const EuiTextColor: FunctionComponent<EuiTextColorProps> = ({
  children,
  color = 'default',
  className,
  component = 'span',
  style,
  ...rest
}) => {
  const isNamedColor = COLORS.includes(color as TextColor);

  const classes = classNames(
    'euiTextColor',
    { 'euiTextColor--custom': !isNamedColor },
    isNamedColor && colorsToClassNameMap[color as TextColor],
    className
  );
  const Component = component;

  // We're checking if is a custom color.
  // If it is a custom color we set the `color` of the `.euiTextColor` div to that custom color.
  // This way the children text elements can `inherit` that color and border and backgrounds can get that `currentColor`.
  const euiTextStyle = !isNamedColor
    ? {
        color: color,
        ...style,
      }
    : { ...style };

  return (
    <Component className={classes} style={euiTextStyle} {...rest}>
      {children}
    </Component>
  );
};
