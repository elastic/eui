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
  backgroundDisabled: background_colors.backgroundDisabled,

  backgroundFilledPrimary: background_colors.backgroundFilledPrimary,
  backgroundFilledAccent: background_colors.backgroundFilledAccent,
  backgroundFilledAccentSecondary:
    background_colors.backgroundFilledAccentSecondary,
  backgroundFilledSuccess: background_colors.backgroundFilledSuccess,
  backgroundFilledWarning: background_colors.backgroundFilledWarning,
  backgroundFilledDanger: background_colors.backgroundFilledDanger,
  backgroundFilledText: background_colors.backgroundFilledText,
  backgroundFilledDisabled: background_colors.backgroundDisabled,

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
  ..._buttons,

  backgroundPrimary: dark_background_colors.backgroundLightPrimary,
  backgroundAccent: dark_background_colors.backgroundLightAccent,
  backgroundAccentSecondary:
    dark_background_colors.backgroundLightAccentSecondary,
  backgroundSuccess: dark_background_colors.backgroundLightSuccess,
  backgroundWarning: dark_background_colors.backgroundLightWarning,
  backgroundDanger: dark_background_colors.backgroundLightDanger,
  backgroundText: dark_background_colors.backgroundLightText,
  backgroundDisabled: SEMANTIC_COLORS.plainDark,

  textPrimary: dark_brand_text_colors.textPrimary,
  textAccent: dark_brand_text_colors.textAccent,
  textAccentSecondary: dark_brand_text_colors.textAccentSecondary,
  textSuccess: dark_brand_text_colors.textSuccess,
  textWarning: dark_brand_text_colors.textWarning,
  textDanger: dark_brand_text_colors.textDanger,
  textDisabled: dark_text_colors.textDisabled,
};

export const buttons: _EuiThemeButton = {
  LIGHT: _buttons,
  DARK: _dark_buttons,
};
