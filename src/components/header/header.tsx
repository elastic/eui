import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

export const EuiHeader: FunctionComponent<CommonProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiHeader', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
