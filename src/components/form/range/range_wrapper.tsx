import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

export interface EuiRangeWrapperProps {
  className?: string;
  fullWidth?: boolean;
}

export const EuiRangeWrapper: FunctionComponent<EuiRangeWrapperProps> = ({
  children,
  className,
  fullWidth,
}) => {
  const classes = classNames(
    'euiRangeWrapper',
    {
      'euiRangeWrapper--fullWidth': fullWidth,
    },
    className
  );

  return <div className={classes}>{children}</div>;
};
