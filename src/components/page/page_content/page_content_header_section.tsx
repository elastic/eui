import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export const EuiPageContentHeaderSection: FunctionComponent<CommonProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiPageContentHeaderSection', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
