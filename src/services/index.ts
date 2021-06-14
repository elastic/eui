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

// Export all keys under a `keys` named variable
import * as keys from './keys';
export { keys };

export {
  accessibleClickKeys,
  cascadingMenuKeys,
  comboBoxKeys,
  htmlIdGenerator,
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
} from './color';

export { useColorPickerState, useColorStopsState } from './color_picker';

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
