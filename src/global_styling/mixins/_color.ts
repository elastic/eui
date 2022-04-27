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

export const euiBackgroundColorStyles = ({
  euiTheme,
  colorMode,
}: UseEuiTheme) => {
  function tintOrShade(color: string) {
    return colorMode === 'DARK' ? shade(color, 0.7) : tint(color, 0.9);
  }

  return {
    transparent: `
      background-color: transparent;
    `,
    plain: `
      background-color: ${euiTheme.colors.emptyShade};
    `,
    subdued: `
      background-color: ${euiTheme.colors.body};
    `,
    accent: `
      background-color: ${tintOrShade(euiTheme.colors.accent)};
    `,
    primary: `
      background-color: ${tintOrShade(euiTheme.colors.primary)};
    `,
    success: `
      background-color: ${tintOrShade(euiTheme.colors.success)};
    `,
    warning: `
      background-color: ${tintOrShade(euiTheme.colors.warning)};
    `,
    danger: `
      background-color: ${tintOrShade(euiTheme.colors.danger)};
    `,
  };
};

export const useEuiBackgroundColor = (color: EuiBackgroundColor) => {
  const euiTheme = useEuiTheme();
  return euiBackgroundColorStyles(euiTheme)[color];
};
