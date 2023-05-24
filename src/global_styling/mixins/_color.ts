/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  shade,
  tint,
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
  return {
    transparent: css`
      background-color: ${useEuiBackgroundColor('transparent')};
    `,
    plain: css`
      background-color: ${useEuiBackgroundColor('plain')};
    `,
    subdued: css`
      background-color: ${useEuiBackgroundColor('subdued')};
    `,
    accent: css`
      background-color: ${useEuiBackgroundColor('accent')};
    `,
    primary: css`
      background-color: ${useEuiBackgroundColor('primary')};
    `,
    success: css`
      background-color: ${useEuiBackgroundColor('success')};
    `,
    warning: css`
      background-color: ${useEuiBackgroundColor('warning')};
    `,
    danger: css`
      background-color: ${useEuiBackgroundColor('danger')};
    `,
  };
};
