/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren, ComponentType, ComponentProps } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';
import {
  _EuiPageRestrictWidth,
  setPropsForRestrictedPageWidth,
} from '../_restrict_width';
import { EuiPanel, EuiPanelProps } from '../../panel';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPageBody--paddingSmall',
  m: 'euiPageBody--paddingMedium',
  l: 'euiPageBody--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

type ComponentTypes = keyof JSX.IntrinsicElements | ComponentType<any>;

export type EuiPageBodyProps<T extends ComponentTypes = 'main'> = CommonProps &
  ComponentProps<T> &
  _EuiPageRestrictWidth & {
    /**
     * Sets the HTML element for `EuiPageBody`.
     */
    component?: T;
    /**
     * Uses an EuiPanel as the main component instead of a plain div
     */
    panelled?: boolean;
    /**
     * Extends any extra EuiPanel props if `panelled=true`
     */
    panelProps?: Omit<EuiPanelProps, 'paddingSize'>;
    /**
     * Adjusts the padding
     */
    paddingSize?: typeof PADDING_SIZES[number];
  };

export const EuiPageBody = <T extends ComponentTypes>({
  children,
  restrictWidth = false,
  style,
  className,
  component: Component = 'div' as T,
  panelled,
  panelProps,
  paddingSize,
  borderRadius = 'none',
  ...rest
}: PropsWithChildren<EuiPageBodyProps<T>>) => {
  const { widthClassName, newStyle } = setPropsForRestrictedPageWidth(
    restrictWidth,
    style
  );

  const nonBreakingDefaultPadding = panelled ? 'l' : 'none';
  paddingSize = paddingSize || nonBreakingDefaultPadding;

  const borderRadiusClass =
    borderRadius === 'none' ? 'euiPageBody--borderRadiusNone' : '';

  const classes = classNames(
    'euiPageBody',
    borderRadiusClass,
    // This may duplicate the padding styles from EuiPanel, but allows for some nested configurations in the CSS
    paddingSizeToClassNameMap[paddingSize as typeof PADDING_SIZES[number]],
    {
      [`euiPageBody--${widthClassName}`]: widthClassName,
    },
    className
  );

  return panelled ? (
    <EuiPanel
      className={classes}
      style={newStyle || style}
      borderRadius={borderRadius}
      paddingSize={paddingSize}
      {...panelProps}
      {...rest}>
      {children}
    </EuiPanel>
  ) : (
    <Component className={classes} style={newStyle || style} {...rest}>
      {children}
    </Component>
  );
};
