/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { EuiIcon } from '../icon';

const sizeToClassNameMap = {
  m: 'euiLoadingElastic--medium',
  l: 'euiLoadingElastic--large',
  xl: 'euiLoadingElastic--xLarge',
  xxl: 'euiLoadingElastic--xxLarge',
};

export const SIZES = keysOf(sizeToClassNameMap);

export interface EuiLoadingElasticProps {
  size?: keyof typeof sizeToClassNameMap;
}

export const EuiLoadingElastic: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiLoadingElasticProps
> = ({ size = 'm', className, ...rest }) => {
  const classes = classNames(
    'euiLoadingElastic',
    sizeToClassNameMap[size],
    className
  );

  return (
    <span className={classes} {...rest}>
      <EuiIcon type="logoElastic" size={size} />
    </span>
  );
};
