import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export interface EuiPopoverTitleProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {}

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
