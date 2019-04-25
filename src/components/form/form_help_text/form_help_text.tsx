import React, { FunctionComponent, HTMLAttributes } from 'react';

import classNames from 'classnames';
import { CommonProps } from '../../common';

export const EuiFormHelpText: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiFormHelpText', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
