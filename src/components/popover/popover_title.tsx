import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export interface EuiPopoverTitleProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const EuiPopoverTitle: FunctionComponent<EuiPopoverTitleProps> = ({
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
