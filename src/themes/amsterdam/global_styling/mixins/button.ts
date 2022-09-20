/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiBackgroundColor, euiCanAnimate } from '../../../../global_styling';
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
] as const;

export type _EuiButtonColor = typeof BUTTON_COLORS[number];
export type _EuiButtonDisplay = 'base' | 'fill' | 'empty';

export interface _EuiButtonOptions {
  display?: _EuiButtonDisplay;
}

/**
 * Creates the `base` version of button styles with proper text contrast.
 * @param euiThemeContext
 * @param color One of the named button colors or 'disabled'
 * @returns Style object `{ backgroundColor, color }`
 */
export const euiButtonColor = (
  euiThemeContext: UseEuiTheme,
  color: _EuiButtonColor | 'disabled'
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
        backgroundColor: transparentize(euiTheme.colors.lightShade, 0.15),
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
    color: makeHighContrastColor(foreground)(background),
    backgroundColor: background,
  };
};

/**
 * Creates the `fill` version of buttons styles with proper text contrast.
 * @param euiThemeContext
 * @param color One of the named button colors or 'disabled'
 * @returns Style object `{ backgroundColor, color }`
 */
export const euiButtonFillColor = (
  euiThemeContext: UseEuiTheme,
  color: _EuiButtonColor | 'disabled'
) => {
  const { euiTheme, colorMode } = euiThemeContext;

  let background;
  let foreground;

  switch (color) {
    case 'disabled':
      background = euiButtonColor(euiThemeContext, color).backgroundColor;
      foreground = euiButtonColor(euiThemeContext, color).color;
      break;
    case 'text':
      background =
        colorMode === 'DARK' ? euiTheme.colors.text : euiTheme.colors.darkShade;
      foreground = isColorDark(...hexToRgb(background))
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
    backgroundColor: background,
  };
};

/**
 * Creates the `empty` version of button styles using the text-variant and adding interactive styles.
 * @param euiThemeContext
 * @param color One of the named button colors or 'disabled'
 * @returns Style object `{ backgroundColor, color }` where `background` is typically used for interactive states
 */
export const euiButtonEmptyColor = (
  euiThemeContext: UseEuiTheme,
  color: _EuiButtonColor | 'disabled'
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

  return {
    color: foreground,
    backgroundColor: background,
  };
};

/**
 * Given the button display type, returns the Emotion based color keys.
 * @param options Button display type
 * @returns An object of `_EuiButtonColor` keys including `disabled`
 */
export const useEuiButtonColorCSS = (options: _EuiButtonOptions = {}) => {
  const euiThemeContext = useEuiTheme();

  function stylesByDisplay(color: _EuiButtonColor | 'disabled') {
    return {
      base: css`
        ${euiButtonColor(euiThemeContext, color)}
      `,
      fill: css`
        ${euiButtonFillColor(euiThemeContext, color)}

        // Use full shade for outline-color except for dark mode text buttons which need to stay currentColor
        outline-color: ${euiThemeContext.colorMode === 'DARK' &&
        color === 'text'
          ? 'currentColor'
          : euiThemeContext.euiTheme.colors.fullShade};
      `,
      empty: css`
        color: ${euiButtonEmptyColor(euiThemeContext, color).color};

        &:focus,
        &:active {
          background-color: ${euiButtonEmptyColor(euiThemeContext, color)
            .backgroundColor};
        }
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

/**
 * Based on the button size, creates the style properties.
 * @returns An object of button size keys with Emption styles for `border-radius`
 */
export const useEuiButtonRadiusCSS = () => {
  const { euiTheme } = useEuiTheme();

  return {
    xs: css`
      border-radius: ${euiTheme.border.radius.small};
    `,
    s: css`
      border-radius: ${euiTheme.border.radius.small};
    `,
    m: css`
      border-radius: ${euiTheme.border.radius.medium};
    `,
  };
};

/**
 * Creates the translate animation when button is in focus.
 * @returns string
 */
export const useEuiButtonFocusCSS = () => {
  const { euiTheme } = useEuiTheme();

  return `
    ${euiCanAnimate} {
      transition: transform ${euiTheme.animation.normal} ease-in-out,
        background-color ${euiTheme.animation.normal} ease-in-out;

      &:hover:not(:disabled) {
        transform: translateY(-1px);
      }

      &:focus {
        animation: euiButtonActive ${euiTheme.animation.normal}
          ${euiTheme.animation.bounce};
      }

      &:active:not(:disabled) {
        transform: translateY(1px);
      }
    }
  `;
};
