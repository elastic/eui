/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, HTMLAttributes, Ref, ReactNode } from 'react';
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

export const EuiBadgeGroup = forwardRef<
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
