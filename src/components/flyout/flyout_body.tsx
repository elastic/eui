import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export const EuiFlyoutBody: FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiFlyoutBody', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
