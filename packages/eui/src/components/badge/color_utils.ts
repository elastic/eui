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

  // Light (filled = false) color map as defined in the design tokens / Figma.
  // These are used when the `fill` prop is false.
  const lightMap = {
    default: '#E3E8F2',
    primary: '#D9E8FF',
    accent: '#FDDDE9',
    success: '#C9F3E3',
    warning: '#FDE9B5',
    danger: '#FDDDD8',
    risk: '#FFDEBF',
    neutral: '#CFEEF7',
    hollow: '#FFFFFF',
  } as const;

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
    // Light variants (fill = false)
    defaultLight: {
      ...getBadgeColors(euiThemeContext, lightMap.default),
      borderColor: highContrastMode ? euiTheme.border.color : '',
    },
    primaryLight: {
      ...getBadgeColors(euiThemeContext, lightMap.primary),
      borderColor: highContrastMode ? euiTheme.border.color : '',
    },
    accentLight: {
      ...getBadgeColors(euiThemeContext, lightMap.accent),
      borderColor: highContrastMode ? euiTheme.border.color : '',
    },
    neutralLight: {
      ...getBadgeColors(euiThemeContext, lightMap.neutral),
      borderColor: highContrastMode ? euiTheme.border.color : '',
    },
    successLight: {
      ...getBadgeColors(euiThemeContext, lightMap.success),
      borderColor: highContrastMode ? euiTheme.border.color : '',
    },
    warningLight: {
      ...getBadgeColors(euiThemeContext, lightMap.warning),
      borderColor: highContrastMode ? euiTheme.border.color : '',
    },
    dangerLight: {
      ...getBadgeColors(euiThemeContext, lightMap.danger),
      borderColor: highContrastMode ? euiTheme.border.color : '',
    },
    riskLight: {
      ...getBadgeColors(euiThemeContext, lightMap.risk),
      borderColor: highContrastMode ? euiTheme.border.color : '',
    },
    hollowLight: {
      ...getBadgeColors(euiThemeContext, lightMap.hollow),
      borderColor: highContrastMode
        ? euiTheme.border.color
        : euiTheme.components.badgeBorderColorHollow,
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
