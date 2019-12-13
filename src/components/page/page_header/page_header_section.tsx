import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export const EuiPageHeaderSection: FunctionComponent<CommonProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiPageHeaderSection', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
