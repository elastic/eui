import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export interface EuiPopoverFooterProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {}

export const EuiPopoverFooter: FunctionComponent<EuiPopoverFooterProps> = ({
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
