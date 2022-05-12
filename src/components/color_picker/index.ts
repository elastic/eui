/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type { EuiColorPickerProps } from './color_picker';
export { EuiColorPicker } from './color_picker';
export type { EuiColorPickerSwatchProps } from './color_picker_swatch';
export { EuiColorPickerSwatch } from './color_picker_swatch';
export type { EuiHueProps } from './hue';
export { EuiHue } from './hue';
export type { EuiSaturationProps } from './saturation';
export { EuiSaturation } from './saturation';
export { EuiColorStops } from './color_stops';
// TODO: Exporting `EuiColorStopsProps` from `'./color_stops'`
// results in a duplicate d.ts entry that causes build warnings
// and potential downstream TS project failures.
export type { EuiColorStopsProps } from './color_stops/color_stops';
export type {
  EuiColorPalettePickerProps,
  EuiColorPalettePickerPaletteProps,
} from './color_palette_picker';
export { EuiColorPalettePicker } from './color_palette_picker';

export type { EuiColorPaletteDisplayProps } from './color_palette_display';
export { EuiColorPaletteDisplay } from './color_palette_display';
