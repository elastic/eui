/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { UseEuiTheme } from '../../services/theme/types';
import { _EuiThemeShadowSize } from '../variables/shadow';

export interface EuiShadowOptions {
  /** @deprecated - has no effect */
  color?: string;
  /** @default `down` */
  direction?: 'down' | 'up';
  /** @deprecated - has no effect */
  property?: 'box-shadow' | 'filter';
  borderAllInHighContrastMode?: boolean;
}

/**
 * euiSlightShadow
 */
export const euiShadowXSmall = (
  { euiTheme, highContrastMode }: UseEuiTheme,
  options?: EuiShadowOptions
) => {
  if (highContrastMode) {
    return _highContrastBorder(euiTheme, options);
  }
  const direction = options?.direction ?? 'down';

  return `box-shadow: ${euiTheme.shadows.xs[direction]};`;
};

/**
 * bottomShadowSmall
 */
export const euiShadowSmall = (
  { euiTheme, highContrastMode }: UseEuiTheme,
  options?: EuiShadowOptions
) => {
  if (highContrastMode) {
    return _highContrastBorder(euiTheme, options);
  }
  const direction = options?.direction ?? 'down';

  return `box-shadow: ${euiTheme.shadows.s[direction]};`;
};

/**
 * bottomShadowMedium
 */
export const euiShadowMedium = (
  { euiTheme, highContrastMode }: UseEuiTheme,
  options?: EuiShadowOptions
) => {
  if (highContrastMode) {
    return _highContrastBorder(euiTheme, options);
  }
  const direction = options?.direction ?? 'down';
  const boxShadow = euiTheme.shadows.m[direction];

  return `box-shadow: ${boxShadow};`;
};

/**
 * bottomShadow
 */
export const euiShadowLarge = (
  { euiTheme, highContrastMode }: UseEuiTheme,
  options?: EuiShadowOptions
) => {
  if (highContrastMode) {
    return _highContrastBorder(euiTheme, options);
  }
  const direction = options?.direction ?? 'down';

  return `box-shadow: ${euiTheme.shadows.l[direction]};`;
};

/**
 * bottomShadowLarge
 */
export interface EuiShadowXLarge extends EuiShadowOptions {
  reverse?: boolean;
}
export const euiShadowXLarge = (
  { euiTheme, highContrastMode }: UseEuiTheme,
  options?: EuiShadowXLarge
) => {
  if (highContrastMode) {
    return _highContrastBorder(euiTheme, options);
  }
  const direction = options?.direction ?? 'down';

  return `box-shadow: ${euiTheme.shadows.hover.xl[direction]};`;
};

export const euiShadowXLargeHover = (
  { euiTheme, highContrastMode }: UseEuiTheme,
  options?: EuiShadowXLarge
) => {
  if (highContrastMode) {
    return _highContrastBorder(euiTheme, options);
  }
  const reverse = options?.reverse ?? false;
  const direction = options?.direction ?? reverse ? 'up' : 'down';

  return `box-shadow: ${euiTheme.shadows.hover.xl[direction]};`;
};

/**
 * @deprecated slightShadowHover
 */
export const euiSlightShadowHover = (
  { euiTheme, highContrastMode }: UseEuiTheme,
  options?: EuiShadowOptions
) => {
  if (highContrastMode) {
    return _highContrastBorder(euiTheme, options);
  }
  const direction = options?.direction ?? 'down';

  return `box-shadow: ${euiTheme.shadows.s[direction]};`;
};

/**
 * Special size to be used exclusively in hover states
 * of bordered panels.
 */
export const euiShadowHover = (
  { euiTheme, highContrastMode }: UseEuiTheme,
  options?: EuiShadowOptions
) => {
  if (highContrastMode) {
    return _highContrastBorder(euiTheme, options);
  }
  const direction = options?.direction ?? 'down';

  return `box-shadow: ${euiTheme.shadows.hover.base[direction]};`;
};

/**
 * bottomShadowFlat
 *
 * Similar to shadow medium but without the bottom depth.
 * Useful for popovers that drop UP rather than DOWN.
 */
export const euiShadowFlat = (
  { euiTheme, highContrastMode }: UseEuiTheme,
  options?: EuiShadowOptions
) => {
  if (highContrastMode) {
    return _highContrastBorder(euiTheme, options);
  }
  const direction = options?.direction ?? 'down';
  const value =
    euiTheme.shadows.flat?.[direction] ?? euiTheme.shadows.xs[direction];

  return `box-shadow: ${value};`;
};

export const euiShadow = (
  euiThemeContext: UseEuiTheme,
  size: _EuiThemeShadowSize | 'hover' = 'l',
  options?: EuiShadowOptions
) => {
  if (euiThemeContext.highContrastMode) {
    return _highContrastBorder(euiThemeContext.euiTheme, options);
  }

  switch (size) {
    case 'xs':
      return euiShadowXSmall(euiThemeContext, options);
    case 's':
      return euiShadowSmall(euiThemeContext, options);
    case 'm':
      return euiShadowMedium(euiThemeContext, options);
    case 'l':
      return euiShadowLarge(euiThemeContext, options);
    case 'xl':
      return euiShadowXLarge(euiThemeContext, options);
    case 'xlHover':
      return euiShadowXLargeHover(euiThemeContext, options);
    case 'hover':
      return euiShadowHover(euiThemeContext, options);

    default:
      console.warn('Please provide a valid size option to useEuiShadow');
      return '';
  }
};

/**
 * Internal utilities for replacing shadows with high contrast borders instead.
 * NOTE: Windows' high contrast themes ignore *all* `box-shadow` CSS,
 * so we use `border` CSS explicitly instead of shadows
 */

const _highContrastBorder = (
  { border }: UseEuiTheme['euiTheme'],
  { borderAllInHighContrastMode }: EuiShadowOptions = {}
) => {
  return borderAllInHighContrastMode
    ? `border: ${border.thin};`
    : `border-block-end: ${border.thin};`;
};
