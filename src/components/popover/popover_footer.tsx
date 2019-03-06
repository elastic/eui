import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiPopoverFooterProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiPopoverFooter: EuiPopoverFooterProps = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiPopoverFooter', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
