import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { CommonProps } from '../common';

export type EuiModalBodyProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiModalBody: EuiModalBodyProps = ({
  className,
  children,
  ...rest
}) => {
  const classes = classnames('euiModalBody', className);
  return (
    <div className={classes} {...rest}>
      <div className="euiModalBody__overflow">{children}</div>
    </div>
  );
};
