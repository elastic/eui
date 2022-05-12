/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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
  },
  euiColorVis1: {
    graphic: '#6092C0',
  },
  euiColorVis2: {
    graphic: '#D36086',
  },
  euiColorVis3: {
    graphic: '#9170B8',
  },
  euiColorVis4: {
    graphic: '#CA8EAE',
  },
  euiColorVis5: {
    graphic: '#D6BF57',
  },
  euiColorVis6: {
    graphic: '#B9A888',
  },
  euiColorVis7: {
    graphic: '#DA8B45',
  },
  euiColorVis8: {
    graphic: '#AA6556',
  },
  euiColorVis9: {
    graphic: '#E7664C',
  },
};

export const colorVis = {
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
};
