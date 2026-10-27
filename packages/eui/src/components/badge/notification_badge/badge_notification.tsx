/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';

import { euiNotificationBadgeStyles } from './badge_notification.styles';

// POC: added 'primary' so the default can move off accent (design refresh)
// POC: 'accent' should be deprecated as a color option here
export const COLORS = ['primary', 'accent', 'subdued', 'success'] as const;
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
> = ({
  children,
  className,
  size = 's',
  // POC: design refresh — default accent → primary (blue)
  color = 'primary',
  ...rest
}) => {
  const classes = classNames('euiNotificationBadge', className);

  const styles = useEuiMemoizedStyles(euiNotificationBadgeStyles);
  const cssStyles = [styles.euiNotificationBadge, styles[size], styles[color]];

  return (
    <span css={cssStyles} className={classes} {...rest}>
      {children}
    </span>
  );
};
