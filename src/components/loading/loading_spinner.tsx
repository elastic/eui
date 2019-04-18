import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps, keysOf } from '../common';
import classNames from 'classnames';

const sizeToClassNameMap = {
  s: 'euiLoadingSpinner--small',
  m: 'euiLoadingSpinner--medium',
  l: 'euiLoadingSpinner--large',
  xl: 'euiLoadingSpinner--xLarge',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiLoadingSpinnerSize = keyof typeof sizeToClassNameMap;

export const EuiLoadingSpinner: FunctionComponent<
  CommonProps &
    HTMLAttributes<HTMLDivElement> & {
      size?: EuiLoadingSpinnerSize;
    }
> = ({ size = 'm', className, ...rest }) => {
  const classes = classNames(
    'euiLoadingSpinner',
    sizeToClassNameMap[size],
    className
  );

  return <span className={classes} {...rest} />;
};
