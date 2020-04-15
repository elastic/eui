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

import React, {
  FunctionComponent,
  HTMLAttributes,
  ProgressHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../common';
import { isNil } from '../../services/predicate';

const sizeToClassNameMap = {
  xs: 'euiProgress--xs',
  s: 'euiProgress--s',
  m: 'euiProgress--m',
  l: 'euiProgress--l',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export type EuiProgressSize = keyof typeof sizeToClassNameMap;

const colorToClassNameMap = {
  primary: 'euiProgress--primary',
  secondary: 'euiProgress--secondary',
  danger: 'euiProgress--danger',
  subdued: 'euiProgress--subdued',
  accent: 'euiProgress--accent',
};

export const COLORS = Object.keys(colorToClassNameMap);

export type EuiProgressColor = keyof typeof colorToClassNameMap;

const positionsToClassNameMap = {
  fixed: 'euiProgress--fixed',
  absolute: 'euiProgress--absolute',
  static: '',
};

export const POSITIONS = Object.keys(positionsToClassNameMap);

export type EuiProgressPosition = keyof typeof positionsToClassNameMap;

export type EuiProgressProps = CommonProps & {
  size?: EuiProgressSize;
  color?: EuiProgressColor;
  position?: EuiProgressPosition;
};

type Indeterminate = EuiProgressProps & HTMLAttributes<HTMLDivElement>;

type Determinate = EuiProgressProps &
  ProgressHTMLAttributes<HTMLProgressElement> & {
    max?: number;
  };

export const EuiProgress: FunctionComponent<
  ExclusiveUnion<Determinate, Indeterminate>
> = ({
  className,
  color = 'secondary',
  size = 'm',
  position = 'static',
  max,
  value,
  ...rest
}) => {
  const determinate = !isNil(max);
  const classes = classNames(
    'euiProgress',
    {
      'euiProgress--indeterminate': !determinate,
      'euiProgress--native': determinate,
    },
    sizeToClassNameMap[size],
    colorToClassNameMap[color],
    positionsToClassNameMap[position],
    className
  );

  // Because of a Firefox animation issue, indeterminate progress needs to not use <progress />.
  // See https://css-tricks.com/html5-progress-element/
  if (determinate) {
    return (
      <progress
        className={classes}
        max={max}
        value={value}
        {...rest as ProgressHTMLAttributes<HTMLProgressElement>}
      />
    );
  } else {
    return (
      <div className={classes} {...rest as HTMLAttributes<HTMLDivElement>} />
    );
  }
};
