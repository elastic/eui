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

import React, { HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

const displayToClassNameMap = {
  condensed: 'euiTabs--condensed',
  default: null,
};

export const DISPLAYS = keysOf(displayToClassNameMap);

export type EuiTabsDisplaySizes = keyof typeof displayToClassNameMap;

const sizeToClassNameMap = {
  s: 'euiTabs--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiTabsSizes = keyof typeof sizeToClassNameMap;

export type EuiTabsProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * Choose `default` or alternative `condensed` display styles
     */
    display?: EuiTabsDisplaySizes;
    /**
     * Evenly stretches each tab to fill the
     * horizontal space
     */
    expand?: boolean;
    size?: EuiTabsSizes;
  };

export type EuiTabRef = HTMLDivElement;

export const EuiTabs = React.forwardRef<
  EuiTabRef,
  PropsWithChildren<EuiTabsProps>
>(
  (
    {
      children,
      className,
      display = 'default',
      expand = false,
      size = 'm',
      ...rest
    }: PropsWithChildren<EuiTabsProps>,
    ref
  ) => {
    const classes = classNames(
      'euiTabs',
      displayToClassNameMap[display],
      sizeToClassNameMap[size],
      {
        'euiTabs--expand': expand,
      },
      className
    );

    return (
      <div ref={ref} role="tablist" className={classes} {...rest}>
        {children}
      </div>
    );
  }
);

EuiTabs.displayName = 'EuiTabs';
