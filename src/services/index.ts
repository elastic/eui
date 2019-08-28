// Export all keyCodes under a `keyCodes` named variable
import * as keyCodes from './key_codes';
export { keyCodes };

export {
  accessibleClickKeys,
  cascadingMenuKeyCodes,
  comboBoxKeyCodes,
  htmlIdGenerator,
} from './accessibility';

export {
  HorizontalAlignment,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from './alignment';

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
  palettes,
  HSV,
} from './color';

export { copyToClipboard } from './copy_to_clipboard';

export {
  formatAuto,
  formatBoolean,
  formatDate,
  formatNumber,
  formatText,
} from './format';

export { isEvenlyDivisibleBy, isWithinRange } from './number';

export { Pager } from './paging';

export { Random } from './random';

export { getSecureRelForTarget } from './security';

export { toInitials } from './string';

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
