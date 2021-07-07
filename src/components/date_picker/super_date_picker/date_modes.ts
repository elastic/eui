/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dateMath from '@elastic/datemath';
import {
  parseRelativeParts,
  toRelativeStringFromParts,
} from './relative_utils';
import {
  AbsoluteDateMode,
  RelativeDateMode,
  NowDateMode,
  ShortDate,
} from '../types';

export const DATE_MODES: {
  ABSOLUTE: AbsoluteDateMode;
  RELATIVE: RelativeDateMode;
  NOW: NowDateMode;
} = {
  ABSOLUTE: 'absolute',
  RELATIVE: 'relative',
  NOW: 'now',
};

export function getDateMode(value: ShortDate) {
  if (value === 'now') {
    return DATE_MODES.NOW;
  }

  if (value.includes('now')) {
    return DATE_MODES.RELATIVE;
  }

  return DATE_MODES.ABSOLUTE;
}

export function toAbsoluteString(value: string, roundUp: boolean = false) {
  const valueAsMoment = dateMath.parse(value, { roundUp });
  if (!valueAsMoment) {
    return value;
  }
  return valueAsMoment.toISOString();
}

export function toRelativeString(value: string) {
  return toRelativeStringFromParts(parseRelativeParts(value));
}
