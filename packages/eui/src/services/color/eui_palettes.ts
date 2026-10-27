/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// The implementation lives in @elastic/eui-theme-common so that color palettes
// are usable without importing @elastic/eui; re-exported here for backwards
// compatibility.
export {
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteComplementary,
  euiPaletteRed,
  euiPaletteGreen,
  euiPaletteSkyBlue,
  euiPaletteYellow,
  euiPaletteOrange,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteGray,
  type EuiPalette,
  type EuiPaletteColorBlindProps,
  type EuiPaletteRotationProps,
  type EuiPaletteCommonProps,
} from '@elastic/eui-theme-common';
