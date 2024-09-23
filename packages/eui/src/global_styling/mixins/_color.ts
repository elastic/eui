/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, SerializedStyles } from '@emotion/react';
import {
  shade,
  tint,
  tintOrShade,
  transparentize,
  UseEuiTheme,
  useEuiMemoizedStyles,
} from '../../services';

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
  { euiTheme, colorMode }: UseEuiTheme,
  color: _EuiBackgroundColor,
  { method }: _EuiBackgroundColorOptions = {}
) => {
  if (color === 'transparent') return 'transparent';

  if (method === 'transparent') {
    if (color === 'plain') {
      return transparentize(euiTheme.colors.ghost, 0.2);
    } else if (color === 'subdued') {
      return colorMode === 'DARK'
        ? transparentize(euiTheme.colors.lightShade, 0.4)
        : transparentize(euiTheme.colors.lightShade, 0.2);
    } else {
      return transparentize(euiTheme.colors[color], 0.1);
    }
  } else {
    function tintOrShade(color: string) {
      return colorMode === 'DARK' ? shade(color, 0.8) : tint(color, 0.9);
    }

    switch (color) {
      case 'plain':
        return euiTheme.colors.emptyShade;
      case 'subdued':
        return euiTheme.colors.body;
      default:
        return tintOrShade(euiTheme.colors[color]);
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
  { euiTheme, colorMode, highContrastMode }: UseEuiTheme,
  color: _EuiBackgroundColor
) => {
  switch (color) {
    case 'transparent':
    case 'plain':
    case 'subdued':
      return euiTheme.border.color;
    case 'warning':
      return tintOrShade(
        euiTheme.colors.warning,
        highContrastMode ? 0 : 0.4,
        colorMode
      );
    default:
      return tintOrShade(
        euiTheme.colors[color],
        highContrastMode ? 0 : 0.6,
        colorMode
      );
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
