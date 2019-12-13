import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export const EuiPageSideBar: FunctionComponent<CommonProps> = ({
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
