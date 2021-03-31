/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

export { isColorDark } from './is_color_dark';
export { isValidHex } from './is_valid_hex';
export { hexToHsv } from './hex_to_hsv';
export { hexToRgb } from './hex_to_rgb';
export { hsvToHex } from './hsv_to_hex';
export { hsvToRgb } from './hsv_to_rgb';
export { rgbToHex } from './rgb_to_hex';
export { rgbToHsv } from './rgb_to_hsv';
export {
  calculateContrast,
  calculateLuminance,
} from './luminance_and_contrast';
export {
  VISUALIZATION_COLORS,
  DEFAULT_VISUALIZATION_COLOR,
} from './visualization_colors';
export { colorPalette } from './color_palette';
export {
  euiPaletteForLightBackground,
  euiPaletteForDarkBackground,
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteComplimentary,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteGray,
} from './eui_palettes';
export { rgbDef, HSV, RGB } from './color_types';
export { getSteppedGradient } from './stepped_gradient';
