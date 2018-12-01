import React, { HTMLAttributes, SFC } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export interface EuiNotificationBadgeProps extends CommonProps, HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export const EuiNotificationBadge: SFC<EuiNotificationBadgeProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiNotificationBadge', className);

  return (
    <span
      className={classes}
      {...rest}
    >
      {children}
    </span>
  );
};
