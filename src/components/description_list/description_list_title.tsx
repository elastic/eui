import React, { HTMLAttributes, SFC } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export const EuiDescriptionListTitle: SFC<CommonProps & HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiDescriptionList__title', className);

  return (
    <dt
      className={classes}
      {...rest}
    >
      {children}
    </dt>
  );
};
