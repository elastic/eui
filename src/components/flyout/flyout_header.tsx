import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiFlyoutHeaderProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    hasBorder?: boolean;
  };

// TODO: SFC => FunctionalComponent
export const EuiFlyoutHeader: FunctionComponent<EuiFlyoutHeaderProps> = ({
  children,
  className,
  hasBorder = false,
  ...rest
}) => {
  const classes = classNames(
    'euiFlyoutHeader',
    {
      'euiFlyoutHeader--hasBorder': hasBorder,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
