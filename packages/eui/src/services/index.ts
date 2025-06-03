/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Export all keys under a `keys` named variable
import * as keys from './keys';
export { htmlIdGenerator, useGeneratedHtmlId } from './accessibility';
export { CENTER_ALIGNMENT, LEFT_ALIGNMENT, RIGHT_ALIGNMENT } from './alignment';
export type { HorizontalAlignment } from './alignment';
export {
  CurrentEuiBreakpointContext,
  CurrentEuiBreakpointProvider,
  useCurrentEuiBreakpoint,
  useIsWithinBreakpoints,
  useIsWithinMaxBreakpoint,
  useIsWithinMinBreakpoint,
} from './breakpoint';
export type { EuiBreakpointSize } from './breakpoint';
export { CanvasTextUtils, type CanvasTextParams } from './canvas';
export {
  brighten,
  calculateContrast,
  calculateLuminance,
  colorPalette,
  darken,
  DEFAULT_VISUALIZATION_COLOR,
  desaturate,
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
  euiPaletteComplementary,
  euiPaletteCool,
  euiPaletteForDarkBackground,
  euiPaletteForLightBackground,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteGray,
  euiPaletteRed,
  euiPaletteGreen,
  euiPaletteSkyBlue,
  euiPaletteYellow,
  euiPaletteOrange,
  euiPaletteWarm,
  getSteppedGradient,
  hexToHsv,
  hexToRgb,
  hsvToHex,
  hsvToRgb,
  isColorDark,
  isValidHex,
  lightness,
  makeDisabledContrastColor,
  makeHighContrastColor,
  rgbToHex,
  rgbToHsv,
  saturate,
  shade,
  shadeOrTint,
  tint,
  tintOrShade,
  transparentize,
  VISUALIZATION_COLORS,
  EUI_VIS_COLOR_STORE,
  wcagContrastMin,
  type EuiPaletteColorBlindProps,
  type EuiPaletteRotationProps,
  type EuiPaletteCommonProps,
} from './color';
export type { HSV } from './color';
export * from './color/eui_palettes_hooks';
export { useColorPickerState, useColorStopsState } from './color_picker';
export type { EuiSetColorMethod } from './color_picker';
export * from './console';
export * from './copy';
export * from './emotion';
export * from './findElement';
export {
  dateFormatAliases,
  formatAuto,
  formatBoolean,
  formatDate,
  formatNumber,
  formatText,
} from './format';
export * from './hooks';
export { isEvenlyDivisibleBy, isWithinRange } from './number';
export { Pager } from './paging';
export { calculatePopoverPosition, findPopoverPosition } from './popover';
export { getSecureRelForTarget } from './security';
export {
  Comparators,
  PropertySortType,
  SortableProperties,
  SortDirection,
  SortDirectionType,
} from './sort';
export type { Direction, PropertySort } from './sort';
export { slugify, toInitials, toSentenceCase } from './string';
export * from './theme';
export { throttle } from './throttle';
export {
  getDurationAndPerformOnFrame,
  getTransitionTimings,
  getWaitDuration,
  performOnFrame,
} from './transition';
export { EuiWindowEvent } from './window_event';
export { keys };
