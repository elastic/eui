import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export interface EuiPageHeaderSectionProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {}

export const EuiPageHeaderSection: FunctionComponent<
  EuiPageHeaderSectionProps
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiPageHeaderSection', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
