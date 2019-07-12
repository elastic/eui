import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

export type EuiRangeWrapperProps = HTMLAttributes<HTMLDivElement> & {
  fullWidth?: boolean;
};

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
