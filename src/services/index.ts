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

export {
  HorizontalAlignment,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from './alignment';

export {
  BREAKPOINTS,
  BREAKPOINT_KEYS,
  getBreakpoint,
  isWithinBreakpoints,
  isWithinMaxBreakpoint,
  isWithinMinBreakpoint,
  EuiBreakpointSize,
} from './breakpoint';

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
  HSV,
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

export {
  useColorPickerState,
  useColorStopsState,
  EuiSetColorMethod,
} from './color_picker';

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

export {
  PropertySortType,
  PropertySort,
  SortDirectionType,
  SortDirection,
  Direction,
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

export {
  useCombinedRefs,
  useDependentState,
  useIsWithinBreakpoints,
  useMouseMove,
  isMouseEvent,
} from './hooks';

export { throttle } from './throttle';

export {
  EuiSystemContext,
  EuiThemeContext,
  EuiModificationsContext,
  EuiColorModeContext,
  useEuiTheme,
  withEuiTheme,
  WithEuiThemeProps,
  EuiThemeProvider,
  buildTheme,
  computed,
  isInverseColorMode,
  getColorMode,
  getComputed,
  getOn,
  mergeDeep,
  setOn,
  Computed,
  ComputedThemeShape,
  EuiThemeColorMode,
  EuiThemeComputed,
  EuiThemeModifications,
  EuiThemeShape,
  EuiThemeSystem,
} from './theme';
