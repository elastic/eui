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

export type EuiHorizontalRuleSize = keyof typeof sizeToClassNameMap;
export type EuiHorizontalRuleMargin = keyof typeof marginToClassNameMap;

export interface EuiHorizontalRuleProps
  extends CommonProps,
    HTMLAttributes<HTMLHRElement> {
  /**
   * Defines the width of the HR.
   */
  size?: EuiHorizontalRuleSize;
  margin?: EuiHorizontalRuleMargin;
}

const sizeToClassNameMap = {
  full: 'euiHorizontalRule--full',
  half: 'euiHorizontalRule--half',
  quarter: 'euiHorizontalRule--quarter',
};

export const SIZES = Object.keys(sizeToClassNameMap);

const marginToClassNameMap = {
  none: null,
  xs: 'euiHorizontalRule--marginXSmall',
  s: 'euiHorizontalRule--marginSmall',
  m: 'euiHorizontalRule--marginMedium',
  l: 'euiHorizontalRule--marginLarge',
  xl: 'euiHorizontalRule--marginXLarge',
  xxl: 'euiHorizontalRule--marginXXLarge',
};

export const MARGINS = Object.keys(marginToClassNameMap);

export const EuiHorizontalRule: FunctionComponent<EuiHorizontalRuleProps> = ({
  className,
  size = 'full',
  margin = 'l',
  ...rest
}) => {
  const classes = classNames(
    'euiHorizontalRule',
    sizeToClassNameMap[size],
    marginToClassNameMap[margin],
    className
  );

  return <hr className={classes} {...rest} />;
};
