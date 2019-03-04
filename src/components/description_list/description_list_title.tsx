import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export const EuiDescriptionListTitle: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLElement>
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiDescriptionList__title', className);

  return (
    <dt className={classes} {...rest}>
      {children}
    </dt>
  );
};
