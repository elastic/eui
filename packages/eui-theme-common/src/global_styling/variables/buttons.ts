/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  ColorModeSwitch,
  StrictColorModeSwitch,
} from '../../services/theme/types';

export type _EuiThemeButtonColors = {
  backgroundPrimary: ColorModeSwitch;
  backgroundAccent: ColorModeSwitch;
  backgroundAccentSecondary: ColorModeSwitch;
  backgroundNeutral: ColorModeSwitch;
  backgroundSuccess: ColorModeSwitch;
  backgroundWarning: ColorModeSwitch;
  backgroundRisk: ColorModeSwitch;
  backgroundDanger: ColorModeSwitch;
  backgroundText: ColorModeSwitch;
  backgroundDisabled: ColorModeSwitch;

  backgroundFilledPrimary: ColorModeSwitch;
  backgroundFilledAccent: ColorModeSwitch;
  backgroundFilledAccentSecondary: ColorModeSwitch;
  backgroundFilledNeutral: ColorModeSwitch;
  backgroundFilledSuccess: ColorModeSwitch;
  backgroundFilledWarning: ColorModeSwitch;
  backgroundFilledRisk: ColorModeSwitch;
  backgroundFilledDanger: ColorModeSwitch;
  backgroundFilledText: ColorModeSwitch;
  backgroundFilledDisabled: ColorModeSwitch;

  backgroundEmptyPrimaryHover: ColorModeSwitch;
  backgroundEmptyAccentHover: ColorModeSwitch;
  backgroundEmptyAccentSecondaryHover: ColorModeSwitch;
  backgroundEmptyNeutralHover: ColorModeSwitch;
  backgroundEmptySuccessHover: ColorModeSwitch;
  backgroundEmptyWarningHover: ColorModeSwitch;
  backgroundEmptyRiskHover: ColorModeSwitch;
  backgroundEmptyDangerHover: ColorModeSwitch;
  backgroundEmptyTextHover: ColorModeSwitch;

  textColorPrimary: ColorModeSwitch;
  textColorAccent: ColorModeSwitch;
  textColorAccentSecondary: ColorModeSwitch;
  textColorNeutral: ColorModeSwitch;
  textColorSuccess: ColorModeSwitch;
  textColorWarning: ColorModeSwitch;
  textColorRisk: ColorModeSwitch;
  textColorDanger: ColorModeSwitch;
  textColorText: ColorModeSwitch;
  textColorDisabled: ColorModeSwitch;

  textColorFilledPrimary: ColorModeSwitch;
  textColorFilledAccent: ColorModeSwitch;
  textColorFilledAccentSecondary: ColorModeSwitch;
  textColorFilledNeutral: ColorModeSwitch;
  textColorFilledSuccess: ColorModeSwitch;
  textColorFilledWarning: ColorModeSwitch;
  textColorFilledRisk: ColorModeSwitch;
  textColorFilledDanger: ColorModeSwitch;
  textColorFilledText: ColorModeSwitch;
  textColorFilledDisabled: ColorModeSwitch;
};

export type _EuiThemeButton = StrictColorModeSwitch<_EuiThemeButtonColors> & {};
