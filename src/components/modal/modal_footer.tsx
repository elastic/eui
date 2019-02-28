import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { CommonProps } from '../common';

export type EuiModalFooterProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiModalFooter: EuiModalFooterProps = ({
  className,
  children,
  ...rest
}) => {
  const classes = classnames('euiModalFooter', className);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
