/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiBackgroundColor } from '../../../../global_styling';
import {
  hexToRgb,
  isColorDark,
  makeHighContrastColor,
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
export type _EuiButtonDisplay = 'base' | 'fill' | 'empty';

export interface _EuiButtonOptions {
  display?: _EuiButtonDisplay;
}

export const euiButtonColor = (
  euiThemeContext: UseEuiTheme,
  color: _EuiButtonColor
) => {
  const { euiTheme, colorMode } = euiThemeContext;
  function tintOrShade(color: string) {
    return colorMode === 'DARK' ? shade(color, 0.7) : tint(color, 0.8);
  }

  let foreground;
  let background;

  switch (color) {
    case 'disabled':
      return {
        color: euiTheme.colors.disabledText,
        'background-color': transparentize(euiTheme.colors.lightShade, 0.15),
      };
    case 'text':
      foreground = euiTheme.colors[color];
      background =
        colorMode === 'DARK'
          ? shade(euiTheme.colors.lightShade, 0.2)
          : tint(euiTheme.colors.lightShade, 0.5);
      break;
    default:
      foreground = euiTheme.colors[`${color}Text`];
      background = tintOrShade(euiTheme.colors[color]);
      break;
  }

  return {
    'background-color': background,
    color: makeHighContrastColor(foreground)(background),
  };
};

export const euiButtonFillColor = (
  euiThemeContext: UseEuiTheme,
  color: _EuiButtonColor
) => {
  const { euiTheme } = euiThemeContext;

  let background;
  let foreground;

  switch (color) {
    case 'disabled':
      background = euiButtonColor(euiThemeContext, color)['background-color'];
      foreground = euiButtonColor(euiThemeContext, color).color;
      break;
    case 'text':
      background = euiTheme.colors.darkShade;
      foreground = isColorDark(...hexToRgb(euiTheme.colors.darkShade))
        ? euiTheme.colors.ghost
        : euiTheme.colors.ink;
      break;
    default:
      background = euiTheme.colors[color];
      foreground = isColorDark(...hexToRgb(euiTheme.colors[color]))
        ? euiTheme.colors.ghost
        : euiTheme.colors.ink;
      break;
  }

  return {
    color: foreground,
    'background-color': background,
  };
};

export const euiButtonEmptyColor = (
  euiThemeContext: UseEuiTheme,
  color: _EuiButtonColor
) => {
  let foreground;
  let background;

  switch (color) {
    case 'disabled':
      foreground = euiButtonColor(euiThemeContext, color).color;
      background = 'transparent';
      break;
    case 'text':
      foreground = euiButtonColor(euiThemeContext, color).color;
      background = euiBackgroundColor(euiThemeContext, 'subdued', {
        method: 'transparent',
      });
      break;
    default:
      foreground = euiButtonColor(euiThemeContext, color).color;
      background = euiBackgroundColor(euiThemeContext, color, {
        method: 'transparent',
      });
      break;
  }

  return `
    color: ${foreground};

    &:hover,
    &:focus,
    &:active {
      background-color: ${background};
    }
  `;
};

export const useEuiButtonColorCSS = (options: _EuiButtonOptions = {}) => {
  const euiThemeContext = useEuiTheme();

  function stylesByDisplay(color: _EuiButtonColor) {
    return {
      base: css`
        ${euiButtonColor(euiThemeContext, color)}
      `,
      fill: css`
        ${euiButtonFillColor(euiThemeContext, color)}
      `,
      empty: css`
        ${euiButtonEmptyColor(euiThemeContext, color)}
      `,
    };
  }

  return {
    text: css(stylesByDisplay('text')[options.display || 'base']),
    accent: css(stylesByDisplay('accent')[options.display || 'base']),
    primary: css(stylesByDisplay('primary')[options.display || 'base']),
    success: css(stylesByDisplay('success')[options.display || 'base']),
    warning: css(stylesByDisplay('warning')[options.display || 'base']),
    danger: css(stylesByDisplay('danger')[options.display || 'base']),
    disabled: css(stylesByDisplay('disabled')[options.display || 'base']),
  };
};
