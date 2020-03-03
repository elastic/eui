import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';

export type EuiCollapsibleNavGroupListProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {};

export const EuiCollapsibleNavGroupList: FunctionComponent<
  EuiCollapsibleNavGroupListProps
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiCollapsibleNavGroupList', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
