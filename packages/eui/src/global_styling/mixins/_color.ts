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
  _EuiThemeTransparentBackgroundColors,
} from '../variables';

export const BACKGROUND_COLORS = [
  'transparent',
  'plain',
  'subdued',
  'accent',
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
 * @returns A single background color with optional alpha transparency
 */
export const euiBackgroundColor = (
  { euiTheme }: UseEuiTheme,
  color: _EuiBackgroundColor,
  { method }: _EuiBackgroundColorOptions = {}
) => {
  if (color === 'transparent') return 'transparent';

  if (method === 'transparent') {
    const colorName = color.charAt(0).toUpperCase() + color.slice(1);
    const colorToken =
      `background${colorName}Transparent` as keyof _EuiThemeTransparentBackgroundColors;

    return euiTheme.colors[colorToken];
  } else {
    switch (color) {
      case 'plain':
        return euiTheme.colors.emptyShade;
      case 'subdued':
        return euiTheme.colors.body;
      default: {
        const colorName = color.charAt(0).toUpperCase() + color.slice(1);
        const colorToken =
          `background${colorName}` as keyof _EuiThemeBackgroundColors;

        return euiTheme.colors[colorToken];
      }
    }
  }
};

/**
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

export const useEuiBackgroundColor = (
  color: _EuiBackgroundColor,
  { method }: _EuiBackgroundColorOptions = {}
) => {
  const backgroundColorMap = useEuiMemoizedStyles(_euiBackgroundColorMap);
  return backgroundColorMap[method || 'opaque'][color];
};

/**
 * @returns An object map of color keys to CSS,
 * e.g. { danger: css``, success: css``, ... }
 */
const _euiBackgroundColors = (euiThemeContext: UseEuiTheme) =>
  BACKGROUND_COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: css`
        background-color: ${euiBackgroundColor(euiThemeContext, color)};
        label: ${color};
      `,
    }),
    {} as Record<_EuiBackgroundColor, SerializedStyles>
  );

export const useEuiBackgroundColorCSS = () =>
  useEuiMemoizedStyles(_euiBackgroundColors);

/**
 * Border colors
 */

export const euiBorderColor = (
  { euiTheme }: UseEuiTheme,
  color: _EuiBackgroundColor
) => {
  switch (color) {
    case 'transparent':
      return euiTheme.border.color;
    default: {
      const colorName = color.charAt(0).toUpperCase() + color.slice(1);
      const colorToken = `border${colorName}` as keyof _EuiThemeBorderColors;
      return euiTheme.colors[colorToken];
    }
  }
};

/**
 * @returns An object map of color keys to CSS,
 * e.g. { danger: css``, success: css``, ... }
 */
const _euiBorderColors = (euiThemeContext: UseEuiTheme) =>
  BACKGROUND_COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [color]: css`
        border-color: ${euiBorderColor(euiThemeContext, color)};
        label: ${color};
      `,
    }),
    {} as Record<_EuiBackgroundColor, SerializedStyles>
  );

export const useEuiBorderColorCSS = () =>
  useEuiMemoizedStyles(_euiBorderColors);
