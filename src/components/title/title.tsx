import React, { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

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
  uppercase: 'euiTitle--uppercase',
};

export const TEXT_TRANSFORM = keysOf(textTransformToClassNameMap);
export type EuiTitleTextTransform = keyof typeof textTransformToClassNameMap;

export type EuiTitleProps = CommonProps & {
  children: ReactElement<any>;
  className?: string;
  size?: EuiTitleSize;
  textTransform?: EuiTitleTextTransform;
};

export const EuiTitle: FunctionComponent<EuiTitleProps> = ({
  size = 'm',
  children,
  className,
  textTransform,
  ...rest
}) => {
  const classes = classNames(
    'euiTitle',
    titleSizeToClassNameMap[size],
    textTransform ? textTransformToClassNameMap[textTransform] : undefined,
    className
  );

  const props = {
    className: classes,
    ...rest,
  };

  return React.cloneElement(children, props);
};
