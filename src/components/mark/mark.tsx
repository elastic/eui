import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
export type EuiMarkProps = HTMLAttributes<HTMLElement> &
  CommonProps & {
    children: string;
  };

export const EuiMark: FunctionComponent<EuiMarkProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiMark', className);

  return (
    <mark className={classes} {...rest}>
      {children}
    </mark>
  );
};
