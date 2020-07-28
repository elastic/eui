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

// below comment line is required
// it tells babel how to convert properly
import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { css } from '@emotion/core';
import usePropagate from '../../services/propagate/use_propagate';

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

const sizeToCssMap = {
  full: {
    width: '100%',
  },
  half: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  quarter: {
    width: '25%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
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

const marginToVariableMap = {
  xs: 'euiSizeS',
  s: 'euiSizeM',
  m: 'euiSize',
  l: 'euiSizeL',
  xl: 'euiSizeXL',
  xxl: 'euiSizeXXL',
};

export const MARGINS = Object.keys(marginToClassNameMap);

export const EuiHorizontalRule: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLHRElement> & EuiHorizontalRuleProps
> = ({ className, size = 'full', margin = 'l', ...rest }) => {
  const [borders, sizes] = usePropagate(['borders', 'sizes']);

  const horizontalRuleMargin =
    margin !== 'none' ? sizes[marginToVariableMap[margin]] : undefined;

  const horizontalRuleBase = css`
    background-color: ${borders.euiBorderColor};
    margin: ${horizontalRuleMargin} 0;
  `;

  // Wrapping style objects with the `css()` function appends the const name as a className
  const horizontalRuleSize = css(sizeToCssMap[size]);

  const classes = classNames(
    'euiHorizontalRule',
    sizeToClassNameMap[size],
    marginToClassNameMap[margin],
    className
  );

  return (
    <hr
      className={classes}
      css={[horizontalRuleBase, horizontalRuleSize]}
      {...rest}
    />
  );
};
