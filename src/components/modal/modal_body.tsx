import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { CommonProps } from '../common';

export const EuiModalBody: FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
> = ({ className, children, ...rest }) => {
  const classes = classnames('euiModalBody', className);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
