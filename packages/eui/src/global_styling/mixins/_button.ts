/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes, type SerializedStyles } from '@emotion/react';
import {
  _EuiThemeButtonColors,
  getTokenName,
  euiCanAnimate,
} from '@elastic/eui-theme-common';

import {
  makeHighContrastColor,
  UseEuiTheme,
  useEuiMemoizedStyles,
} from '../../services';

/** Tentative usage; these exist only to be used as button directly when used within other components */
export const SEVERITY_COLORS = ['neutral', 'risk'] as const;

export const BUTTON_COLORS = [
  'text',
  'accent',
  'accentSecondary',
  'primary',
  'success',
  'warning',
  'danger',
] as const;

export const EXTENDED_BUTTON_COLORS = [
  ...BUTTON_COLORS,
  ...SEVERITY_COLORS,
] as const;
export type _EuiButtonColor = (typeof BUTTON_COLORS)[number];
export type _EuiExtendedButtonColor = (typeof EXTENDED_BUTTON_COLORS)[number];

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
  color: _EuiExtendedButtonColor | 'disabled'
) => {
  const { euiTheme } = euiThemeContext;

  const backgroundTokenName = getTokenName(
    'background',
    color
  ) as keyof _EuiThemeButtonColors;

  const textTokenName = getTokenName(
    'textColor',
    color
  ) as keyof _EuiThemeButtonColors;

  const foreground = euiTheme.components.buttons[textTokenName];
  const background = euiTheme.components.buttons[backgroundTokenName];

  return {
    color:
      background === 'transparent' || color === 'disabled'
        ? foreground
        : makeHighContrastColor(foreground)(background),
    backgroundColor: background,
    ..._highContrastBorder(euiThemeContext, foreground),
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
  color: _EuiExtendedButtonColor | 'disabled'
) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const backgroundTokenName = getTokenName(
    'backgroundFilled',
    color
  ) as keyof _EuiThemeButtonColors;

  const textColorTokenName = getTokenName(
    'textColorFilled',
    color
  ) as keyof _EuiThemeButtonColors;

  const highContrastForeground = ['warning', 'neutral', 'risk'].includes(color)
    ? euiTheme.colors.ink
    : color === 'disabled'
    ? euiTheme.components.buttons[textColorTokenName]
    : euiTheme.colors.textInverse;

  const foreground = highContrastMode
    ? highContrastForeground
    : euiTheme.components.buttons[textColorTokenName];
  const background = euiTheme.components.buttons[backgroundTokenName];

  return {
    color: foreground,
    backgroundColor: background,
    ..._highContrastBorder(
      euiThemeContext,
      color === 'disabled' ? foreground : background // The border is necessary for Windows high contrast themes, which ignore background-color
    ),
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
  color: _EuiExtendedButtonColor | 'disabled'
) => {
  let foreground;
  let background;

  switch (color) {
    case 'disabled':
      foreground = euiButtonColor(euiThemeContext, color).color;
      background = 'transparent';
      break;
    default: {
      const backgroundToken = getTokenName(
        'backgroundEmpty',
        color,
        'hover'
      ) as keyof _EuiThemeButtonColors;

      foreground = euiButtonColor(euiThemeContext, color).color;
      background = euiThemeContext.euiTheme.components.buttons[backgroundToken];

      break;
    }
  }

  return {
    color: foreground,
    backgroundColor: background,
  };
};

/**
 * Given the button display type, returns the Emotion based color keys.
 * @param options Button display type
 * @returns An object of `_EuiExtendedButtonColor` keys including `disabled`
 */
export const useEuiButtonColorCSS = (options: _EuiButtonOptions = {}) => {
  const { display = 'base' } = options;

  const colorsDisplaysMap = useEuiMemoizedStyles(euiButtonDisplaysColors);
  return colorsDisplaysMap[display];
};

const euiButtonDisplaysColors = (euiThemeContext: UseEuiTheme) => {
  const COLORS = [...EXTENDED_BUTTON_COLORS, 'disabled'] as const;
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

/**
 * Internal util for high contrast button borders
 */
const _highContrastBorder = (
  { highContrastMode, euiTheme }: UseEuiTheme,
  color: string
) =>
  highContrastMode
    ? { border: `${euiTheme.border.width.thin} solid ${color}` }
    : {};
