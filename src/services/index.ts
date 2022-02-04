/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Export all keys under a `keys` named variable
import * as keys from './keys';
export { keys };

export {
  accessibleClickKeys,
  cascadingMenuKeys,
  comboBoxKeys,
  htmlIdGenerator,
  useGeneratedHtmlId,
} from './accessibility';

export type { HorizontalAlignment } from './alignment';
export { LEFT_ALIGNMENT, RIGHT_ALIGNMENT, CENTER_ALIGNMENT } from './alignment';

export type { EuiBreakpointSize } from './breakpoint';
export {
  BREAKPOINTS,
  BREAKPOINT_KEYS,
  getBreakpoint,
  isWithinBreakpoints,
  isWithinMaxBreakpoint,
  isWithinMinBreakpoint,
} from './breakpoint';

export type { HSV } from './color';
export {
  isColorDark,
  isValidHex,
  calculateContrast,
  calculateLuminance,
  hexToHsv,
  hexToRgb,
  hsvToHex,
  hsvToRgb,
  rgbToHex,
  rgbToHsv,
  VISUALIZATION_COLORS,
  DEFAULT_VISUALIZATION_COLOR,
  colorPalette,
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
  getSteppedGradient,
  transparentize,
  tint,
  shade,
  saturate,
  desaturate,
  lightness,
  makeHighContrastColor,
  makeDisabledContrastColor,
} from './color';

export type { EuiSetColorMethod } from './color_picker';
export { useColorPickerState, useColorStopsState } from './color_picker';

export * from './console';

export { copyToClipboard } from './copy_to_clipboard';

export {
  formatAuto,
  formatBoolean,
  formatDate,
  formatNumber,
  formatText,
  dateFormatAliases,
} from './format';

export { isEvenlyDivisibleBy, isWithinRange } from './number';

export { Pager } from './paging';

export { Random } from './random';

export { getSecureRelForTarget } from './security';

export { toSentenceCase, toInitials, slugify } from './string';

export type { PropertySort, Direction } from './sort';
export {
  PropertySortType,
  SortDirectionType,
  SortDirection,
  SortableProperties,
  Comparators,
} from './sort';

export { calculatePopoverPosition, findPopoverPosition } from './popover';

export {
  getDurationAndPerformOnFrame,
  getTransitionTimings,
  getWaitDuration,
  performOnFrame,
} from './transition';

export { EuiWindowEvent } from './window_event';

export * from './hooks';

export { throttle } from './throttle';

export * from './theme';
