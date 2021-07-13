/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

const sizeToClassNameMap = {
  m: 'euiLoadingChart--medium',
  l: 'euiLoadingChart--large',
  xl: 'euiLoadingChart--xLarge',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiLoadingChartSize = keyof typeof sizeToClassNameMap;

export type EuiLoadingChartProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    size?: EuiLoadingChartSize;
    mono?: boolean;
  };

export const EuiLoadingChart: FunctionComponent<EuiLoadingChartProps> = ({
  size = 'm',
  mono = false,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiLoadingChart',
    { 'euiLoadingChart--mono': mono },
    className,
    sizeToClassNameMap[size]
  );

  return (
    <span className={classes} {...rest}>
      <span className="euiLoadingChart__bar" />
      <span className="euiLoadingChart__bar" />
      <span className="euiLoadingChart__bar" />
      <span className="euiLoadingChart__bar" />
    </span>
  );
};
