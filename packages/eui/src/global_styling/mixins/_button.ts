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
  isEuiThemeRefreshVariant,
} from '../../services';
import { highContrastModeStyles, logicalCSS } from '../functions';

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

type ButtonVariantColors = {
  color: string;
  background: string;
  backgroundHover: string;
  backgroundActive: string;
};

const getButtonVariantTokenValues = (
  { euiTheme, highContrastMode }: UseEuiTheme,
  color: _EuiExtendedButtonColor | 'disabled',
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

  const highContrastForeground = ['warning', 'neutral', 'risk'].includes(color)
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
  color: _EuiExtendedButtonColor | 'disabled'
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
  color: _EuiExtendedButtonColor | 'disabled'
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
 * @returns An object of `_EuiExtendedButtonColor` keys including `disabled`
 */
export const useEuiButtonColorCSS = (options: _EuiButtonOptions = {}) => {
  const { display = 'base' } = options;

  const colorsDisplaysMap = useEuiMemoizedStyles(euiButtonDisplaysColors);
  return colorsDisplaysMap[display];
};

const euiButtonDisplaysColors = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'buttonVariant'
  );

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

          const refreshVariantStyles =
            isRefreshVariant &&
            `
            ${_interactionStyles(euiThemeContext, buttonColors, 'overlay')}
            ${borderStyle}
          `;

          displaysColorsMap[display][color] = css`
            ${euiButtonColor(euiThemeContext, color)}
            ${refreshVariantStyles}
          `;
          break;
        }
        case 'fill': {
          const buttonColors = getButtonVariantTokenValues(
            euiThemeContext,
            color,
            'filled'
          );

          const refreshVariantStyles =
            isRefreshVariant &&
            _interactionStyles(euiThemeContext, buttonColors);

          displaysColorsMap[display][color] = css`
            ${euiButtonFillColor(euiThemeContext, color)}

            /* Use full shade for outline-color except for dark mode text buttons which need to stay currentColor */
              outline-color: ${euiThemeContext.colorMode === 'DARK' &&
            color === 'text'
              ? 'currentColor'
              : euiThemeContext.euiTheme.colors.fullShade};

            ${refreshVariantStyles}
          `;
          break;
        }
        case 'empty': {
          const buttonColors = getButtonVariantTokenValues(
            euiThemeContext,
            color,
            'empty'
          );

          const classicVariantStyles =
            !isRefreshVariant &&
            `
              &:focus,
              &:active {
                background-color: ${
                  euiButtonEmptyColor(euiThemeContext, color).backgroundColor
                };
              }
            `;

          const refreshVariantStyles =
            isRefreshVariant &&
            _interactionStyles(euiThemeContext, buttonColors, 'overlay');

          displaysColorsMap[display][color] = css`
            color: ${euiButtonEmptyColor(euiThemeContext, color).color};

            ${classicVariantStyles}
            ${refreshVariantStyles}
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
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'buttonVariant'
  );

  const focusCSS = isRefreshVariant
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
export const euiButtonSizeMap = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'buttonVariant'
  );

  return {
    xs: {
      minWidth: euiTheme.base * (isRefreshVariant ? 6 : 7),
      height: euiTheme.size.l,
      radius: euiTheme.border.radius.small,
      fontScale: 'xs' as const,
    },
    s: {
      minWidth: euiTheme.base * (isRefreshVariant ? 6 : 7),
      height: euiTheme.size.xl,
      radius: euiTheme.border.radius.small,
      fontScale: 's' as const,
    },
    m: {
      minWidth: euiTheme.base * 7,
      height: euiTheme.size.xxl,
      radius: isRefreshVariant
        ? euiTheme.border.radius.small
        : euiTheme.border.radius.medium,
      fontScale: 's' as const,
    },
  };
};

/**
 * internal styles util for applying button background color on hover
 */
const _interactionStyles = (
  euiThemeContext: UseEuiTheme,
  buttonColors: ButtonVariantColors,
  type: 'fill' | 'overlay' = 'fill'
) => {
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'buttonVariant'
  );

  if (!isRefreshVariant) return ``;

  const baseStyles = () => {
    // button hover is applied as pseudo element with a transparent background-color
    if (type === 'overlay') {
      return `
        position: relative;
        overflow: hidden;

        &:hover:not(:disabled) {
          &::before {
            content: '';
            position: absolute;
            /* should stay under the content */
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

    // button hover is applied as opaque color
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
