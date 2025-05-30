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

  backgroundPrimaryHover: computed(
    ([primary]) => transparentize(primary, 0.1),
    ['colors.primary']
  ),
  backgroundAccentHover: computed(
    ([accent]) => transparentize(accent, 0.1),
    ['colors.accent']
  ),
  backgroundAccentSecondaryHover: computed(
    ([success]) => transparentize(success, 0.1),
    ['colors.success']
  ),
  backgroundNeutralHover: transparentize(severityColors.neutral, 0.1),
  backgroundSuccessHover: computed(
    ([success]) => transparentize(success, 0.1),
    ['colors.success']
  ),
  backgroundWarningHover: computed(
    ([warning]) => transparentize(warning, 0.1),
    ['colors.warning']
  ),
  backgroundRiskHover: transparentize(severityColors.risk, 0.1),
  backgroundDangerHover: computed(
    ([danger]) => transparentize(danger, 0.1),
    ['colors.danger']
  ),
  backgroundTextHover: computed(
    ([lightShade]) => transparentize(lightShade, 0.2),
    ['colors.lightShade']
  ),

  backgroundPrimaryActive: computed(
    ([primary]) => transparentize(primary, 0.1),
    ['colors.primary']
  ),
  backgroundAccentActive: computed(
    ([accent]) => transparentize(accent, 0.1),
    ['colors.accent']
  ),
  backgroundAccentSecondaryActive: computed(
    ([success]) => transparentize(success, 0.1),
    ['colors.success']
  ),
  backgroundNeutralActive: transparentize(severityColors.neutral, 0.1),
  backgroundSuccessActive: computed(
    ([success]) => transparentize(success, 0.1),
    ['colors.success']
  ),
  backgroundWarningActive: computed(
    ([warning]) => transparentize(warning, 0.1),
    ['colors.warning']
  ),
  backgroundRiskActive: transparentize(severityColors.risk, 0.1),
  backgroundDangerActive: computed(
    ([danger]) => transparentize(danger, 0.1),
    ['colors.danger']
  ),
  backgroundTextActive: computed(
    ([lightShade]) => transparentize(lightShade, 0.2),
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

  backgroundFilledPrimaryHover: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledPrimary']
  ),
  backgroundFilledAccentHover: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledAccent']
  ),
  backgroundFilledAccentSecondaryHover: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledAccentSecondary']
  ),
  backgroundFilledNeutralHover: computed(
    ([backgroundFilledNeutral]) => backgroundFilledNeutral,
    ['components.buttons.backgroundFilledNeutral']
  ),
  backgroundFilledSuccessHover: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledSuccess']
  ),
  backgroundFilledWarningHover: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledWarning']
  ),
  backgroundFilledRiskHover: computed(
    ([backgroundFilledRisk]) => backgroundFilledRisk,
    ['components.buttons.backgroundFilledRisk']
  ),
  backgroundFilledDangerHover: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledDanger']
  ),
  backgroundFilledTextHover: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledText']
  ),

  backgroundFilledPrimaryActive: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledPrimary']
  ),
  backgroundFilledAccentActive: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledAccent']
  ),
  backgroundFilledAccentSecondaryActive: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledAccentSecondary']
  ),
  backgroundFilledNeutralActive: computed(
    ([backgroundFilledNeutral]) => backgroundFilledNeutral,
    ['components.buttons.backgroundFilledNeutral']
  ),
  backgroundFilledSuccessActive: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledSuccess']
  ),
  backgroundFilledWarningActive: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledWarning']
  ),
  backgroundFilledRiskActive: computed(
    ([backgroundFilledRisk]) => backgroundFilledRisk,
    ['components.buttons.backgroundFilledRisk']
  ),
  backgroundFilledDangerActive: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledDanger']
  ),
  backgroundFilledTextActive: computed(
    ([backgroundFilledPrimary]) => backgroundFilledPrimary,
    ['components.buttons.backgroundFilledText']
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

  backgroundEmptyPrimaryActive: computed(
    ([primary]) => transparentize(primary, 0.1),
    ['colors.primary']
  ),
  backgroundEmptyAccentActive: computed(
    ([accent]) => transparentize(accent, 0.1),
    ['colors.accent']
  ),
  backgroundEmptyAccentSecondaryActive: computed(
    ([success]) => transparentize(success, 0.1),
    ['colors.success']
  ),
  backgroundEmptyNeutralActive: transparentize(severityColors.neutral, 0.1),
  backgroundEmptySuccessActive: computed(
    ([success]) => transparentize(success, 0.1),
    ['colors.success']
  ),
  backgroundEmptyWarningActive: computed(
    ([warning]) => transparentize(warning, 0.1),
    ['colors.warning']
  ),
  backgroundEmptyRiskActive: transparentize(severityColors.risk, 0.1),
  backgroundEmptyDangerActive: computed(
    ([danger]) => transparentize(danger, 0.1),
    ['colors.danger']
  ),
  backgroundEmptyTextActive: computed(
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
