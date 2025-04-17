/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeButton, computed } from '@elastic/eui-theme-common';

import { hexToRgb } from '../../../../services/color/hex_to_rgb';
import { isColorDark } from '../../../../services/color/is_color_dark';
import { tint, transparentize } from '../../../../services/color/manipulation';
import { severityColors } from './_colors_severity';

const isDark = (background: string) =>
  background ? isColorDark(...hexToRgb(background)) : false;

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
    ([lightShade]) => transparentize(lightShade, 0.15),
    ['colors.lightShade']
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
    ([backgroundFilledAccent]) => backgroundFilledAccent,
    ['colors.backgroundFilledAccent']
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
    ([lightShade]) => transparentize(lightShade, 0.15),
    ['colors.lightShade']
  ),

  backgroundEmptyPrimaryHover: computed(
    ([primary]) => transparentize(primary, 0.1),
    ['colors.primary']
  ),
  backgroundEmptyAccentHover: computed(
    ([accent]) => transparentize(accent, 0.1),
    ['colors.accent']
  ),
  backgroundEmptyAccentSecondaryHover: computed(
    ([success]) => transparentize(success, 0.1),
    ['colors.success']
  ),
  backgroundEmptyNeutralHover: transparentize(severityColors.neutral, 0.1),
  backgroundEmptySuccessHover: computed(
    ([success]) => transparentize(success, 0.1),
    ['colors.success']
  ),
  backgroundEmptyWarningHover: computed(
    ([warning]) => transparentize(warning, 0.1),
    ['colors.warning']
  ),
  backgroundEmptyRiskHover: transparentize(severityColors.risk, 0.1),
  backgroundEmptyDangerHover: computed(
    ([danger]) => transparentize(danger, 0.1),
    ['colors.danger']
  ),
  backgroundEmptyTextHover: computed(
    ([lightShade]) => transparentize(lightShade, 0.2),
    ['colors.lightShade']
  ),

  textColorPrimary: computed(
    ([primaryText]) => primaryText,
    ['colors.primaryText']
  ),
  textColorAccent: computed(
    ([accentText]) => accentText,
    ['colors.accentText']
  ),
  textColorAccentSecondary: computed(
    ([successText]) => successText,
    ['colors.successText']
  ),
  textColorNeutral: computed(
    ([textNeutral]) => textNeutral,
    ['colors.textNeutral']
  ),
  textColorSuccess: computed(
    ([successText]) => successText,
    ['colors.successText']
  ),
  textColorWarning: computed(
    ([warningText]) => warningText,
    ['colors.warningText']
  ),
  textColorRisk: computed(([textRisk]) => textRisk, ['colors.textRisk']),
  textColorDanger: computed(
    ([dangerText]) => dangerText,
    ['colors.dangerText']
  ),
  textColorText: computed(([text]) => text, ['colors.text']),
  textColorDisabled: computed(
    ([disabledText]) => disabledText,
    ['colors.disabledText']
  ),

  textColorFilledPrimary: computed(
    ([primary, ghost, ink]) => (isDark(primary) ? ghost : ink),
    ['colors.primary', 'colors.ghost', 'colors.ink']
  ),
  textColorFilledAccent: computed(
    ([accent, ghost, ink]) => (isDark(accent) ? ghost : ink),
    ['colors.accent', 'colors.ghost', 'colors.ink']
  ),
  textColorFilledAccentSecondary: computed(
    ([success, ghost, ink]) => {
      const background = tint(success, 0.3);

      return isDark(background) ? ghost : ink;
    },
    ['colors.success', 'colors.ghost', 'colors.ink']
  ),
  textColorFilledNeutral: computed(
    ([ghost, ink]) => {
      const background = tint(severityColors.neutral, 0.3);

      return isDark(background) ? ghost : ink;
    },
    ['colors.ghost', 'colors.ink']
  ),
  textColorFilledSuccess: computed(
    ([success, ghost, ink]) => {
      const background = tint(success, 0.3);

      return isDark(background) ? ghost : ink;
    },
    ['colors.success', 'colors.ghost', 'colors.ink']
  ),
  textColorFilledWarning: computed(
    ([warning, ghost, ink]) => (isDark(warning) ? ghost : ink),
    ['colors.warning', 'colors.ghost', 'colors.ink']
  ),
  textColorFilledRisk: computed(
    ([ghost, ink]) => {
      const background = tint(severityColors.risk, 0.3);

      return isDark(background) ? ghost : ink;
    },
    ['colors.ghost', 'colors.ink']
  ),
  textColorFilledDanger: computed(
    ([danger, ghost, ink]) => (isDark(danger) ? ghost : ink),
    ['colors.danger', 'colors.ghost', 'colors.ink']
  ),
  textColorFilledText: computed(
    ([darkShade, ghost, ink]) => (isDark(darkShade) ? ghost : ink),
    ['colors.darkShade', 'colors.ghost', 'colors.ink']
  ),
  textColorFilledDisabled: computed(
    ([disabledText]) => disabledText,
    ['colors.disabledText']
  ),
};

const _dark_buttons = {
  ..._buttons,
  backgroundFilledDisabled: computed(
    ([lightShade]) => transparentize(lightShade, 0.15),
    ['colors.lightShade']
  ),

  backgroundEmptyTextHover: computed(
    ([lightShade]) => transparentize(lightShade, 0.4),
    ['colors.lightShade']
  ),

  textColorFilledAccent: computed(
    ([accent, ghost, ink]) => (isDark(accent) ? ghost : ink),
    ['colors.accent', 'colors.ghost', 'colors.ink']
  ),
  textColorFilledSuccess: computed(
    ([success, ghost, ink]) => (isDark(success) ? ghost : ink),
    ['colors.success', 'colors.ghost', 'colors.ink']
  ),
  textColorFilledText: computed(
    ([text, ghost, ink]) => (isDark(text) ? ghost : ink),
    ['colors.text', 'colors.ghost', 'colors.ink']
  ),
};

export const buttons: _EuiThemeButton = {
  LIGHT: _buttons,
  DARK: _dark_buttons,
};
