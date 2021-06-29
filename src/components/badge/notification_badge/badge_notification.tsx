/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';

const colorToClassMap = {
  accent: null,
  subdued: 'euiNotificationBadge--subdued',
};

export const COLORS: BadgeNotificationColor[] = keysOf(colorToClassMap);
export type BadgeNotificationColor = keyof typeof colorToClassMap;

const sizeToClassNameMap = {
  s: null,
  m: 'euiNotificationBadge--medium',
};

export const SIZES: BadgeNotificationSize[] = keysOf(sizeToClassNameMap);
export type BadgeNotificationSize = keyof typeof sizeToClassNameMap;

export interface EuiNotificationBadgeProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  size?: BadgeNotificationSize;
  color?: BadgeNotificationColor;
}

export const EuiNotificationBadge: FunctionComponent<EuiNotificationBadgeProps> = ({
  children,
  className,
  size = 's',
  color = 'accent',
  ...rest
}) => {
  const classes = classNames(
    'euiNotificationBadge',
    sizeToClassNameMap[size],
    colorToClassMap[color],
    className
  );

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};
