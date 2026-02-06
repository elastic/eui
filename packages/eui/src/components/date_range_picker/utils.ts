/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  DATE_TYPE_ABSOLUTE,
  DATE_TYPE_RELATIVE,
  DATE_TYPE_NOW,
} from './constants';

export {
  DATE_TYPE_ABSOLUTE,
  DATE_TYPE_RELATIVE,
  DATE_TYPE_NOW,
} from './constants';

export type DateType =
  | typeof DATE_TYPE_ABSOLUTE
  | typeof DATE_TYPE_RELATIVE
  | typeof DATE_TYPE_NOW;

/** Date math string or ISO 8601 yyyy-MM-ddTHH:mm:ss.SSSZ e.g. 2025-12-23T08:15:13Z */
export type DateString = string;

export interface EuiTimeRange {
  end: DateString;
  start: DateString;
}

export interface EuiTimeRangePreset extends EuiTimeRange {
  label: string;
}

export interface TimeRangeTransformOptions {
  presets?: EuiTimeRangePreset[];
  delimiter?: string;
  dateFormat?: string;
}

export interface TimeRange {
  value: string;
  start: DateString;
  end: DateString;
  startDate: Date | null;
  endDate: Date | null;
  type: [DateType | null, DateType | null];
  isNaturalLanguage: boolean;
  isValid: boolean; // TODO change to isInvalid to match public-facing API
}

/**
 * Check a time range is valid
 */
export function isValidTimeRange(range: TimeRange): boolean {
  const { startDate, endDate, type } = range;
  // both dates are valid
  if (startDate === null || endDate === null) {
    return false;
  }
  // [NOW, NOW] is not a valid range (zero duration)
  if (type[0] === DATE_TYPE_NOW && type[1] === DATE_TYPE_NOW) {
    return false;
  }
  // start must be before or equal to end
  return startDate.getTime() <= endDate.getTime();
}
