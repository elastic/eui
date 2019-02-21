import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export interface EuiNotificationBadgeProps
  extends CommonProps,
    HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export const EuiNotificationBadge: FunctionComponent<
  EuiNotificationBadgeProps
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiNotificationBadge', className);

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};
