import dateMath from '@elastic/datemath';
import {
  parseRelativeParts,
  toRelativeStringFromParts,
} from './relative_utils';

export const DATE_MODES = {
  ABSOLUTE: 'absolute',
  RELATIVE: 'relative',
  NOW: 'now',
};

export function getDateMode(value) {
  if (value === 'now') {
    return DATE_MODES.NOW;
  }

  if (value.includes('now')) {
    return DATE_MODES.RELATIVE;
  }

  return DATE_MODES.absolute;
}

export function toAbsoluteString(value, roundUp) {
  const valueAsMoment = dateMath.parse(value, { roundUp });
  if (!valueAsMoment) {
    return value;
  }
  return valueAsMoment.toISOString();
}

export function toRelativeString(value) {
  return toRelativeStringFromParts(parseRelativeParts(value));
}
