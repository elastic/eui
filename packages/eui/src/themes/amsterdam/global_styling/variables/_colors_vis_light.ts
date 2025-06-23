/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeVisColors } from '@elastic/eui-theme-common';

import { shade, tint } from '../../../../services/color/manipulation';

/**
 * NOTE: These were quick conversions of their Sass counterparts.
 *       They have yet to be used/tested.
 * TODO: Make the graphic version available from `euiPaletteColorBlind()`
 */

// Maps allow for easier JSON usage
// Use map_merge(euiColorVisColors, $yourMap) to change individual colors after importing ths file
// The `behindText` variant is a direct copy of the hex output by the JS euiPaletteColorBlindBehindText() function
const euiPaletteColorBlind = {
  euiColorVis0: {
    graphic: '#54B399',
    behindText: '#6DCCB1',
  },
  euiColorVis1: {
    graphic: '#6092C0',
    behindText: '#79AAD9',
  },
  euiColorVis2: {
    graphic: '#D36086',
    behindText: '#EE789D',
  },
  euiColorVis3: {
    graphic: '#9170B8',
    behindText: '#A987D1',
  },
  euiColorVis4: {
    graphic: '#CA8EAE',
    behindText: '#E4A6C7',
  },
  euiColorVis5: {
    graphic: '#D6BF57',
    behindText: '#F1D86F',
  },
  euiColorVis6: {
    graphic: '#B9A888',
    behindText: '#D2C0A0',
  },
  euiColorVis7: {
    graphic: '#DA8B45',
    behindText: '#F5A35C',
  },
  euiColorVis8: {
    graphic: '#AA6556',
    behindText: '#C47C6C',
  },
  euiColorVis9: {
    graphic: '#E7664C',
    behindText: '#FF7E62',
  },
};

export const colorVisLight: _EuiThemeVisColors = {
  euiColorVis0: euiPaletteColorBlind.euiColorVis0.graphic,
  euiColorVis1: euiPaletteColorBlind.euiColorVis1.graphic,
  euiColorVis2: euiPaletteColorBlind.euiColorVis2.graphic,
  euiColorVis3: euiPaletteColorBlind.euiColorVis3.graphic,
  euiColorVis4: euiPaletteColorBlind.euiColorVis4.graphic,
  euiColorVis5: euiPaletteColorBlind.euiColorVis5.graphic,
  euiColorVis6: euiPaletteColorBlind.euiColorVis6.graphic,
  euiColorVis7: euiPaletteColorBlind.euiColorVis7.graphic,
  euiColorVis8: euiPaletteColorBlind.euiColorVis8.graphic,
  euiColorVis9: euiPaletteColorBlind.euiColorVis9.graphic,

  /**
   * behindText variables are temp tokens; used only during theme migration.
   * TODO: remove once Amsterdam is fully migrated
   */
  euiColorVisBehindText0: euiPaletteColorBlind.euiColorVis0.behindText,
  euiColorVisBehindText1: euiPaletteColorBlind.euiColorVis1.behindText,
  euiColorVisBehindText2: euiPaletteColorBlind.euiColorVis2.behindText,
  euiColorVisBehindText3: euiPaletteColorBlind.euiColorVis3.behindText,
  euiColorVisBehindText4: euiPaletteColorBlind.euiColorVis4.behindText,
  euiColorVisBehindText5: euiPaletteColorBlind.euiColorVis5.behindText,
  euiColorVisBehindText6: euiPaletteColorBlind.euiColorVis6.behindText,
  euiColorVisBehindText7: euiPaletteColorBlind.euiColorVis7.behindText,
  euiColorVisBehindText8: euiPaletteColorBlind.euiColorVis8.behindText,
  euiColorVisBehindText9: euiPaletteColorBlind.euiColorVis9.behindText,

  euiColorVisText0: '#017D73',
  euiColorVisText1: '#006BB4',
  euiColorVisText2: '#DD0A73',
  euiColorVisText3: shade(
    euiPaletteColorBlind.euiColorVis3.graphic,
    0.2
  ).toUpperCase(), // #745A93
  euiColorVisText4: shade(
    euiPaletteColorBlind.euiColorVis4.graphic,
    0.2
  ).toUpperCase(), // #A2728B
  euiColorVisText5: shade(
    euiPaletteColorBlind.euiColorVis5.graphic,
    0.2
  ).toUpperCase(), // #AB9946
  euiColorVisText6: shade(
    euiPaletteColorBlind.euiColorVis6.graphic,
    0.2
  ).toUpperCase(), // #94866D
  euiColorVisText7: '#F5A700',
  euiColorVisText8: shade(
    euiPaletteColorBlind.euiColorVis8.graphic,
    0.2
  ).toUpperCase(), // #885145
  euiColorVisText9: '#BD271E',

  euiColorVisNeutral0: tint(euiPaletteColorBlind.euiColorVis1.graphic, 0.3),
  euiColorVisNeutral1: tint(euiPaletteColorBlind.euiColorVis1.graphic, 0.56),
  euiColorVisSuccess0: '#209280',
  euiColorVisSuccess1: euiPaletteColorBlind.euiColorVis0.graphic,
  euiColorVisWarning0: shade(euiPaletteColorBlind.euiColorVis5.graphic, 0.15),
  euiColorVisWarning1: euiPaletteColorBlind.euiColorVis5.graphic,
  euiColorVisRisk0: euiPaletteColorBlind.euiColorVis7.graphic,
  euiColorVisRisk1: tint(euiPaletteColorBlind.euiColorVis7.graphic, 0.5),
  euiColorVisDanger0: '#CC5642',
  euiColorVisDanger1: euiPaletteColorBlind.euiColorVis9.graphic,

  euiColorVisBase0: '#FFFFFF',

  euiColorVisGrey0: '#d3dae6',
  euiColorVisGrey1: '#98a2b3',
  euiColorVisGrey2: '#69707d',
  euiColorVisGrey3: '#343741',

  euiColorVisWarm0: '#FBFBDC',
  euiColorVisWarm1: euiPaletteColorBlind.euiColorVis7.graphic,
  euiColorVisWarm2: euiPaletteColorBlind.euiColorVis9.graphic,

  euiColorVisCool0: '#EBEFF5',
  euiColorVisCool1: euiPaletteColorBlind.euiColorVis1.graphic,
  euiColorVisCool2: '#6092C0',

  euiColorVisComplementary0: euiPaletteColorBlind.euiColorVis1.graphic,
  euiColorVisComplementary1: euiPaletteColorBlind.euiColorVis7.graphic,
};
