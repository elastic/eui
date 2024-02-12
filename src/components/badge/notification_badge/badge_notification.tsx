/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { useEuiTheme } from '../../../services';

import { euiNotificationBadgeStyles } from './badge_notification.styles';

export const COLORS = ['accent', 'subdued', 'success'] as const;
export type BadgeNotificationColor = (typeof COLORS)[number];

export const SIZES = ['s', 'm'] as const;
export type BadgeNotificationSize = (typeof SIZES)[number];

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

export const EuiNotificationBadge: FunctionComponent<
  EuiNotificationBadgeProps
> = ({ children, className, size = 's', color = 'accent', ...rest }) => {
  const euiTheme = useEuiTheme();

  const styles = euiNotificationBadgeStyles(euiTheme);
  const cssStyles = [styles.euiNotificationBadge, styles[size], styles[color]];

  const classes = classNames('euiNotificationBadge', className);

  return (
    <span css={cssStyles} className={classes} {...rest}>
      {children}
    </span>
  );
};
