/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

export type EuiHorizontalRuleSize = keyof typeof sizeToClassNameMap;
export type EuiHorizontalRuleMargin = keyof typeof marginToClassNameMap;

export interface EuiHorizontalRuleProps {
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

export const EuiHorizontalRule: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLHRElement> & EuiHorizontalRuleProps
> = ({ className, size = 'full', margin = 'l', ...rest }) => {
  const classes = classNames(
    'euiHorizontalRule',
    sizeToClassNameMap[size],
    marginToClassNameMap[margin],
    className
  );

  return <hr className={classes} {...rest} />;
};
