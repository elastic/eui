import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, Omit, keysOf } from '../../common';

const colorToClassMap: { [color: string]: string | null } = {
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
  children: ReactNode;
  size?: BadgeNotificationSize;
  color?: BadgeNotificationColor;
  isDisabled?: boolean;
}

export const EuiNotificationBadge: FunctionComponent<
  EuiNotificationBadgeProps
> = ({
  children,
  isDisabled,
  className,
  size = 's',
  color = 'accent',
  ...rest
}) => {
  const classes = classNames(
    'euiNotificationBadge',
    {
      'euiNotificationBadge-isDisabled': isDisabled,
    },
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
