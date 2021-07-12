/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export { EuiColorPicker, EuiColorPickerProps } from './color_picker';
export {
  EuiColorPickerSwatch,
  EuiColorPickerSwatchProps,
} from './color_picker_swatch';
export { EuiHue, EuiHueProps } from './hue';
export { EuiSaturation, EuiSaturationProps } from './saturation';
export { EuiColorStops } from './color_stops';
// TODO: Exporting `EuiColorStopsProps` from `'./color_stops'`
// results in a duplicate d.ts entry that causes build warnings
// and potential downstream TS project failures.
export { EuiColorStopsProps } from './color_stops/color_stops';
export {
  EuiColorPalettePicker,
  EuiColorPalettePickerProps,
  EuiColorPalettePickerPaletteProps,
} from './color_palette_picker';

export {
  EuiColorPaletteDisplay,
  EuiColorPaletteDisplayProps,
} from './color_palette_display';
