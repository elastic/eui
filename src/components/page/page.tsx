/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import {
  _EuiPageRestrictWidth,
  setPropsForRestrictedPageWidth,
} from './_restrict_width';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPage--paddingSmall',
  m: 'euiPage--paddingMedium',
  l: 'euiPage--paddingLarge',
};

const directionToClassNameMap = {
  row: null,
  column: 'euiPage--column',
};

export const SIZES = keysOf(paddingSizeToClassNameMap);
export const DIRECTIONS = keysOf(directionToClassNameMap);

export interface EuiPageProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement>,
    _EuiPageRestrictWidth {
  /**
   * Adjust the padding.
   * When using this setting it's best to be consistent throughout all similar usages
   */
  paddingSize?: typeof SIZES[number];
  /**
   * Adds `flex-grow: 1` to the whole page for stretching to fit vertically.
   * Must be wrapped inside a flexbox, preferrably with `min-height: 100vh`
   */
  grow?: boolean;
  /**
   * Changes the `flex-direction` property.
   * Flip to `column` when not including a sidebar.
   */
  direction?: 'row' | 'column';
}

export const EuiPage: FunctionComponent<EuiPageProps> = ({
  children,
  restrictWidth = false,
  style,
  className,
  paddingSize = 'm',
  grow = true,
  direction = 'row',
  ...rest
}) => {
  const { widthClassName, newStyle } = setPropsForRestrictedPageWidth(
    restrictWidth,
    style
  );

  const classes = classNames(
    'euiPage',
    paddingSizeToClassNameMap[paddingSize],
    directionToClassNameMap[direction],
    {
      'euiPage--grow': grow,
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
