/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeButton, computed } from '@elastic/eui-theme-common';
import { SEMANTIC_COLORS } from './colors/_semantic_colors';

const _buttons = {
  backgroundPrimary: computed(
    ([backgroundLightPrimary]) => backgroundLightPrimary,
    ['colors.backgroundLightPrimary']
  ),
  backgroundAccent: computed(
    ([backgroundLightAccent]) => backgroundLightAccent,
    ['colors.backgroundLightAccent']
  ),
  backgroundAccentSecondary: computed(
    ([backgroundLightAccentSecondary]) => backgroundLightAccentSecondary,
    ['colors.backgroundLightAccentSecondary']
  ),
  backgroundNeutral: computed(
    ([backgroundLightNeutral]) => backgroundLightNeutral,
    ['colors.backgroundLightNeutral']
  ),
  backgroundSuccess: computed(
    ([backgroundLightSuccess]) => backgroundLightSuccess,
    ['colors.backgroundLightSuccess']
  ),
  backgroundWarning: computed(
    ([backgroundLightWarning]) => backgroundLightWarning,
    ['colors.backgroundLightWarning']
  ),
  backgroundRisk: computed(
    ([backgroundLightRisk]) => backgroundLightRisk,
    ['colors.backgroundLightRisk']
  ),
  backgroundDanger: computed(
    ([backgroundLightDanger]) => backgroundLightDanger,
    ['colors.backgroundLightDanger']
  ),
  backgroundText: computed(
    ([backgroundLightText]) => backgroundLightText,
    ['colors.backgroundLightText']
  ),
  backgroundDisabled: computed(
    ([backgroundBaseDisabled]) => backgroundBaseDisabled,
    ['colors.backgroundBaseDisabled']
  ),

  backgroundFilledPrimary: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['colors.backgroundFilledPrimary']
  ),
  backgroundFilledAccent: computed(
    ([backgroundFilledAccent]) => backgroundFilledAccent,
    ['colors.backgroundFilledAccent']
  ),
  backgroundFilledAccentSecondary: computed(
    ([backgroundFilledAccentSecondary]) => backgroundFilledAccentSecondary,
    ['colors.backgroundFilledAccentSecondary']
  ),
  backgroundFilledNeutral: computed(
    ([backgroundFilledNeutral]) => backgroundFilledNeutral,
    ['colors.backgroundFilledNeutral']
  ),
  backgroundFilledSuccess: computed(
    ([backgroundFilledSuccess]) => backgroundFilledSuccess,
    ['colors.backgroundFilledSuccess']
  ),
  backgroundFilledWarning: computed(
    ([backgroundFilledWarning]) => backgroundFilledWarning,
    ['colors.backgroundFilledWarning']
  ),
  backgroundFilledRisk: computed(
    ([backgroundFilledRisk]) => backgroundFilledRisk,
    ['colors.backgroundFilledRisk']
  ),
  backgroundFilledDanger: computed(
    ([backgroundFilledDanger]) => backgroundFilledDanger,
    ['colors.backgroundFilledDanger']
  ),
  backgroundFilledText: computed(
    ([backgroundFilledText]) => backgroundFilledText,
    ['colors.backgroundFilledText']
  ),
  backgroundFilledDisabled: computed(
    ([backgroundBaseDisabled]) => backgroundBaseDisabled,
    ['colors.backgroundBaseDisabled']
  ),

  // Temp. mapping to support more variants in old theme
  backgroundEmptyPrimaryHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),
  backgroundEmptyAccentHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),
  backgroundEmptyAccentSecondaryHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),
  backgroundEmptyNeutralHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),
  backgroundEmptySuccessHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),
  backgroundEmptyWarningHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),
  backgroundEmptyRiskHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),
  backgroundEmptyDangerHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),
  backgroundEmptyTextHover: computed(
    ([backgroundBaseInteractiveHover]) => backgroundBaseInteractiveHover,
    ['colors.backgroundBaseInteractiveHover']
  ),

  textColorPrimary: computed(
    ([textPrimary]) => textPrimary,
    ['colors.textPrimary']
  ),
  textColorAccent: computed(
    ([textAccent]) => textAccent,
    ['colors.textAccent']
  ),
  textColorAccentSecondary: computed(
    ([textAccentSecondary]) => textAccentSecondary,
    ['colors.textAccentSecondary']
  ),
  textColorNeutral: computed(
    ([textNeutral]) => textNeutral,
    ['colors.textNeutral']
  ),
  textColorSuccess: computed(
    ([textSuccess]) => textSuccess,
    ['colors.textSuccess']
  ),
  textColorWarning: computed(
    ([textWarning]) => textWarning,
    ['colors.textWarning']
  ),
  textColorRisk: computed(([textRisk]) => textRisk, ['colors.textRisk']),
  textColorDanger: computed(
    ([textDanger]) => textDanger,
    ['colors.textDanger']
  ),
  textColorText: computed(
    ([textParagraph]) => textParagraph,
    ['colors.textParagraph']
  ),
  textColorDisabled: computed(
    ([textDisabled]) => textDisabled,
    ['colors.textDisabled']
  ),

  textColorFilledPrimary: computed(
    ([textInverse]) => textInverse,
    ['colors.textInverse']
  ),
  textColorFilledAccent: computed(
    ([textInverse]) => textInverse,
    ['colors.textInverse']
  ),
  textColorFilledAccentSecondary: computed(
    ([textInverse]) => textInverse,
    ['colors.textInverse']
  ),
  textColorFilledNeutral: computed(
    ([textInverse]) => textInverse,
    ['colors.textInverse']
  ),
  textColorFilledSuccess: computed(
    ([textInverse]) => textInverse,
    ['colors.textInverse']
  ),
  textColorFilledWarning: SEMANTIC_COLORS.warning110,
  textColorFilledRisk: computed(
    ([textInverse]) => textInverse,
    ['colors.textInverse']
  ),
  textColorFilledDanger: computed(
    ([textInverse]) => textInverse,
    ['colors.textInverse']
  ),
  textColorFilledText: computed(
    ([textInverse]) => textInverse,
    ['colors.textInverse']
  ),
  textColorFilledDisabled: computed(
    ([textDisabled]) => textDisabled,
    ['colors.textDisabled']
  ),
};

const _dark_buttons = {
  ..._buttons,

  textColorFilledWarning: SEMANTIC_COLORS.warning110,
};

export const buttons: _EuiThemeButton = {
  LIGHT: _buttons,
  DARK: _dark_buttons,
};
