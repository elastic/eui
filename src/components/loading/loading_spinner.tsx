import React, { SFC, HTMLAttributes } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type EuiLoadingSpinnerSize = 's' | 'm' | 'l' | 'xl';

const sizeToClassNameMap = {
  s: 'euiLoadingSpinner--small',
  m: 'euiLoadingSpinner--medium',
  l: 'euiLoadingSpinner--large',
  xl: 'euiLoadingSpinner--xLarge',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiLoadingSpinner: SFC<
  CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      size?: EuiLoadingSpinnerSize;
    }
> = ({ children, size, className, ...rest }) => {
  const classes = classNames(
    'euiLoadingSpinner',
    size ? sizeToClassNameMap[size] : '',
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiLoadingSpinner.defaultProps = {
  size: 'm',
};
