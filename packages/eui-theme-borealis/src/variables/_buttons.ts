/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  _EuiThemeButton,
  _EuiThemeFlags,
  ColorModeSwitch,
  computed,
} from '@elastic/eui-theme-common';
import { SEMANTIC_COLORS } from './colors/_semantic_colors';

const getTokenByVariant = (
  buttonVariant: _EuiThemeFlags['buttonVariant'],
  tokens: {
    default: ColorModeSwitch;
    experimental: ColorModeSwitch;
  }
) => {
  switch (buttonVariant) {
    case 'experimental':
      return tokens.experimental;
    default: {
      return tokens.default;
    }
  }
};

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
  backgroundSuccess: computed(
    ([backgroundLightSuccess]) => backgroundLightSuccess,
    ['colors.backgroundLightSuccess']
  ),
  backgroundWarning: computed(
    ([backgroundLightWarning]) => backgroundLightWarning,
    ['colors.backgroundLightWarning']
  ),
  backgroundDanger: computed(
    ([backgroundLightDanger]) => backgroundLightDanger,
    ['colors.backgroundLightDanger']
  ),
  backgroundText: computed(
    ([buttonVariant, backgroundBasePlain, backgroundLightText]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: backgroundBasePlain,
        default: backgroundLightText,
      });
    },
    [
      'flags.buttonVariant',
      'colors.backgroundBasePlain',
      'colors.backgroundLightText',
    ]
  ),
  backgroundDisabled: computed(
    ([backgroundBaseDisabled]) => backgroundBaseDisabled,
    ['colors.backgroundBaseDisabled']
  ),

  backgroundPrimaryHover: SEMANTIC_COLORS.primary70Alpha12,
  backgroundAccentHover: SEMANTIC_COLORS.accent70Alpha12,
  backgroundAccentSecondaryHover: SEMANTIC_COLORS.accentSecondary70Alpha12,
  backgroundSuccessHover: SEMANTIC_COLORS.success70Alpha12,
  backgroundWarningHover: SEMANTIC_COLORS.warning60Alpha16,
  backgroundDangerHover: SEMANTIC_COLORS.danger70Alpha12,
  backgroundTextHover: SEMANTIC_COLORS.primary100Alpha8,

  backgroundPrimaryActive: SEMANTIC_COLORS.primary70Alpha16,
  backgroundAccentActive: SEMANTIC_COLORS.accent70Alpha16,
  backgroundAccentSecondaryActive: SEMANTIC_COLORS.accentSecondary70Alpha16,
  backgroundSuccessActive: SEMANTIC_COLORS.success70Alpha16,
  backgroundWarningActive: SEMANTIC_COLORS.warning60Alpha20,
  backgroundDangerActive: SEMANTIC_COLORS.danger70Alpha16,
  backgroundTextActive: SEMANTIC_COLORS.primary100Alpha12,

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
  backgroundFilledSuccess: computed(
    ([backgroundFilledSuccess]) => backgroundFilledSuccess,
    ['colors.backgroundFilledSuccess']
  ),
  backgroundFilledWarning: computed(
    ([backgroundFilledWarning]) => backgroundFilledWarning,
    ['colors.backgroundFilledWarning']
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

  backgroundFilledPrimaryHover: SEMANTIC_COLORS.primary100,
  backgroundFilledAccentHover: SEMANTIC_COLORS.accent100,
  backgroundFilledAccentSecondaryHover: SEMANTIC_COLORS.accentSecondary100,
  backgroundFilledSuccessHover: SEMANTIC_COLORS.success100,
  backgroundFilledWarningHover: SEMANTIC_COLORS.warning50,
  backgroundFilledDangerHover: SEMANTIC_COLORS.danger100,
  backgroundFilledTextHover: SEMANTIC_COLORS.shade100,

  backgroundFilledPrimaryActive: SEMANTIC_COLORS.primary110,
  backgroundFilledAccentActive: SEMANTIC_COLORS.accent110,
  backgroundFilledAccentSecondaryActive: SEMANTIC_COLORS.accentSecondary110,
  backgroundFilledSuccessActive: SEMANTIC_COLORS.success110,
  backgroundFilledWarningActive: SEMANTIC_COLORS.warning60,
  backgroundFilledDangerActive: SEMANTIC_COLORS.danger110,
  backgroundFilledTextActive: SEMANTIC_COLORS.shade110,

  backgroundEmptyPrimaryHover: SEMANTIC_COLORS.primary70Alpha12,
  backgroundEmptyAccentHover: SEMANTIC_COLORS.accent70Alpha12,
  backgroundEmptyAccentSecondaryHover: SEMANTIC_COLORS.accentSecondary70Alpha12,
  backgroundEmptySuccessHover: SEMANTIC_COLORS.success70Alpha12,
  backgroundEmptyWarningHover: SEMANTIC_COLORS.warning60Alpha16,
  backgroundEmptyDangerHover: SEMANTIC_COLORS.danger70Alpha12,
  backgroundEmptyTextHover: SEMANTIC_COLORS.primary100Alpha8,

  backgroundEmptyPrimaryActive: SEMANTIC_COLORS.primary70Alpha16,
  backgroundEmptyAccentActive: SEMANTIC_COLORS.accent70Alpha16,
  backgroundEmptyAccentSecondaryActive:
    SEMANTIC_COLORS.accentSecondary70Alpha16,
  backgroundEmptySuccessActive: SEMANTIC_COLORS.success70Alpha16,
  backgroundEmptyWarningActive: SEMANTIC_COLORS.warning60Alpha20,
  backgroundEmptyDangerActive: SEMANTIC_COLORS.danger70Alpha16,
  backgroundEmptyTextActive: SEMANTIC_COLORS.primary100Alpha12,

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
  textColorSuccess: computed(
    ([textSuccess]) => textSuccess,
    ['colors.textSuccess']
  ),
  textColorWarning: computed(
    ([textWarning]) => textWarning,
    ['colors.textWarning']
  ),
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
  textColorFilledSuccess: computed(
    ([textInverse]) => textInverse,
    ['colors.textInverse']
  ),
  textColorFilledWarning: SEMANTIC_COLORS.warning110,
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

  backgroundPrimaryHover: SEMANTIC_COLORS.primary70Alpha16,
  backgroundAccentHover: SEMANTIC_COLORS.accent70Alpha16,
  backgroundAccentSecondaryHover: SEMANTIC_COLORS.accentSecondary70Alpha16,
  backgroundSuccessHover: SEMANTIC_COLORS.success70Alpha16,
  backgroundWarningHover: SEMANTIC_COLORS.warning60Alpha12,
  backgroundDangerHover: SEMANTIC_COLORS.danger70Alpha16,
  backgroundTextHover: SEMANTIC_COLORS.plainLightAlpha12,

  backgroundPrimaryActive: SEMANTIC_COLORS.primary70Alpha20,
  backgroundAccentActive: SEMANTIC_COLORS.accent70Alpha20,
  backgroundAccentSecondaryActive: SEMANTIC_COLORS.accentSecondary70Alpha20,
  backgroundSuccessActive: SEMANTIC_COLORS.success70Alpha20,
  backgroundWarningActive: SEMANTIC_COLORS.warning60Alpha16,
  backgroundDangerActive: SEMANTIC_COLORS.danger70Alpha20,
  backgroundTextActive: SEMANTIC_COLORS.plainLightAlpha16,

  backgroundFilledPrimaryHover: SEMANTIC_COLORS.primary70,
  backgroundFilledAccentHover: SEMANTIC_COLORS.accent70,
  backgroundFilledAccentSecondaryHover: SEMANTIC_COLORS.accentSecondary70,
  backgroundFilledSuccessHover: SEMANTIC_COLORS.success70,
  backgroundFilledWarningHover: SEMANTIC_COLORS.warning50,
  backgroundFilledDangerHover: SEMANTIC_COLORS.danger70,
  backgroundFilledTextHover: SEMANTIC_COLORS.shade70,

  backgroundFilledPrimaryActive: SEMANTIC_COLORS.primary80,
  backgroundFilledAccentActive: SEMANTIC_COLORS.accent80,
  backgroundFilledAccentSecondaryActive: SEMANTIC_COLORS.accentSecondary80,
  backgroundFilledSuccessActive: SEMANTIC_COLORS.success80,
  backgroundFilledWarningActive: SEMANTIC_COLORS.warning60,
  backgroundFilledDangerActive: SEMANTIC_COLORS.danger80,
  backgroundFilledTextActive: SEMANTIC_COLORS.shade80,

  backgroundEmptyPrimaryHover: SEMANTIC_COLORS.primary70Alpha16,
  backgroundEmptyAccentHover: SEMANTIC_COLORS.accent70Alpha16,
  backgroundEmptyAccentSecondaryHover: SEMANTIC_COLORS.accentSecondary70Alpha16,
  backgroundEmptySuccessHover: SEMANTIC_COLORS.success70Alpha16,
  backgroundEmptyWarningHover: SEMANTIC_COLORS.warning60Alpha12,
  backgroundEmptyDangerHover: SEMANTIC_COLORS.danger70Alpha16,
  backgroundEmptyTextHover: SEMANTIC_COLORS.plainLightAlpha12,

  backgroundEmptyPrimaryActive: SEMANTIC_COLORS.primary70Alpha20,
  backgroundEmptyAccentActive: SEMANTIC_COLORS.accent70Alpha20,
  backgroundEmptyAccentSecondaryActive:
    SEMANTIC_COLORS.accentSecondary70Alpha20,
  backgroundEmptySuccessActive: SEMANTIC_COLORS.success70Alpha20,
  backgroundEmptyWarningActive: SEMANTIC_COLORS.warning60Alpha16,
  backgroundEmptyDangerActive: SEMANTIC_COLORS.danger70Alpha20,
  backgroundEmptyTextActive: SEMANTIC_COLORS.plainLightAlpha16,

  textColorFilledWarning: SEMANTIC_COLORS.warning110,
};

export const buttons: _EuiThemeButton = {
  LIGHT: _buttons,
  DARK: _dark_buttons,
};
