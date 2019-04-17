import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiFlyoutBodyProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiFlyoutBody: EuiFlyoutBodyProps = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiFlyoutBody', className);

  return (
    <div className={classes} {...rest}>
      <div className="euiFlyoutBody__overflow">{children}</div>
    </div>
  );
};
