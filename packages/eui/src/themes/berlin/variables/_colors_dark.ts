/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { shade } from '../../../services/color';
import { computed } from '../../../services/theme/utils';
import {
  makeHighContrastColor,
  makeDisabledContrastColor,
} from '../../../services/color/contrast';
import {
  _EuiThemeBrandColors,
  _EuiThemeBrandTextColors,
  _EuiThemeShadeColors,
  _EuiThemeSpecialColors,
  _EuiThemeTextColors,
  _EuiThemeColorsMode,
} from '../../../global_styling/variables/colors';

/*
 * DARK THEME
 */

export const dark_brand_colors: _EuiThemeBrandColors = {
  primary: '#36A2EF',
  accent: '#F68FBE',
  success: '#7DDED8',
  warning: '#F3D371',
  danger: '#F86B63',
};

export const dark_brand_text_colors: _EuiThemeBrandTextColors = {
  primaryText: computed(makeHighContrastColor('colors.primary')),
  accentText: computed(makeHighContrastColor('colors.accent')),
  successText: computed(makeHighContrastColor('colors.success')),
  warningText: computed(makeHighContrastColor('colors.warning')),
  dangerText: computed(makeHighContrastColor('colors.danger')),
};

export const dark_shades: _EuiThemeShadeColors = {
  emptyShade: '#1D1E24',
  lightestShade: '#25262E',
  lightShade: '#343741',
  mediumShade: '#535966',
  darkShade: '#98A2B3',
  darkestShade: '#D4DAE5',
  fullShade: '#FFF',
};

export const dark_special_colors: _EuiThemeSpecialColors = {
  body: computed(
    ([lightestShade]) => shade(lightestShade, 0.45),
    ['colors.lightestShade']
  ),
  highlight: '#2E2D25',
  disabled: '#515761',
  disabledText: computed(makeDisabledContrastColor('colors.disabled')),
  shadow: computed(({ colors }) => colors.ink),
};

export const dark_text_colors: _EuiThemeTextColors = {
  text: '#DFE5EF',
  title: computed(([text]) => text, ['colors.text']),
  subduedText: computed(makeHighContrastColor('colors.mediumShade')),
  link: computed(([primaryText]) => primaryText, ['colors.primaryText']),
};

export const dark_colors: _EuiThemeColorsMode = {
  ...dark_brand_colors,
  ...dark_shades,
  ...dark_special_colors,
  // Need to come after special colors so they can react to `body`
  ...dark_brand_text_colors,
  ...dark_text_colors,
};
