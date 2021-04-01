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

import { CommonProps } from '../../common';

type HeaderSectionSide = 'left' | 'right';

const sideToClassNameMap: { [side in HeaderSectionSide]: string } = {
  left: 'euiHeaderSection--left',
  right: 'euiHeaderSection--right',
};

export type EuiHeaderSectionProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    side?: HeaderSectionSide;
    grow?: boolean;
  };

export const EuiHeaderSection: FunctionComponent<EuiHeaderSectionProps> = ({
  side = 'left',
  children,
  className,
  grow = false,
  ...rest
}) => {
  const classes = classNames(
    'euiHeaderSection',
    {
      'euiHeaderSection--grow': grow,
      'euiHeaderSection--dontGrow': !grow,
    },
    sideToClassNameMap[side],
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
