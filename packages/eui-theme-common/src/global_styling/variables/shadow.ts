/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { ColorModeSwitch } from '../../services/theme/types';

export const EuiThemeShadowSizes = [
  'xs',
  's',
  'm',
  'l',
  'xl',
  `xlHover`,
] as const;

export type _EuiThemeShadowSize = (typeof EuiThemeShadowSizes)[number];

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
    xlHover:
      'Special size to be used exclusively as hovered state for the `xl` size',
  };

export interface _EuiThemeShadowCustomColor {
  color?: string;
  property?: 'box-shadow' | 'filter';
  borderAllInHighContrastMode?: boolean;
}

/**
 * Represents a single shadow
 * @see https://tr.designtokens.org/format/#shadow
 */
export type _EuiThemeShadowLayer = {
  color: string;
  opacity: number;
  x: number;
  y: number;
  blur: number;
  spread: number;
};

export type _EuiThemeShadow = {
  /** An array of shadows, 3 by design */
  values: ColorModeSwitch<_EuiThemeShadowLayer[]>;
  /** Default direction of the shadow */
  down: CSSProperties['boxShadow'];
  /** Reverse direction */
  up: CSSProperties['boxShadow'];
};

export type _EuiThemeShadows = {
  xs: _EuiThemeShadow;
  s: _EuiThemeShadow;
  m: _EuiThemeShadow;
  l: _EuiThemeShadow;
  xl: _EuiThemeShadow;
  xlHover: _EuiThemeShadow;
  /** Not in the spec, defined only to support the legacy `euiShadowFlat` mixin */
  flat?: _EuiThemeShadow;
};
