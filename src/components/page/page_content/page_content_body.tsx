import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export const EuiPageContentBody: FunctionComponent<CommonProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiPageContentBody', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
