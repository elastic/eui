import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps, keysOf } from '../common';
import classNames from 'classnames';

const sizeToClassNameMap = {
  s: 'euiLoadingSpinner--small',
  m: 'euiLoadingSpinner--medium',
  l: 'euiLoadingSpinner--large',
  xl: 'euiLoadingSpinner--xLarge',
};

export type EuiLoadingSpinnerComponentType = 'div' | 'span' | 'figure';

interface EuiLoadingSpinnerComponentProps {
  size?: EuiLoadingSpinnerSize;
  component?: EuiLoadingSpinnerComponentType;
}

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiLoadingSpinnerSize = keyof typeof sizeToClassNameMap;
export const EuiLoadingSpinner: FunctionComponent<
  CommonProps &
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
    EuiLoadingSpinnerComponentProps
> = ({ size = 'm', className, component: Component = 'div', ...rest }) => {
  const classes = classNames(
    'euiLoadingSpinner',
    sizeToClassNameMap[size],
    className
  );

  return <Component className={classes} {...rest} />;
};
