import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export interface EuiPageContentBodyProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {}

export const EuiPageContentBody: FunctionComponent<EuiPageContentBodyProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiPageContentBody', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
