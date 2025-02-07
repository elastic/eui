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
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: background_colors.backgroundBasePlain,
        default: background_colors.backgroundLightPrimary,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundAccent: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: background_colors.backgroundBasePlain,
        default: background_colors.backgroundLightAccent,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundAccentSecondary: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: background_colors.backgroundBasePlain,
        default: background_colors.backgroundLightAccentSecondary,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundSuccess: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: background_colors.backgroundBasePlain,
        default: background_colors.backgroundLightSuccess,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundWarning: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: background_colors.backgroundBasePlain,
        default: background_colors.backgroundLightWarning,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundDanger: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: background_colors.backgroundBasePlain,
        default: background_colors.backgroundLightDanger,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundText: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: background_colors.backgroundBasePlain,
        default: background_colors.backgroundLightText,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundDisabled: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: background_colors.backgroundBasePlain,
        default: background_colors.backgroundBaseDisabled,
      });
    },
    ['flags.buttonVariant']
  ),

  backgroundHover: background_colors.backgroundBaseInteractiveHover,
  backgroundActive: SEMANTIC_COLORS.primary100Alpha8,

  backgroundFilledPrimary: background_colors.backgroundFilledPrimary,
  backgroundFilledAccent: background_colors.backgroundFilledAccent,
  backgroundFilledAccentSecondary:
    background_colors.backgroundFilledAccentSecondary,
  backgroundFilledSuccess: background_colors.backgroundFilledSuccess,
  backgroundFilledWarning: background_colors.backgroundFilledWarning,
  backgroundFilledDanger: background_colors.backgroundFilledDanger,
  backgroundFilledText: background_colors.backgroundFilledText,
  backgroundFilledDisabled: background_colors.backgroundBaseDisabled,

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
  backgroundEmptyWarningHover: SEMANTIC_COLORS.warning40Alpha24,
  backgroundEmptyDangerHover: SEMANTIC_COLORS.danger70Alpha12,
  backgroundEmptyTextHover: SEMANTIC_COLORS.primary100Alpha8,

  backgroundEmptyPrimaryActive: SEMANTIC_COLORS.primary70Alpha16,
  backgroundEmptyAccentActive: SEMANTIC_COLORS.accent70Alpha16,
  backgroundEmptyAccentSecondaryActive:
    SEMANTIC_COLORS.accentSecondary70Alpha16,
  backgroundEmptySuccessActive: SEMANTIC_COLORS.success70Alpha16,
  backgroundEmptyWarningActive: SEMANTIC_COLORS.warning40Alpha28,
  backgroundEmptyDangerActive: SEMANTIC_COLORS.danger70Alpha16,
  backgroundEmptyTextActive: SEMANTIC_COLORS.primary100Alpha12,

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
  // backgroundPrimary: dark_background_colors.backgroundLightPrimary,
  // backgroundAccent: dark_background_colors.backgroundLightAccent,
  // backgroundAccentSecondary:
  //   dark_background_colors.backgroundLightAccentSecondary,
  // backgroundSuccess: dark_background_colors.backgroundLightSuccess,
  // backgroundWarning: dark_background_colors.backgroundLightWarning,
  // backgroundDanger: dark_background_colors.backgroundLightDanger,
  // backgroundText: dark_background_colors.backgroundLightText,
  // backgroundDisabled: dark_background_colors.backgroundBaseDisabled,

  backgroundPrimary: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: dark_background_colors.backgroundBasePlain,
        default: dark_background_colors.backgroundLightPrimary,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundAccent: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: dark_background_colors.backgroundBasePlain,
        default: dark_background_colors.backgroundLightAccent,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundAccentSecondary: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: dark_background_colors.backgroundBasePlain,
        default: dark_background_colors.backgroundLightAccentSecondary,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundSuccess: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: dark_background_colors.backgroundBasePlain,
        default: dark_background_colors.backgroundLightSuccess,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundWarning: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: dark_background_colors.backgroundBasePlain,
        default: dark_background_colors.backgroundLightWarning,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundDanger: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: dark_background_colors.backgroundBasePlain,
        default: dark_background_colors.backgroundLightDanger,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundText: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: dark_background_colors.backgroundBasePlain,
        default: dark_background_colors.backgroundLightText,
      });
    },
    ['flags.buttonVariant']
  ),
  backgroundDisabled: computed(
    ([buttonVariant]) => {
      return getTokenByVariant(buttonVariant, {
        experimental: dark_background_colors.backgroundBasePlain,
        default: dark_background_colors.backgroundBaseDisabled,
      });
    },
    ['flags.buttonVariant']
  ),

  backgroundHover: dark_background_colors.backgroundBaseInteractiveHover,
  backgroundActive: SEMANTIC_COLORS.plainLightAlpha12,

  backgroundFilledPrimary: dark_background_colors.backgroundFilledPrimary,
  backgroundFilledAccent: dark_background_colors.backgroundFilledAccent,
  backgroundFilledAccentSecondary:
    dark_background_colors.backgroundFilledAccentSecondary,
  backgroundFilledSuccess: dark_background_colors.backgroundFilledSuccess,
  backgroundFilledWarning: dark_background_colors.backgroundFilledWarning,
  backgroundFilledDanger: dark_background_colors.backgroundFilledDanger,
  backgroundFilledText: dark_background_colors.backgroundFilledText,
  backgroundFilledDisabled: dark_background_colors.backgroundBaseDisabled,

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
  backgroundEmptyWarningHover: SEMANTIC_COLORS.warning40Alpha12,
  backgroundEmptyDangerHover: SEMANTIC_COLORS.danger70Alpha16,
  backgroundEmptyTextHover: SEMANTIC_COLORS.plainLightAlpha12,

  backgroundEmptyPrimaryActive: SEMANTIC_COLORS.primary70Alpha20,
  backgroundEmptyAccentActive: SEMANTIC_COLORS.accent70Alpha20,
  backgroundEmptyAccentSecondaryActive:
    SEMANTIC_COLORS.accentSecondary70Alpha20,
  backgroundEmptySuccessActive: SEMANTIC_COLORS.success70Alpha20,
  backgroundEmptyWarningActive: SEMANTIC_COLORS.warning40Alpha16,
  backgroundEmptyDangerActive: SEMANTIC_COLORS.danger70Alpha20,
  backgroundEmptyTextActive: SEMANTIC_COLORS.plainLightAlpha16,

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
