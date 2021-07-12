/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
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
     */
    color?: TextColor;
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
  ...rest
}) => {
  const classes = classNames(
    'euiTextColor',
    colorsToClassNameMap[color],
    className
  );
  const Component = component;

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};
