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
import { EuiIcon, IconType } from '../icon';

const sizeToClassNameMap = {
  m: 'euiLoadingLogo--medium',
  l: 'euiLoadingLogo--large',
  xl: 'euiLoadingLogo--xLarge',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiLoadingLogoProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    size?: keyof typeof sizeToClassNameMap;
    /**
     * While this component should be restricted to using logo icons, it works with any IconType
     */
    logo?: IconType;
  };

export const EuiLoadingLogo: FunctionComponent<EuiLoadingLogoProps> = ({
  size = 'm',
  logo = 'logoKibana',
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiLoadingLogo',
    sizeToClassNameMap[size],
    className
  );

  return (
    <span className={classes} {...rest}>
      <span className="euiLoadingLogo__icon">
        <EuiIcon type={logo} size={size} />
      </span>
    </span>
  );
};
