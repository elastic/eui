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
import { EuiFlexGroup } from '../flex';

type FacetGroupLayout = 'vertical' | 'horizontal';

const layoutToClassNameMap: { [layout in FacetGroupLayout]: string } = {
  vertical: 'euiFacetGroup--vertical',
  horizontal: 'euiFacetGroup--horizontal',
};

export const LAYOUTS = keysOf(layoutToClassNameMap);

type FacetGroupGutterSize = 'none' | 's' | 'm' | 'l';

const gutterSizeToClassNameMap: {
  [gutterSize in FacetGroupGutterSize]: string;
} = {
  none: 'euiFacetGroup--gutterNone',
  s: 'euiFacetGroup--gutterSmall',
  m: 'euiFacetGroup--gutterMedium',
  l: 'euiFacetGroup--gutterLarge',
};

export const GUTTER_SIZES = keysOf(gutterSizeToClassNameMap);

export type EuiFacetGroupProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * Vertically in a column, or horizontally in one wrapping line
     */
    layout?: FacetGroupLayout;
    /**
     * Distance between facet buttons.
     * Horizontal layout always adds more distance horizontally between buttons.
     */
    gutterSize?: FacetGroupGutterSize;
  };

export const EuiFacetGroup: FunctionComponent<EuiFacetGroupProps> = ({
  children,
  className,
  layout = 'vertical',
  gutterSize = 'm',
  ...rest
}) => {
  const classes = classNames(
    'euiFacetGroup',
    layoutToClassNameMap[layout],
    gutterSizeToClassNameMap[gutterSize],
    className
  );
  const direction = layout === 'vertical' ? 'column' : 'row';
  const wrap = layout === 'vertical' ? false : true;

  return (
    <EuiFlexGroup
      className={classes}
      direction={direction}
      wrap={wrap}
      gutterSize="none"
      {...rest}>
      {children}
    </EuiFlexGroup>
  );
};
