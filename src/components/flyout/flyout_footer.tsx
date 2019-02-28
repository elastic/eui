import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiFlyoutFooterProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiFlyoutFooter: EuiFlyoutFooterProps = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiFlyoutFooter', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
