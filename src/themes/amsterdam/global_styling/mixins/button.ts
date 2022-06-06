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
} from '../../../../services';

export const BUTTON_COLORS = [
  'text',
  'accent',
  'primary',
  'success',
  'warning',
  'danger',
  'disabled',
] as const;

export type _EuiButtonColor = typeof BUTTON_COLORS[number];

export const euiButtonColor = (
  color: _EuiButtonColor,
  { euiTheme, colorMode }: UseEuiTheme
) => {
  function tintOrShade(color: string) {
    return colorMode === 'DARK' ? shade(color, 0.7) : tint(color, 0.8);
  }

  switch (color) {
    case 'disabled':
      return transparentize(euiTheme.colors.lightShade, 0.15);
    case 'text':
      return colorMode === 'DARK'
        ? shade(euiTheme.colors.lightShade, 0.2)
        : tint(euiTheme.colors.lightShade, 0.5);
    default:
      return tintOrShade(euiTheme.colors[color]);
  }
};

export const useEuiButtonColorCSS = () => {
  const euiTheme = useEuiTheme();

  return {
    text: css`
      background-color: ${euiButtonColor('text', euiTheme)};
    `,
    accent: css`
      background-color: ${euiButtonColor('accent', euiTheme)};
    `,
    primary: css`
      background-color: ${euiButtonColor('primary', euiTheme)};
    `,
    success: css`
      background-color: ${euiButtonColor('success', euiTheme)};
    `,
    warning: css`
      background-color: ${euiButtonColor('warning', euiTheme)};
    `,
    danger: css`
      background-color: ${euiButtonColor('danger', euiTheme)};
    `,
    disabled: css`
      background-color: ${euiButtonColor('disabled', euiTheme)};
    `,
  };
};
