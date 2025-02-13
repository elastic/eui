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
  backgroundSuccess: ColorModeSwitch;
  backgroundWarning: ColorModeSwitch;
  backgroundDanger: ColorModeSwitch;
  backgroundText: ColorModeSwitch;
  backgroundDisabled: ColorModeSwitch;

  backgroundFilledPrimary: ColorModeSwitch;
  backgroundFilledAccent: ColorModeSwitch;
  backgroundFilledAccentSecondary: ColorModeSwitch;
  backgroundFilledSuccess: ColorModeSwitch;
  backgroundFilledWarning: ColorModeSwitch;
  backgroundFilledDanger: ColorModeSwitch;
  backgroundFilledText: ColorModeSwitch;
  backgroundFilledDisabled: ColorModeSwitch;

  backgroundEmptyPrimaryHover: ColorModeSwitch;
  backgroundEmptyAccentHover: ColorModeSwitch;
  backgroundEmptyAccentSecondaryHover: ColorModeSwitch;
  backgroundEmptySuccessHover: ColorModeSwitch;
  backgroundEmptyWarningHover: ColorModeSwitch;
  backgroundEmptyDangerHover: ColorModeSwitch;
  backgroundEmptyTextHover: ColorModeSwitch;

  textColorPrimary: ColorModeSwitch;
  textColorAccent: ColorModeSwitch;
  textColorAccentSecondary: ColorModeSwitch;
  textColorSuccess: ColorModeSwitch;
  textColorWarning: ColorModeSwitch;
  textColorDanger: ColorModeSwitch;
  textColorText: ColorModeSwitch;
  textColorDisabled: ColorModeSwitch;

  textColorFilledPrimary: ColorModeSwitch;
  textColorFilledAccent: ColorModeSwitch;
  textColorFilledAccentSecondary: ColorModeSwitch;
  textColorFilledSuccess: ColorModeSwitch;
  textColorFilledWarning: ColorModeSwitch;
  textColorFilledDanger: ColorModeSwitch;
  textColorFilledText: ColorModeSwitch;
  textColorFilledDisabled: ColorModeSwitch;
};

export type _EuiThemeButton = StrictColorModeSwitch<_EuiThemeButtonColors> & {};
