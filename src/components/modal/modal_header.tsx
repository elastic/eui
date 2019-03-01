import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { CommonProps } from '../common';

export type EuiModalHeaderProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiModalHeader: EuiModalHeaderProps = ({
  className,
  children,
  ...rest
}) => {
  const classes = classnames('euiModalHeader', className);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
