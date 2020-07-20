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

import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';

const colorToClassMap: { [color: string]: string | null } = {
  accent: null,
  subdued: 'euiNotificationBadge--subdued',
};

export const COLORS: BadgeNotificationColor[] = keysOf(colorToClassMap);
export type BadgeNotificationColor = keyof typeof colorToClassMap;

const sizeToClassNameMap = {
  s: null,
  m: 'euiNotificationBadge--medium',
};

export const SIZES: BadgeNotificationSize[] = keysOf(sizeToClassNameMap);
export type BadgeNotificationSize = keyof typeof sizeToClassNameMap;

export interface EuiNotificationBadgeProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  children: ReactNode;
  size?: BadgeNotificationSize;
  color?: BadgeNotificationColor;
}

export const EuiNotificationBadge: FunctionComponent<
  EuiNotificationBadgeProps
> = ({ children, className, size = 's', color = 'accent', ...rest }) => {
  const classes = classNames(
    'euiNotificationBadge',
    sizeToClassNameMap[size],
    colorToClassMap[color],
    className
  );

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};
