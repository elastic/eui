import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export interface EuiPopoverFooterProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

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
