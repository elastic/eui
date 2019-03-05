import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiPopoverTitleProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiPopoverTitle: EuiPopoverTitleProps = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiPopoverTitle', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
