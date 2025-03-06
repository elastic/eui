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
  const { euiTheme } = euiThemeContext;

  return {
    // Colors shared between buttons and badges
    primary: euiButtonFillColor(euiThemeContext, 'primary'),
    success: euiButtonFillColor(euiThemeContext, 'success'),
    warning: euiButtonFillColor(euiThemeContext, 'warning'),
    danger: euiButtonFillColor(euiThemeContext, 'danger'),
    accent: euiButtonFillColor(euiThemeContext, 'accent'),
    accentSecondary: euiButtonFillColor(euiThemeContext, 'accentSecondary'),
    disabled: euiButtonColor(euiThemeContext, 'disabled'),
    // Colors unique to badges
    default: getBadgeColors(
      euiThemeContext,
      euiTheme.components.badgeBackground
    ),
    // Hollow has a border and is used for autocompleters and beta badges
    hollow: {
      ...getBadgeColors(euiThemeContext, euiTheme.colors.emptyShade),
      borderColor: euiTheme.components.badgeBorderColorHollow,
    },
    // Colors used by beta and notification badges
    subdued: getBadgeColors(
      euiThemeContext,
      euiTheme.components.badgeBackgroundSubdued
    ),
    accentText: getBadgeColors(euiThemeContext, euiTheme.colors.textAccent),
    accentSecondaryText: getBadgeColors(
      euiThemeContext,
      euiTheme.colors.textAccentSecondary
    ),
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
