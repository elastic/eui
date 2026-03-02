/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';

import { UseEuiTheme, isColorDark } from '../../services';
import {
  getEuiButtonColorValues,
  getEuiFilledButtonColorValues,
} from '../../global_styling/mixins/_button';
import { chromaValid, parseColor } from '../color_picker/utils';

export const euiBadgeColors = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const badgeColorsAccentText = getBadgeColors(
    euiThemeContext,
    euiTheme.colors.textAccent
  );

  const fill = {
    // Colors shared between buttons and badges
    primary: getEuiFilledButtonColorValues(euiThemeContext, 'primary'),
    neutral: getEuiFilledButtonColorValues(euiThemeContext, 'neutral'),
    success: getEuiFilledButtonColorValues(euiThemeContext, 'success'),
    warning: getEuiFilledButtonColorValues(euiThemeContext, 'warning'),
    risk: getEuiFilledButtonColorValues(euiThemeContext, 'risk'),
    danger: getEuiFilledButtonColorValues(euiThemeContext, 'danger'),
    accent: getEuiFilledButtonColorValues(euiThemeContext, 'accent'),
    // Colors unique to badges
    default: {
      ...getBadgeColors(euiThemeContext, euiTheme.components.badgeBackground),
      backgroundHover: euiTheme.components.buttons.backgroundFilledTextHover,
      backgroundActive: euiTheme.components.buttons.backgroundFilledTextActive,
      borderColor: 'transparent',
    },
  };

  const base = {
    primary: getEuiButtonColorValues(euiThemeContext, 'primary'),
    neutral: getEuiButtonColorValues(euiThemeContext, 'neutral'),
    success: getEuiButtonColorValues(euiThemeContext, 'success'),
    warning: getEuiButtonColorValues(euiThemeContext, 'warning'),
    risk: getEuiButtonColorValues(euiThemeContext, 'risk'),
    danger: getEuiButtonColorValues(euiThemeContext, 'danger'),
    accent: getEuiButtonColorValues(euiThemeContext, 'accent'),
    default: {
      ...getBadgeColors(euiThemeContext, euiTheme.colors.backgroundLightText),
      backgroundHover: euiTheme.components.buttons.backgroundTextHover,
      backgroundActive: euiTheme.components.buttons.backgroundTextActive,
      borderColor: highContrastMode ? euiTheme.border.color : '',
    },
  };

  return {
    fill,
    base,
    disabled: {
      ...getEuiButtonColorValues(euiThemeContext, 'disabled'),
      borderColor: highContrastMode ? euiTheme.colors.textDisabled : '',
    },
    // Hollow has a border and is used for autocompleters and beta badges
    hollow: {
      ...getBadgeColors(euiThemeContext, euiTheme.colors.emptyShade),
      backgroundHover: euiTheme.components.buttons.backgroundTextHover,
      backgroundActive: euiTheme.components.buttons.backgroundTextActive,
      borderColor: highContrastMode
        ? euiTheme.border.color
        : euiTheme.components.badgeBorderColorHollow,
    },
    // Colors used by beta and notification badges
    subdued: {
      ...getBadgeColors(
        euiThemeContext,
        euiTheme.components.badgeBackgroundSubdued
      ),
      borderColor: highContrastMode ? euiTheme.border.color : '',
    },
    accentText: {
      ...badgeColorsAccentText,
      borderColor: highContrastMode
        ? badgeColorsAccentText.backgroundColor
        : '',
    },
  };
};

export const getBadgeColors = (
  euiThemeContext: UseEuiTheme,
  backgroundColor: string
) => {
  const color = getTextColor(euiThemeContext, backgroundColor);

  return {
    backgroundColor,
    color,
  };
};

export const getTextColor = ({ euiTheme }: UseEuiTheme, bgColor: string) => {
  const textColor = isColorDark(...chroma(bgColor).rgb())
    ? euiTheme.colors.textGhost
    : euiTheme.colors.textInk;

  return textColor;
};

/**
 * Generates the background hover and active colors for custom interactive badges by mixing
 * the background color with black or white depending on the background color luminance.
 * @returns { backgroundHover: string, backgroundActive: string }
 */
export const getCustomInteractiveColors = (
  { euiTheme }: UseEuiTheme,
  bgColor: string
) => {
  const isDarkColor = isColorDark(...chroma(bgColor).rgb());
  const backgroundHover = isDarkColor
    ? `color-mix(in oklab, ${bgColor}, ${euiTheme.colors.textGhost} 10%)`
    : `color-mix(in oklab, ${bgColor}, ${euiTheme.colors.textInk} 10%)`;
  const backgroundActive = isDarkColor
    ? `color-mix(in oklab, ${bgColor}, ${euiTheme.colors.textGhost} 15%)`
    : `color-mix(in oklab, ${bgColor}, ${euiTheme.colors.textInk} 15%)`;

  return {
    backgroundHover,
    backgroundActive,
  };
};

export const getIsValidColor = (color?: string) => {
  return chromaValid(parseColor(color || '') || '');
};
