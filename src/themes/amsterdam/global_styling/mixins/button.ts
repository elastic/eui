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
  color: _EuiButtonColor,
  { display }: _EuiButtonOptions = {}
) => {
  const { euiTheme, colorMode } = euiThemeContext;
  function tintOrShade(color: string) {
    return colorMode === 'DARK' ? shade(color, 0.7) : tint(color, 0.8);
  }

  let foreground;
  let background;

  if (display === 'empty') {
    let focusBackground;
    switch (color) {
      case 'disabled':
        foreground = euiTheme.colors[`${color}Text`];
        focusBackground = euiTheme.colors[color];
        break;
      case 'text':
        foreground = euiTheme.colors[color];
        focusBackground = euiBackgroundColor(euiThemeContext, 'subdued');
        break;
      default:
        foreground = euiTheme.colors[`${color}Text`];
        focusBackground = euiBackgroundColor(euiThemeContext, color);
        break;
    }
    return {
      color: foreground,
      'background-color': focusBackground,
    };
  } else if (display === 'fill') {
    return {
      color: isColorDark(...hexToRgb(euiTheme.colors[color]))
        ? euiTheme.colors.ghost
        : euiTheme.colors.ink,
      'background-color':
        color === 'text' ? euiTheme.colors.darkShade : euiTheme.colors[color],
    };
  }

  switch (color) {
    case 'disabled':
      foreground = euiTheme.colors.disabledText;
      background = transparentize(euiTheme.colors.lightShade, 0.15);
      break;
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

export const useEuiButtonColorCSS = (options: _EuiButtonOptions = {}) => {
  const euiThemeContext = useEuiTheme();

  function stylesByDisplay(
    color: _EuiButtonColor,
    display?: _EuiButtonDisplay
  ) {
    let empty;
    switch (display) {
      case 'empty':
        empty = css`
          color: ${euiButtonColor(euiThemeContext, color).color};

          &:hover,
          &:focus,
          &:active {
            background-color: ${euiBackgroundColor(euiThemeContext, color)};
          }
        `;
      // break;

      default:
        return {
          base: css`
            ${euiButtonColor(euiThemeContext, color, options)}
          `,
          fill: css`
            ${euiButtonColor(euiThemeContext, color, options)}
          `,
          empty,
        };
    }
  }

  return {
    text: css(
      stylesByDisplay('text', options.display)[options.display || 'base']
    ),
    accent: css(
      stylesByDisplay('accent', options.display)[options.display || 'base']
    ),
    primary: css(
      stylesByDisplay('primary', options.display)[options.display || 'base']
    ),
    success: css(
      stylesByDisplay('success', options.display)[options.display || 'base']
    ),
    warning: css(
      stylesByDisplay('warning', options.display)[options.display || 'base']
    ),
    danger: css(
      stylesByDisplay('danger', options.display)[options.display || 'base']
    ),
    disabled: css(
      stylesByDisplay('disabled', options.display)[options.display || 'base']
    ),
  };
};
