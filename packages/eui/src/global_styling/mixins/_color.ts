/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, SerializedStyles } from '@emotion/react';
import { UseEuiTheme, useEuiMemoizedStyles } from '../../services';
import {
  _EuiThemeBackgroundColors,
  _EuiThemeBorderColors,
  getTokenName,
} from '@elastic/eui-theme-common';

export const BACKGROUND_COLORS = [
  'transparent',
  'plain',
  'subdued',
  'accent',
  'accentSecondary',
  'primary',
  'success',
  'warning',
  'danger',
] as const;

export type _EuiBackgroundColor = (typeof BACKGROUND_COLORS)[number];
export interface _EuiBackgroundColorOptions {
  /**
   * Use `opaque` for containers of unknown content.
   * Use `transparent` for interactive states like hover and focus.
   */
  method?: 'opaque' | 'transparent';
}

/**
 * @deprecated - use background tokens directly
 * @returns A single background color with optional alpha transparency
 */
export const euiBackgroundColor = (
  { euiTheme }: UseEuiTheme,
  color: _EuiBackgroundColor,
  { method }: _EuiBackgroundColorOptions = {}
) => {
  if (color === 'transparent') return 'transparent';

  if (method === 'transparent') {
    const tokenName = getTokenName(
      'backgroundTransparent',
      color
    ) as keyof typeof euiTheme.components.__TEMP_INTERNAL__.shared;

    return euiTheme.components.__TEMP_INTERNAL__.shared[tokenName];
  } else {
    const tokenName = getTokenName(
      'backgroundBase',
      color
    ) as keyof _EuiThemeBackgroundColors;

    return euiTheme.colors[tokenName];
  }
};

/**
 * @deprecated
 * @returns An object map of color keys to color values, categorized by
 * opaque (default) vs transparency (hover/focus states) methods.
 * e.g. {
 *  opaque: { danger: '#000', success: '#fff', ... },
 *  transparent: { danger: 'rgba(0,0,0,0.1)', success: 'rgba(255,255,255,0.1)', ... },
 * }
 */
const _euiBackgroundColorMap = (euiThemeContext: UseEuiTheme) => ({
  opaque: BACKGROUND_COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: euiBackgroundColor(euiThemeContext, color),
    }),
    {} as Record<_EuiBackgroundColor, string>
  ),
  transparent: BACKGROUND_COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: euiBackgroundColor(euiThemeContext, color, {
        method: 'transparent',
      }),
    }),
    {} as Record<_EuiBackgroundColor, string>
  ),
});

/**
 * @deprecated
 */
export const useEuiBackgroundColor = (
  color: _EuiBackgroundColor,
  { method }: _EuiBackgroundColorOptions = {}
) => {
  const backgroundColorMap = useEuiMemoizedStyles(_euiBackgroundColorMap);
  return backgroundColorMap[method || 'opaque'][color];
};

/**
 * @deprecated
 * @returns An object map of color keys to CSS,
 * e.g. { danger: css``, success: css``, ... }
 */
const _euiBackgroundColors = (euiThemeContext: UseEuiTheme) =>
  BACKGROUND_COLORS.reduce((acc, color) => {
    const tokenName = getTokenName(
      'backgroundBase',
      color
    ) as keyof _EuiThemeBackgroundColors;

    const backgroundColor =
      color === 'transparent'
        ? 'transparent'
        : euiThemeContext.euiTheme.colors[tokenName];

    return {
      ...acc,
      [color]: css`
        background-color: ${backgroundColor};
        label: ${color};
      `,
    };
  }, {} as Record<_EuiBackgroundColor, SerializedStyles>);

/**
 * @deprecated - use background tokens directly
 * Hook to retrieve background style for a background color variant
 * @returns An object map of color keys to CSS,
 * e.g. { danger: css``, success: css``, ... }
 */
export const useEuiBackgroundColorCSS = () =>
  useEuiMemoizedStyles(_euiBackgroundColors);

/**
 * Border colors
 * @deprecated - use border tokens directly or use
 * `useEuiBorderColorCSS()` for composed styles
 */

export const euiBorderColor = (
  { euiTheme }: UseEuiTheme,
  color: _EuiBackgroundColor
) => {
  switch (color) {
    case 'transparent':
      return euiTheme.border.color;
    default: {
      const tokenName = getTokenName(
        'borderBase',
        color
      ) as keyof _EuiThemeBorderColors;

      return euiTheme.colors[tokenName];
    }
  }
};

/**
 * @returns An object map of color keys to CSS,
 * e.g. { danger: css``, success: css``, ... }
 */
const _euiBorderColors = (euiThemeContext: UseEuiTheme) =>
  BACKGROUND_COLORS.reduce((acc, color) => {
    const borderToken = getTokenName(
      'borderBase',
      color
    ) as keyof _EuiThemeBackgroundColors;

    return {
      ...acc,
      [color]: css`
        border-color: ${euiThemeContext.euiTheme.colors[borderToken]};
        label: ${color};
      `,
    };
  }, {} as Record<_EuiBackgroundColor, SerializedStyles>);

/**
 * Hook to retrieve border style for a border variant
 * @returns An object map of color keys to CSS,
 * e.g. { danger: css``, success: css``, ... }
 */
export const useEuiBorderColorCSS = () =>
  useEuiMemoizedStyles(_euiBorderColors);
