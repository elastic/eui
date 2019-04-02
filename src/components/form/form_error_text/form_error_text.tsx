import React, { FunctionComponent, HTMLAttributes } from 'react';

import classNames from 'classnames';
import { CommonProps } from '../../common';

export const EuiFormErrorText: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiFormErrorText', className);

  return (
    <div className={classes} aria-live="polite" {...rest}>
      {children}
    </div>
  );
};
