import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { CommonProps } from '../common';

export const EuiModalHeader: FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
> = ({ className, children, ...rest }) => {
  const classes = classnames('euiModalHeader', className);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
