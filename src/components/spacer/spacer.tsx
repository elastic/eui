import React from 'react';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { CommonProps } from '../common';

const sizeToClassNameMap = {
  xs: 'euiSpacer--xs',
  s: 'euiSpacer--s',
  m: 'euiSpacer--m',
  l: 'euiSpacer--l',
  xl: 'euiSpacer--xl',
  xxl: 'euiSpacer--xxl',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export type SpacerSize = keyof typeof sizeToClassNameMap;

export type EuiSpacerProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    size?: SpacerSize;
  };

export const EuiSpacer: React.SFC<EuiSpacerProps> = ({
  className,
  size,
  ...rest
}) => {
  const classes = classNames(
    'euiSpacer',
    size ? sizeToClassNameMap[size] : undefined,
    className
  );

  return <div className={classes} {...rest} />;
};

EuiSpacer.defaultProps = {
  size: 'l',
};
