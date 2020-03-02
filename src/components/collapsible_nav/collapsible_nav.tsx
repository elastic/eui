import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type EuiCollapsibleNavProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {};

export const EuiCollapsibleNav: FunctionComponent<EuiCollapsibleNavProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiCollapsibleNav', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
