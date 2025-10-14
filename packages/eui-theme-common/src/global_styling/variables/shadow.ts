/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { ColorModeSwitch } from '../../services/theme/types';

export const EuiThemeShadowSizes = ['xs', 's', 'm', 'l', 'xl'] as const;
export type _EuiThemeShadowSize = (typeof EuiThemeShadowSizes)[number];

export const EuiThemeShadowHoverSizes = ['s', 'm', 'l', 'xl', 'xxl'] as const;
export type _EuiThemeShadowHoverSize =
  (typeof EuiThemeShadowHoverSizes)[number];

/**
 * Shadow t-shirt sizes descriptions
 */
export const _EuiShadowSizesDescriptions: Record<_EuiThemeShadowSize, string> =
  {
    xs: 'Very subtle shadow used on small components.',
    s: 'Adds subtle depth, usually used in conjunction with a border.',
    m: 'Used on small sized portalled content like popovers.',
    l: 'Primary shadow used in most cases to add visible depth.',
    xl: 'Very large shadows used for large portalled style containers like modals and flyouts.',
  };

export interface _EuiThemeShadowCustomColor {
  color?: string;
  property?: 'box-shadow' | 'filter';
  borderAllInHighContrastMode?: boolean;
}

export type _EuiThemeShadow = {
  /** Default direction of the shadow */
  down: CSSProperties['boxShadow'];
  /** Reverse direction */
  up: CSSProperties['boxShadow'];
};

export type _EuiThemeShadows = ColorModeSwitch<{
  colors: {
    base: string;
  };
  xs: _EuiThemeShadow;
  s: _EuiThemeShadow;
  m: _EuiThemeShadow;
  l: _EuiThemeShadow;
  xl: _EuiThemeShadow;
  hover: {
    base: _EuiThemeShadow;
    xl: _EuiThemeShadow;
  };
  /** @deprecated - Defined only to support the legacy `euiShadowFlat` mixin;
   * will be removed in the future
   */
  flat: _EuiThemeShadow;
}>;

/**
 * Represents a single shadow
 * @see https://tr.designtokens.org/format/#shadow
 */
export type _EuiThemeShadowLayer = {
  opacity: number;
  x: number;
  y: number;
  blur: number;
  spread: number;
};

export type _EuiThemeShadowPrimitive = {
  light: _EuiThemeShadowLayer[];
  dark: _EuiThemeShadowLayer[];
};

export type _EuiThemeShadowPrimitives = {
  xs: _EuiThemeShadowPrimitive;
  s: _EuiThemeShadowPrimitive;
  m: _EuiThemeShadowPrimitive;
  l: _EuiThemeShadowPrimitive;
  xl: _EuiThemeShadowPrimitive;
  xxl: _EuiThemeShadowPrimitive;
  flat: _EuiThemeShadowPrimitive;
};
