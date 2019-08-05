import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiSubStepsProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiSubSteps: EuiSubStepsProps = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiSubSteps', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
