/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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
  /**
   * ReactElement to render as this component's content
   */
  children: ReactElement<any>;
  size?: EuiTitleSize;
  textTransform?: EuiTitleTextTransform;
  id?: string;
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
    className,
    children.props.className
  );

  const props = {
    className: classes,
    ...rest,
  };

  return React.cloneElement(children, props);
};
