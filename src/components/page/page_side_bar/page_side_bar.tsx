import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export interface EuiPageSideBarProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {}

export const EuiPageSideBar: FunctionComponent<EuiPageSideBarProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiPageSideBar', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
