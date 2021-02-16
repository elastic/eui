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
import { CommonProps, keysOf } from '../../common';
import {
  _EuiPageRestrictWidth,
  setPropsForRestrictedPageWidth,
} from '../_restrict_width';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPage--paddingSmall',
  m: 'euiPage--paddingMedium',
  l: 'euiPage--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export interface EuiPageContentBodyProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement>,
    _EuiPageRestrictWidth {
  /**
   * Adjust the padding.
   * When using this setting it's best to be consistent throughout all similar usages
   */
  paddingSize?: typeof PADDING_SIZES[number];
}

export const EuiPageContentBody: FunctionComponent<EuiPageContentBodyProps> = ({
  children,
  restrictWidth = false,
  paddingSize = 'none',
  style,
  className,
  ...rest
}) => {
  const { widthClassName, newStyle } = setPropsForRestrictedPageWidth(
    restrictWidth,
    style
  );

  const classes = classNames(
    'euiPageContentBody',
    paddingSizeToClassNameMap[paddingSize],
    {
      [`euiPage--${widthClassName}`]: widthClassName,
    },
    className
  );

  return (
    <div className={classes} style={newStyle || style} {...rest}>
      {children}
    </div>
  );
};
