/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeVisColors } from '@elastic/eui-theme-common';

import { tint } from '../../../../services/color/manipulation';
import { colorVisLight } from './_colors_vis_light';

export const colorVisDark: _EuiThemeVisColors = {
  ...colorVisLight,

  euiColorVisText0: '#7DE2D1',
  euiColorVisText1: '#1BA9F5',
  euiColorVisText2: '#F990C0',
  euiColorVisText3: tint(
    colorVisLight.euiColorVisBehindText3,
    0.2
  ).toUpperCase(), // '#BA9FDA',
  euiColorVisText4: tint(
    colorVisLight.euiColorVisBehindText4,
    0.2
  ).toUpperCase(), // '#E9B8D2',
  euiColorVisText5: tint(
    colorVisLight.euiColorVisBehindText5,
    0.2
  ).toUpperCase(), // '#F4E08C',
  euiColorVisText6: tint(
    colorVisLight.euiColorVisBehindText6,
    0.2
  ).toUpperCase(), // '#DBCDB3',
  euiColorVisText7: '#FFCE7A',
  euiColorVisText8: tint(
    colorVisLight.euiColorVisBehindText8,
    0.2
  ).toUpperCase(), // '#D09689',
  euiColorVisText9: '#F66',
};
