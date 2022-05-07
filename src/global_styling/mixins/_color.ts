/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  shade,
  tint,
  transparentize,
  useEuiTheme,
  UseEuiTheme,
} from '../../services';

export const BACKGROUND_COLORS = [
  'plain',
  'subdued',
  'accent',
  'primary',
  'success',
  'warning',
  'danger',
] as const;

export type _EuiBackgroundColor = typeof BACKGROUND_COLORS[number];
/**
 * Use `opaque` for containers of unkown content.
 * Use `transparent` for interactive states like hover and focus.
 */
export type _EuiBackgroundColorMethod = 'opaque' | 'transparent';

export const euiBackgroundColor = (
  color: _EuiBackgroundColor,
  { euiTheme, colorMode }: UseEuiTheme,
  method: _EuiBackgroundColorMethod = 'opaque'
) => {
  if (method === 'transparent') {
    if (color === 'plain') {
      return transparentize(euiTheme.colors.ghost, 0.2);
    } else if (color === 'subdued') {
      return transparentize(euiTheme.colors.lightShade, 0.2);
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
  method: _EuiBackgroundColorMethod = 'opaque'
) => {
  const euiTheme = useEuiTheme();
  return euiBackgroundColor(color, euiTheme, method);
};

export const useEuiBackgroundColorCSS = () => {
  return {
    plain: `
      background-color: ${useEuiBackgroundColor('plain')};
    `,
    subdued: `
      background-color: ${useEuiBackgroundColor('subdued')};
    `,
    accent: `
      background-color: ${useEuiBackgroundColor('accent')};
    `,
    primary: `
      background-color: ${useEuiBackgroundColor('primary')};
    `,
    success: `
      background-color: ${useEuiBackgroundColor('success')};
    `,
    warning: `
      background-color: ${useEuiBackgroundColor('warning')};
    `,
    danger: `
      background-color: ${useEuiBackgroundColor('danger')};
    `,
  };
};
