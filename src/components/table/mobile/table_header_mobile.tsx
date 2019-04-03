import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export const EuiTableHeaderMobile: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiTableHeaderMobile', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
