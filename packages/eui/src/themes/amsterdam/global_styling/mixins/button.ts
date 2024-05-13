/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes, type SerializedStyles } from '@emotion/react';
import { euiBackgroundColor, euiCanAnimate } from '../../../../global_styling';
import {
  hexToRgb,
  isColorDark,
  makeHighContrastColor,
  shade,
  tint,
  transparentize,
  UseEuiTheme,
  useEuiMemoizedStyles,
} from '../../../../services';

export const BUTTON_COLORS = [
  'text',
  'accent',
  'primary',
  'success',
  'warning',
  'danger',
] as const;
export type _EuiButtonColor = (typeof BUTTON_COLORS)[number];

export const BUTTON_DISPLAYS = ['base', 'fill', 'empty'] as const;
export type _EuiButtonDisplay = (typeof BUTTON_DISPLAYS)[number];
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

  const getForegroundColor = (background: string) => {
    return isColorDark(...hexToRgb(background))
      ? euiTheme.colors.ghost
      : euiTheme.colors.ink;
  };

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
      foreground = getForegroundColor(background);
      break;
    case 'success':
    case 'accent':
      // Success / accent fills are hard to read on light mode even though they pass color contrast ratios
      // TODO: If WCAG 3 gets adopted (which would calculates luminosity & would allow us to use white text instead),
      // we can get rid of this case (https://blog.datawrapper.de/color-contrast-check-data-vis-wcag-apca/)
      background =
        colorMode === 'LIGHT'
          ? tint(euiTheme.colors[color], 0.3)
          : euiTheme.colors[color];
      foreground = getForegroundColor(background);
      break;
    default:
      background = euiTheme.colors[color];
      foreground = getForegroundColor(background);
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
  const { display = 'base' } = options;

  const colorsDisplaysMap = useEuiMemoizedStyles(euiButtonDisplaysColors);
  return colorsDisplaysMap[display];
};

const euiButtonDisplaysColors = (euiThemeContext: UseEuiTheme) => {
  const COLORS = [...BUTTON_COLORS, 'disabled'] as const;
  type Colors = (typeof COLORS)[number];

  const displaysColorsMap = {} as Record<
    _EuiButtonDisplay,
    Record<Colors, SerializedStyles>
  >;

  BUTTON_DISPLAYS.forEach((display) => {
    displaysColorsMap[display] = {} as Record<Colors, SerializedStyles>;

    COLORS.forEach((color) => {
      switch (display) {
        case 'base':
          displaysColorsMap[display][color] = css`
            ${euiButtonColor(euiThemeContext, color)}
          `;
          break;
        case 'fill':
          displaysColorsMap[display][color] = css`
            ${euiButtonFillColor(euiThemeContext, color)}

            /* Use full shade for outline-color except for dark mode text buttons which need to stay currentColor */
            outline-color: ${euiThemeContext.colorMode === 'DARK' &&
            color === 'text'
              ? 'currentColor'
              : euiThemeContext.euiTheme.colors.fullShade};
          `;
          break;
        case 'empty':
          displaysColorsMap[display][color] = css`
            color: ${euiButtonEmptyColor(euiThemeContext, color).color};

            &:focus,
            &:active {
              background-color: ${euiButtonEmptyColor(euiThemeContext, color)
                .backgroundColor};
            }
          `;
          break;
      }

      // Tweak auto-generated Emotion label/className output
      const emotionOutput = displaysColorsMap[display][color];
      emotionOutput.styles = emotionOutput.styles.replace(
        'label:displaysColorsMap-display-color;',
        `label:${display}-${color};`
      );
    });
  });

  return displaysColorsMap;
};

/**
 * Creates the translate animation when button is in focus.
 * @returns string
 */
export const useEuiButtonFocusCSS = () =>
  useEuiMemoizedStyles(euiButtonFocusCSS);

const euiButtonFocusAnimation = keyframes`
  50% {
    transform: translateY(1px);
  }
`;
const euiButtonFocusCSS = ({ euiTheme }: UseEuiTheme) => {
  const focusCSS = css`
    ${euiCanAnimate} {
      transition: transform ${euiTheme.animation.normal} ease-in-out,
        background-color ${euiTheme.animation.normal} ease-in-out;

      &:hover:not(:disabled) {
        transform: translateY(-1px);
      }

      &:focus {
        animation: ${euiButtonFocusAnimation} ${euiTheme.animation.normal}
          ${euiTheme.animation.bounce};
      }

      &:active:not(:disabled) {
        transform: translateY(1px);
      }
    }
  `;
  // Remove the auto-generated label.
  // We could typically avoid a label by using a plain string `` instead of css``,
  // but we need css`` for keyframes`` to work for the focus animation
  focusCSS.styles = focusCSS.styles.replace('label:focusCSS;', '');
  return focusCSS;
};

/**
 * Map of `size` props to various sizings/scales
 * that should remain consistent across all buttons
 */
export const euiButtonSizeMap = ({ euiTheme }: UseEuiTheme) => ({
  xs: {
    height: euiTheme.size.l,
    radius: euiTheme.border.radius.small,
    fontScale: 'xs' as const,
  },
  s: {
    height: euiTheme.size.xl,
    radius: euiTheme.border.radius.small,
    fontScale: 's' as const,
  },
  m: {
    height: euiTheme.size.xxl,
    radius: euiTheme.border.radius.medium,
    fontScale: 's' as const,
  },
});
