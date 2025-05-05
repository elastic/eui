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
  euiButtonColor,
  euiButtonFillColor,
} from '../../global_styling/mixins/_button';
import { chromaValid, parseColor } from '../color_picker/utils';

export const euiBadgeColors = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const badgeColorsAccentText = getBadgeColors(
    euiThemeContext,
    euiTheme.colors.textAccent
  );

  return {
    // Colors shared between buttons and badges
    primary: euiButtonFillColor(euiThemeContext, 'primary'),
    neutral: euiButtonFillColor(euiThemeContext, 'neutral'),
    success: euiButtonFillColor(euiThemeContext, 'success'),
    warning: euiButtonFillColor(euiThemeContext, 'warning'),
    risk: euiButtonFillColor(euiThemeContext, 'risk'),
    danger: euiButtonFillColor(euiThemeContext, 'danger'),
    accent: euiButtonFillColor(euiThemeContext, 'accent'),
    disabled: {
      ...euiButtonColor(euiThemeContext, 'disabled'),
      borderColor: highContrastMode ? euiTheme.colors.textDisabled : '',
    },
    // Colors unique to badges
    default: {
      ...getBadgeColors(euiThemeContext, euiTheme.components.badgeBackground),
      borderColor: highContrastMode ? euiTheme.border.color : '',
    },
    // Hollow has a border and is used for autocompleters and beta badges
    hollow: {
      ...getBadgeColors(euiThemeContext, euiTheme.colors.emptyShade),
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
    ? euiTheme.colors.ghost
    : euiTheme.colors.ink;

  return textColor;
};

export const getColorContrast = (textColor: string, color: string) => {
  return chroma.contrast(textColor, color);
};

export const getIsValidColor = (color?: string) => {
  return chromaValid(parseColor(color || '') || '');
};
