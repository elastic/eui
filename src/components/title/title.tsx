import React, { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { keysOf } from '../common';

const titleSizeToClassNameMap = {
  xxxs: 'euiTitle--xxxsmall',
  xxs: 'euiTitle--xxsmall',
  xs: 'euiTitle--xsmall',
  s: 'euiTitle--small',
  m: 'euiTitle--medium',
  l: 'euiTitle--large',
};

export const TITLE_SIZES = keysOf(titleSizeToClassNameMap);
export type EuiTitleSize = keyof typeof titleSizeToClassNameMap;

const textTransformToClassNameMap = {
  none: '',
  uppercase: 'euiTitle--uppercase',
};

export const TEXT_TRANSFORM = keysOf(textTransformToClassNameMap);
export type EuiTitleTextTransform = keyof typeof textTransformToClassNameMap;

export interface EuiTitleProps {
  children: ReactElement<any>;
  className?: string;
  size?: EuiTitleSize;
  textTransform?: EuiTitleTextTransform;
}

export const EuiTitle: FunctionComponent<EuiTitleProps> = ({
  size = 'm',
  children,
  className,
  textTransform = 'none',
  ...rest
}) => {
  const classes = classNames(
    'euiTitle',
    titleSizeToClassNameMap[size],
    textTransformToClassNameMap[textTransform],
    className
  );

  const props = {
    className: classes,
    ...rest,
  };

  return React.cloneElement(children, props);
};
