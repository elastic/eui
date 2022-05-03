/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { shade, tint, useEuiTheme, UseEuiTheme } from '../../services';

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

export type EuiBackgroundColor = typeof BACKGROUND_COLORS[number];

export const euiBackgroundColor = (
  color: EuiBackgroundColor,
  { euiTheme, colorMode }: UseEuiTheme
) => {
  function tintOrShade(color: string) {
    return colorMode === 'DARK' ? shade(color, 0.7) : tint(color, 0.9);
  }

  switch (color) {
    case 'transparent':
      return 'transparent';
    case 'plain':
      return euiTheme.colors.emptyShade;
    case 'subdued':
      return euiTheme.colors.body;
    default:
      return tintOrShade(euiTheme.colors[color]);
  }
};

export const useEuiBackgroundColor = (color: EuiBackgroundColor) => {
  const euiTheme = useEuiTheme();
  return euiBackgroundColor(color, euiTheme);
};

export const useEuiBackgroundColorCSS = () => {
  return {
    transparent: `
      background-color: ${useEuiBackgroundColor('transparent')};
    `,
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
