import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

export type EuiHeaderProps = CommonProps & HTMLAttributes<HTMLDivElement>;

export const EuiHeader: FunctionComponent<EuiHeaderProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiHeader', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
