/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useMemo } from 'react';
import { css } from '@emotion/react';
import {
  shade,
  tint,
  tintOrShade,
  transparentize,
  useEuiTheme,
  UseEuiTheme,
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

export const useEuiBackgroundColor = (
  color: _EuiBackgroundColor,
  { method }: _EuiBackgroundColorOptions = {}
) => {
  const euiTheme = useEuiTheme();
  return euiBackgroundColor(euiTheme, color, { method });
};

export const useEuiBackgroundColorCSS = () => {
  const euiThemeContext = useEuiTheme();

  return useMemo(
    () => ({
      transparent: css`
        background-color: ${euiBackgroundColor(euiThemeContext, 'transparent')};
      `,
      plain: css`
        background-color: ${euiBackgroundColor(euiThemeContext, 'plain')};
      `,
      subdued: css`
        background-color: ${euiBackgroundColor(euiThemeContext, 'subdued')};
      `,
      accent: css`
        background-color: ${euiBackgroundColor(euiThemeContext, 'accent')};
      `,
      primary: css`
        background-color: ${euiBackgroundColor(euiThemeContext, 'primary')};
      `,
      success: css`
        background-color: ${euiBackgroundColor(euiThemeContext, 'success')};
      `,
      warning: css`
        background-color: ${euiBackgroundColor(euiThemeContext, 'warning')};
      `,
      danger: css`
        background-color: ${euiBackgroundColor(euiThemeContext, 'danger')};
      `,
    }),
    [euiThemeContext]
  );
};

export const euiBorderColor = (
  { euiTheme, colorMode }: UseEuiTheme,
  color: _EuiBackgroundColor
) => {
  switch (color) {
    case 'transparent':
    case 'plain':
    case 'subdued':
      return euiTheme.border.color;
    case 'warning':
      return tintOrShade(euiTheme.colors.warning, 0.4, colorMode);
    default:
      return tintOrShade(euiTheme.colors[color], 0.6, colorMode);
  }
};

export const useEuiBorderColorCSS = () => {
  const euiThemeContext = useEuiTheme();

  return useMemo(
    () => ({
      transparent: css`
        border-color: ${euiBorderColor(euiThemeContext, 'transparent')};
      `,
      plain: css`
        border-color: ${euiBorderColor(euiThemeContext, 'plain')};
      `,
      subdued: css`
        border-color: ${euiBorderColor(euiThemeContext, 'subdued')};
      `,
      accent: css`
        border-color: ${euiBorderColor(euiThemeContext, 'accent')};
      `,
      primary: css`
        border-color: ${euiBorderColor(euiThemeContext, 'primary')};
      `,
      success: css`
        border-color: ${euiBorderColor(euiThemeContext, 'success')};
      `,
      warning: css`
        border-color: ${euiBorderColor(euiThemeContext, 'warning')};
      `,
      danger: css`
        border-color: ${euiBorderColor(euiThemeContext, 'danger')};
      `,
    }),
    [euiThemeContext]
  );
};
