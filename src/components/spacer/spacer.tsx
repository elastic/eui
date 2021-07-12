/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

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

export const EuiSpacer: FunctionComponent<EuiSpacerProps> = ({
  className,
  size = 'l',
  ...rest
}) => {
  const classes = classNames('euiSpacer', sizeToClassNameMap[size], className);

  return <div className={classes} {...rest} />;
};
