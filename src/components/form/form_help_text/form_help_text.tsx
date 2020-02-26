import React, { FunctionComponent, HTMLAttributes } from 'react';

import classNames from 'classnames';
import { CommonProps } from '../../common';

export type EuiFormHelpTextProps = CommonProps & HTMLAttributes<HTMLDivElement>;

export const EuiFormHelpText: FunctionComponent<EuiFormHelpTextProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiFormHelpText', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
