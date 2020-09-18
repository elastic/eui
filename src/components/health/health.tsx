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
import { CommonProps, keysOf } from '../common';

import { EuiIcon } from '../icon';

import { EuiFlexGroup, EuiFlexItem } from '../flex';

const colorToClassMap = {
  default: null,
  primary: 'euiHealth--primary',
  secondary: 'euiHealth--secondary',
  success: 'euiHealth--success',
  accent: 'euiHealth--accent',
  warning: 'euiHealth--warning',
  danger: 'euiHealth--danger',
  text: 'euiHealth--text',
  subdued: 'euiHealth--subdued',
  ghost: 'euiHealth--ghost',
};

export const COLORS: NamedColor[] = keysOf(colorToClassMap);

type NamedColor = keyof typeof colorToClassMap;

// We accept arbitrary color strings, which are impossible to type.
export type HealthColor = string | NamedColor;

type EuiHealthProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Sets the color of the dot icon.
     * It accepts one of EUI's color palette: `default`, `primary`, `secondary`, `success`, `accent`, `warning`, `danger`, `text`,
     * `subdued` or `ghost`; or any valid CSS color value as a `string`
     */
    color?: HealthColor;
  };

function isNamedColor(name: string): name is NamedColor {
  return colorToClassMap.hasOwnProperty(name);
}

export const EuiHealth: FunctionComponent<EuiHealthProps> = ({
  children,
  className,
  color,
  ...rest
}) => {
  let healthColor: any = null;

  if (color) {
    if (isNamedColor(color)) {
      healthColor = { className: colorToClassMap[color] };
    } else {
      healthColor = { color: color };
    }
  }

  const classes = classNames('euiHealth', className);

  return (
    <div className={classes} {...rest}>
      <EuiFlexGroup gutterSize="xs" alignItems="center" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiIcon type="dot" {...healthColor} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>{children}</EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
