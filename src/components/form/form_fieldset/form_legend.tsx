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

import React, { HTMLAttributes, FunctionComponent, ReactNode } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';
import { EuiScreenReaderOnly } from '../../accessibility';

export type EuiFormLegendProps = HTMLAttributes<HTMLLegendElement> &
  CommonProps & {
    /**
     * ReactNode to render as this component's content
     */
    children: ReactNode;
    /**
     * For a hidden legend that is still visible to the screen reader, set to 'hidden'
     */
    display?: 'hidden' | 'visible';
    compressed?: boolean;
  };

export const EuiFormLegend: FunctionComponent<EuiFormLegendProps> = ({
  children,
  className,
  display = 'visible',
  compressed,
  ...rest
}) => {
  const isLegendHidden = display === 'hidden';
  const classes = classNames(
    'euiFormLegend',
    {
      'euiFormLegend-isHidden': isLegendHidden,
      'euiFormLegend--compressed': compressed,
    },
    className
  );

  return (
    <legend className={classes} {...rest}>
      {isLegendHidden ? (
        <EuiScreenReaderOnly>
          <span>{children}</span>
        </EuiScreenReaderOnly>
      ) : (
        children
      )}
    </legend>
  );
};
