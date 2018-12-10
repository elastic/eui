import React, { HTMLAttributes, SFC } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export const EuiDescriptionListDescription: SFC<CommonProps & HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiDescriptionList__description', className);

  return (
    <dd
      className={classes}
      {...rest}
    >
      {children}
    </dd>
  );
};
