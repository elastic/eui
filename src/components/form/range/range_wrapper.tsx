import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

export interface EuiRangeWrapperProps {
  className?: string;
  fullWidth?: boolean;
  compressed?: boolean;
}

export const EuiRangeWrapper: FunctionComponent<EuiRangeWrapperProps> = ({
  children,
  className,
  fullWidth,
  compressed,
}) => {
  const classes = classNames(
    'euiRangeWrapper',
    {
      'euiRangeWrapper--fullWidth': fullWidth,
      'euiRangeWrapper--compressed': compressed,
    },
    className
  );

  return <div className={classes}>{children}</div>;
};
