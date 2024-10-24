/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeButton } from '@elastic/eui-theme-common';
import { SEMANTIC_COLORS } from './colors/_semantic_colors';
import {
  background_colors,
  brand_text_colors,
  text_colors,
} from './colors/_colors_light';
import {
  dark_background_colors,
  dark_brand_text_colors,
  dark_text_colors,
} from './colors/_colors_dark';

const _buttons = {
  backgroundPrimary: background_colors.backgroundLightPrimary,
  backgroundAccent: background_colors.backgroundLightAccent,
  backgroundAccentSecondary: background_colors.backgroundLightAccentSecondary,
  backgroundSuccess: background_colors.backgroundLightSuccess,
  backgroundWarning: background_colors.backgroundLightWarning,
  backgroundDanger: background_colors.backgroundLightDanger,
  backgroundText: background_colors.backgroundLightText,
  backgroundDisabled: background_colors.backgroundBaseDisabled,

  backgroundFilledPrimary: background_colors.backgroundFilledPrimary,
  backgroundFilledAccent: background_colors.backgroundFilledAccent,
  backgroundFilledAccentSecondary:
    background_colors.backgroundFilledAccentSecondary,
  backgroundFilledSuccess: background_colors.backgroundFilledSuccess,
  backgroundFilledWarning: background_colors.backgroundFilledWarning,
  backgroundFilledDanger: background_colors.backgroundFilledDanger,
  backgroundFilledText: background_colors.backgroundFilledText,
  backgroundFilledDisabled: background_colors.backgroundBaseDisabled,

  // Temp. mapping to support more variants in old theme
  backgroundEmptyPrimaryHover: background_colors.backgroundBaseInteractiveHover,
  backgroundEmptyAccentHover: background_colors.backgroundBaseInteractiveHover,
  backgroundEmptyAccentSecondaryHover:
    background_colors.backgroundBaseInteractiveHover,
  backgroundEmptySuccessHover: background_colors.backgroundBaseInteractiveHover,
  backgroundEmptyWarningHover: background_colors.backgroundBaseInteractiveHover,
  backgroundEmptyDangerHover: background_colors.backgroundBaseInteractiveHover,
  backgroundEmptyTextHover: background_colors.backgroundBaseInteractiveHover,

  textColorPrimary: brand_text_colors.textPrimary,
  textColorAccent: brand_text_colors.textAccent,
  textColorAccentSecondary: brand_text_colors.textAccentSecondary,
  textColorSuccess: brand_text_colors.textSuccess,
  textColorWarning: brand_text_colors.textWarning,
  textColorDanger: brand_text_colors.textDanger,
  textColorText: text_colors.textParagraph,
  textColorDisabled: text_colors.textDisabled,

  textColorFilledPrimary: text_colors.textInverse,
  textColorFilledAccent: text_colors.textInverse,
  textColorFilledAccentSecondary: text_colors.textInverse,
  textColorFilledSuccess: text_colors.textInverse,
  textColorFilledWarning: SEMANTIC_COLORS.warning110,
  textColorFilledDanger: text_colors.textInverse,
  textColorFilledText: text_colors.textInverse,
  textColorFilledDisabled: text_colors.textDisabled,
};

const _dark_buttons = {
  backgroundPrimary: dark_background_colors.backgroundLightPrimary,
  backgroundAccent: dark_background_colors.backgroundLightAccent,
  backgroundAccentSecondary:
    dark_background_colors.backgroundLightAccentSecondary,
  backgroundSuccess: dark_background_colors.backgroundLightSuccess,
  backgroundWarning: dark_background_colors.backgroundLightWarning,
  backgroundDanger: dark_background_colors.backgroundLightDanger,
  backgroundText: dark_background_colors.backgroundLightText,
  backgroundDisabled: dark_background_colors.backgroundBaseDisabled,

  backgroundFilledPrimary: dark_background_colors.backgroundFilledPrimary,
  backgroundFilledAccent: dark_background_colors.backgroundFilledAccent,
  backgroundFilledAccentSecondary:
    dark_background_colors.backgroundFilledAccentSecondary,
  backgroundFilledSuccess: dark_background_colors.backgroundFilledSuccess,
  backgroundFilledWarning: dark_background_colors.backgroundFilledWarning,
  backgroundFilledDanger: dark_background_colors.backgroundFilledDanger,
  backgroundFilledText: dark_background_colors.backgroundFilledText,
  backgroundFilledDisabled: dark_background_colors.backgroundBaseDisabled,

  backgroundEmptyPrimaryHover:
    dark_background_colors.backgroundBaseInteractiveHover,
  backgroundEmptyAccentHover:
    dark_background_colors.backgroundBaseInteractiveHover,
  backgroundEmptyAccentSecondaryHover:
    dark_background_colors.backgroundBaseInteractiveHover,
  backgroundEmptySuccessHover:
    dark_background_colors.backgroundBaseInteractiveHover,
  backgroundEmptyWarningHover:
    dark_background_colors.backgroundBaseInteractiveHover,
  backgroundEmptyDangerHover:
    dark_background_colors.backgroundBaseInteractiveHover,
  backgroundEmptyTextHover:
    dark_background_colors.backgroundBaseInteractiveHover,

  textColorPrimary: dark_brand_text_colors.textPrimary,
  textColorAccent: dark_brand_text_colors.textAccent,
  textColorAccentSecondary: dark_brand_text_colors.textAccentSecondary,
  textColorSuccess: dark_brand_text_colors.textSuccess,
  textColorWarning: dark_brand_text_colors.textWarning,
  textColorDanger: dark_brand_text_colors.textDanger,
  textColorText: dark_text_colors.textParagraph,
  textColorDisabled: dark_text_colors.textDisabled,

  textColorFilledPrimary: dark_text_colors.textInverse,
  textColorFilledAccent: dark_text_colors.textInverse,
  textColorFilledAccentSecondary: dark_text_colors.textInverse,
  textColorFilledSuccess: dark_text_colors.textInverse,
  textColorFilledWarning: SEMANTIC_COLORS.warning110,
  textColorFilledDanger: dark_text_colors.textInverse,
  textColorFilledText: dark_text_colors.textInverse,
  textColorFilledDisabled: dark_text_colors.textDisabled,
};

export const buttons: _EuiThemeButton = {
  LIGHT: _buttons,
  DARK: _dark_buttons,
};
