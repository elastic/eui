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

import React, { HTMLAttributes, Ref, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';

const gutterSizeToClassNameMap = {
  none: null,
  xs: 'euiBadgeGroup--gutterExtraSmall',
  s: 'euiBadgeGroup--gutterSmall',
};

export const GUTTER_SIZES = keysOf(gutterSizeToClassNameMap);
type BadgeGroupGutterSize = keyof typeof gutterSizeToClassNameMap;

export interface EuiBadgeGroupProps {
  /**
   * Space between badges
   */
  gutterSize?: BadgeGroupGutterSize;
  /**
   * Should be a list of EuiBadge's but can also be any other element
   * Will apply an extra class to add spacing
   */
  children?: ReactNode;
}

export const EuiBadgeGroup = React.forwardRef<
  HTMLDivElement,
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiBadgeGroupProps
>(
  (
    { children, className, gutterSize = 'xs', ...rest },
    ref: Ref<HTMLDivElement>
  ) => {
    const classes = classNames(
      'euiBadgeGroup',
      gutterSizeToClassNameMap[gutterSize as BadgeGroupGutterSize],
      className
    );

    return (
      <div className={classes} ref={ref} {...rest}>
        {React.Children.map(children, (child: ReactNode) => (
          <span className="euiBadgeGroup__item">{child}</span>
        ))}
      </div>
    );
  }
);

EuiBadgeGroup.displayName = 'EuiBadgeGroup';
