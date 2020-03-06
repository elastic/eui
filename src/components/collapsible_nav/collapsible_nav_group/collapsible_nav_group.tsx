import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';

export type EuiCollapsibleNavGroupProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {};

export const EuiCollapsibleNavGroup: FunctionComponent<
  EuiCollapsibleNavGroupProps
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiCollapsibleNavGroup', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
