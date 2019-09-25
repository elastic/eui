import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

type Props = CommonProps & HTMLAttributes<HTMLDivElement>;

export const EuiKeyPadMenu: FunctionComponent<Props> = ({
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
