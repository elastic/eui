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

import { EuiIcon, IconColor } from '../icon';

import { EuiFlexGroup, EuiFlexItem } from '../flex';

const sizeToClassNameMap = {
  xs: 'euiHealth--textSizeXS',
  s: 'euiHealth--textSizeS',
  m: 'euiHealth--textSizeM',
  inherit: 'euiHealth--textSizeInherit',
};

export const TEXT_SIZES = keysOf(sizeToClassNameMap);

export type EuiHealthProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Sets the color of the dot icon.
     * It accepts any `IconColor`: `default`, `primary`, `success`, `accent`, `warning`, `danger`, `text`,
     * `subdued` or `ghost`; or any valid CSS color value as a `string`
     * **`secondary` color is DEPRECATED, use `success` instead**
     */
    color?: IconColor;
    /**
     * Matches the text scales of EuiText.
     * The `inherit` style will get its font size from the parent element
     */
    textSize?: typeof TEXT_SIZES[number];
  };

export const EuiHealth: FunctionComponent<EuiHealthProps> = ({
  children,
  className,
  color,
  textSize = 's',
  ...rest
}) => {
  const classes = classNames(
    'euiHealth',
    textSize ? sizeToClassNameMap[textSize] : null,
    className
  );

  return (
    <div className={classes} {...rest}>
      <EuiFlexGroup gutterSize="xs" alignItems="center" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiIcon type="dot" color={color} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>{children}</EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
