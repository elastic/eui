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
  mathWithUnits,
} from '@elastic/eui-theme-common';

import {
  makeHighContrastColor,
  UseEuiTheme,
  useEuiMemoizedStyles,
} from '../../services';
import { highContrastModeStyles, logicalCSS } from '../functions';

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

type ButtonVariantColors = {
  color: string;
  background: string;
  backgroundHover: string;
  backgroundActive: string;
};

const getButtonVariantTokenValues = (
  { euiTheme, highContrastMode }: UseEuiTheme,
  color: _EuiButtonColor | 'disabled',
  variant: 'base' | 'filled' | 'empty'
): ButtonVariantColors => {
  const backgroundTokenBase =
    variant === 'base'
      ? 'background'
      : `background${variant.charAt(0).toUpperCase() + variant.slice(1)}`;
  const textTokenBase = variant === 'filled' ? 'textColorFilled' : 'textColor';

  const backgroundTokenName = getTokenName(
    backgroundTokenBase,
    color
  ) as keyof _EuiThemeButtonColors;

  const textTokenName = getTokenName(
    textTokenBase,
    color
  ) as keyof _EuiThemeButtonColors;

  const backgroundHoverTokenName = getTokenName(
    backgroundTokenBase,
    color,
    'hover'
  ) as keyof _EuiThemeButtonColors;

  const backgroundActiveTokenName = getTokenName(
    backgroundTokenBase,
    color,
    'active'
  ) as keyof _EuiThemeButtonColors;

  const highContrastForeground =
    color === 'warning'
      ? euiTheme.colors.ink
      : color === 'disabled'
      ? euiTheme.components.buttons[textTokenName]
      : euiTheme.colors.textInverse;

  const foreground =
    variant === 'filled'
      ? highContrastMode
        ? highContrastForeground
        : euiTheme.components.buttons[textTokenName]
      : euiTheme.components.buttons[textTokenName];

  return {
    color: foreground,
    background: euiTheme.components.buttons[backgroundTokenName],
    backgroundHover: euiTheme.components.buttons[backgroundHoverTokenName],
    backgroundActive: euiTheme.components.buttons[backgroundActiveTokenName],
  };
};

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
  const buttonColors = getButtonVariantTokenValues(
    euiThemeContext,
    color,
    'base'
  );

  const foreground = buttonColors.color;
  const background = buttonColors.background;

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
  color: _EuiButtonColor | 'disabled'
) => {
  const buttonColors = getButtonVariantTokenValues(
    euiThemeContext,
    color,
    'filled'
  );

  const foreground = buttonColors.color;
  const background = buttonColors.background;

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
  color: _EuiButtonColor | 'disabled'
) => {
  let foreground;
  let background;

  switch (color) {
    case 'disabled':
      foreground = euiButtonColor(euiThemeContext, color).color;
      background = 'transparent';
      break;
    default: {
      const buttonColors = getButtonVariantTokenValues(
        euiThemeContext,
        color,
        'empty'
      );

      foreground = euiButtonColor(euiThemeContext, color).color;
      background = buttonColors.backgroundHover;

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
 * @returns An object of `_EuiButtonColor` keys including `disabled`
 */
export const useEuiButtonColorCSS = (options: _EuiButtonOptions = {}) => {
  const { display = 'base' } = options;

  const colorsDisplaysMap = useEuiMemoizedStyles(euiButtonDisplaysColors);
  return colorsDisplaysMap[display];
};

const euiButtonDisplaysColors = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isExperimental = euiTheme.flags?.buttonVariant === 'experimental';

  const COLORS = [...BUTTON_COLORS, 'disabled'] as const;
  type Colors = (typeof COLORS)[number];

  const displaysColorsMap = {} as Record<
    _EuiButtonDisplay,
    Record<Colors, SerializedStyles>
  >;

  const interactiveStyles = (
    buttonColors: ButtonVariantColors,
    type: 'fill' | 'overlay' = 'fill'
  ) => {
    const baseStyles = () => {
      if (type === 'overlay') {
        return `
          position: relative;
          overflow: hidden;
  
          &:hover:not(:disabled) {
            &::before {
              ${logicalCSS('width', '100%')}
              ${logicalCSS('height', '100%')}
  
              content: '';
              position: absolute;
              /* :before should stay under the content */
              z-index: 0;
              inset: 0;
              background-color: ${buttonColors.backgroundHover};
              pointer-events: none;
            }
          }
  
          &:active:not(:disabled) {
            &::before {
              ${logicalCSS('width', '100%')}
              ${logicalCSS('height', '100%')}
  
              content: '';
              position: absolute;
              inset: 0;
              background-color: ${buttonColors.backgroundActive};
            }
          }
        `;
      }

      return `
        &:hover:not(:disabled) {
          background-color: ${buttonColors.backgroundHover};
        }
  
        &:active:not(:disabled) {
          background-color: ${buttonColors.backgroundActive};
        }
      `;
    };

    return `    
      ${highContrastModeStyles(euiThemeContext, {
        none: baseStyles(),
        forced: `
          position: relative;
          overflow: hidden;

          ${highContrastHoverIndicatorStyles(euiThemeContext)}
        `,
      })}
    `;
  };

  BUTTON_DISPLAYS.forEach((display) => {
    displaysColorsMap[display] = {} as Record<Colors, SerializedStyles>;

    COLORS.forEach((color) => {
      switch (display) {
        case 'base': {
          const buttonColors = getButtonVariantTokenValues(
            euiThemeContext,
            color,
            'base'
          );

          const borderStyle =
            color === 'text' &&
            `
              border: ${euiTheme.border.width.thin} solid ${euiTheme.colors.borderBasePlain};
            `;

          const exerimentalStyles =
            isExperimental &&
            `
            ${interactiveStyles(buttonColors, 'overlay')}
            ${borderStyle}
          `;

          displaysColorsMap[display][color] = css`
            ${euiButtonColor(euiThemeContext, color)}
            ${exerimentalStyles}
          `;
          break;
        }
        case 'fill': {
          const buttonColors = getButtonVariantTokenValues(
            euiThemeContext,
            color,
            'filled'
          );

          const exerimentalStyles =
            isExperimental && interactiveStyles(buttonColors);

          displaysColorsMap[display][color] = css`
            ${euiButtonFillColor(euiThemeContext, color)}

            /* Use full shade for outline-color except for dark mode text buttons which need to stay currentColor */
              outline-color: ${euiThemeContext.colorMode === 'DARK' &&
            color === 'text'
              ? 'currentColor'
              : euiThemeContext.euiTheme.colors.fullShade};

            ${exerimentalStyles}
          `;
          break;
        }
        case 'empty': {
          const buttonColors = getButtonVariantTokenValues(
            euiThemeContext,
            color,
            'empty'
          );

          const defaultStyles =
            !isExperimental &&
            `
              &:focus,
              &:active {
                background-color: ${
                  euiButtonEmptyColor(euiThemeContext, color).backgroundColor
                };
              }
          `;

          const exerimentalStyles =
            isExperimental && interactiveStyles(buttonColors, 'overlay');

          displaysColorsMap[display][color] = css`
            color: ${euiButtonEmptyColor(euiThemeContext, color).color};

            ${defaultStyles}
            ${exerimentalStyles}
          `;
          break;
        }
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
const euiButtonFocusCSS = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isExperimental = euiTheme.flags?.buttonVariant === 'experimental';

  const focusCSS = isExperimental
    ? css``
    : css`
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
export const euiButtonSizeMap = ({ euiTheme }: UseEuiTheme) => {
  const isExperimental = euiTheme.flags?.buttonVariant === 'experimental';

  return {
    xs: {
      minWidth: euiTheme.base * (isExperimental ? 6 : 7),
      height: euiTheme.size.l,
      radius: euiTheme.border.radius.small,
      fontScale: 'xs' as const,
    },
    s: {
      minWidth: euiTheme.base * (isExperimental ? 6 : 7),
      height: euiTheme.size.xl,
      radius: euiTheme.border.radius.small,
      fontScale: 's' as const,
    },
    m: {
      minWidth: euiTheme.base * 7,
      height: euiTheme.size.xxl,
      radius: isExperimental
        ? euiTheme.border.radius.small
        : euiTheme.border.radius.medium,
      fontScale: 's' as const,
    },
  };
};

/**
 * creates a bottom border on hover/focus to ensure a visible change as forced mode removed background colors
 */
export const highContrastHoverIndicatorStyles = ({ euiTheme }: UseEuiTheme) => `
  &:hover:not(:disabled) {
    transition: none;

    /* using pseudo border to be able to control the color */
    &::after {
      content: '';
      position: absolute;
      inset: ${euiTheme.border.width.thin};
      border: ${
        euiTheme.border.width.thick
      } solid var(--highContrastHoverIndicatorColor, ${euiTheme.border.color});
      border-radius: ${mathWithUnits(
        euiTheme.border.radius.small,
        (x) => x / 2
      )};
      background-color: transparent;
      pointer-events: none;
    }
  }
`;

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
