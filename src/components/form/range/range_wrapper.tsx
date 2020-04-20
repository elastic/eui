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

import React, { HTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export interface EuiRangeWrapperProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
  compressed?: boolean;
}

export const EuiRangeWrapper = forwardRef<HTMLDivElement, EuiRangeWrapperProps>(
  ({ children, className, fullWidth, compressed, ...rest }, ref) => {
    const classes = classNames(
      'euiRangeWrapper',
      {
        'euiRangeWrapper--fullWidth': fullWidth,
        'euiRangeWrapper--compressed': compressed,
      },
      className
    );

    return (
      <div className={classes} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);
