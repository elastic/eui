/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, Ref, forwardRef, useEffect } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { useEuiMemoizedStyles } from '../../services';
import { euiFlexGroupStyles } from './flex_group.styles';

export const GUTTER_SIZES = ['none', 'xs', 's', 'm', 'l', 'xl'] as const;
export type EuiFlexGroupGutterSize = (typeof GUTTER_SIZES)[number];

export const ALIGN_ITEMS = [
  'stretch',
  'flexStart',
  'flexEnd',
  'center',
  'baseline',
] as const;
export type FlexGroupAlignItems = (typeof ALIGN_ITEMS)[number];

export const JUSTIFY_CONTENTS = [
  'flexStart',
  'flexEnd',
  'center',
  'spaceBetween',
  'spaceAround',
  'spaceEvenly',
] as const;
type FlexGroupJustifyContent = (typeof JUSTIFY_CONTENTS)[number];

export const DIRECTIONS = [
  'row',
  'rowReverse',
  'column',
  'columnReverse',
] as const;
type FlexGroupDirection = (typeof DIRECTIONS)[number];

export const COMPONENT_TYPES = ['div', 'span'] as const;
type FlexGroupComponentType = (typeof COMPONENT_TYPES)[number];

export interface EuiFlexGroupProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  alignItems?: FlexGroupAlignItems;
  component?: FlexGroupComponentType;
  direction?: FlexGroupDirection;
  gutterSize?: EuiFlexGroupGutterSize;
  justifyContent?: FlexGroupJustifyContent;
  responsive?: boolean;
  wrap?: boolean;
}

export const EuiFlexGroup = forwardRef<
  HTMLDivElement | HTMLSpanElement,
  EuiFlexGroupProps
>(
  (
    {
      children,
      className,
      gutterSize = 'l',
      alignItems = 'stretch',
      responsive = true,
      justifyContent = 'flexStart',
      direction = 'row',
      wrap = false,
      component = 'div',
      ...rest
    },
    ref: Ref<HTMLDivElement> | Ref<HTMLSpanElement>
  ) => {
    const styles = useEuiMemoizedStyles(euiFlexGroupStyles);
    const cssStyles = [
      styles.euiFlexGroup,
      responsive && !direction.includes('column') && styles.responsive,
      wrap && styles.wrap,
      styles.gutterSizes[gutterSize],
      styles.justifyContent[justifyContent],
      styles.alignItems[alignItems],
      styles.direction[direction],
    ];

    const classes = classNames('euiFlexGroup', className);

    useEffect(() => {
      if (!COMPONENT_TYPES.includes(component)) {
        throw new Error(
          `${component} is not a valid element type. Use \`div\` or \`span\`.`
        );
      }
    }, [component]);

    return component === 'span' ? (
      <span
        css={cssStyles}
        className={classes}
        ref={ref as Ref<HTMLSpanElement>}
        {...rest}
      >
        {children}
      </span>
    ) : (
      <div
        css={cssStyles}
        className={classes}
        ref={ref as Ref<HTMLDivElement>}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
EuiFlexGroup.displayName = 'EuiFlexGroup';
