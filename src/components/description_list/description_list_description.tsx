import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export const EuiDescriptionListDescription: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLElement>
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiDescriptionList__description', className);

  return (
    <dd className={classes} {...rest}>
      {children}
    </dd>
  );
};
