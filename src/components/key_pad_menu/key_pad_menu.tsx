import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

export type EuiKeyPadMenuProps = CommonProps & HTMLAttributes<HTMLDivElement>;

export const EuiKeyPadMenu: FunctionComponent<EuiKeyPadMenuProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiKeyPadMenu', className);

  return (
    <div className={classes} role="menu" {...rest}>
      {children}
    </div>
  );
};
