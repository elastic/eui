import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export interface EuiPageContentHeaderSectionProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {}

export const EuiPageContentHeaderSection: FunctionComponent<
  EuiPageContentHeaderSectionProps
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiPageContentHeaderSection', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
