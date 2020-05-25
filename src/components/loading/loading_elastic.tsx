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
