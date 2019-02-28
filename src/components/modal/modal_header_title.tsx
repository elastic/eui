import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { CommonProps } from '../common';

export type EuiModalHeaderTitleProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiModalHeaderTitle: EuiModalHeaderTitleProps = ({
  className,
  children,
  ...rest
}) => {
  const classes = classnames('euiModalHeader__title', className);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
