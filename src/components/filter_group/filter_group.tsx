import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiFilterGroupProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    children?: ReactNode;
    /**
     * Expand the whole bar to fill its parent's width
     */
    fullWidth?: boolean;
  };

export const EuiFilterGroup: FunctionComponent<EuiFilterGroupProps> = ({
  children,
  className,
  fullWidth = false,
  ...rest
}) => {
  const classes = classNames(
    'euiFilterGroup',
    {
      'euiFilterGroup--fullWidth': fullWidth,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
