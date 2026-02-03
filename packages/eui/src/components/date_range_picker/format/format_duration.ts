/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// TODO "exactness" could be adjusted and improved
// e.g. currently 10 days == ~1w and 11 days == ~2w

const UNIT_ABBREV: Record<string, string> = {
  years: 'y',
  months: 'mos',
  weeks: 'w',
  days: 'd',
  hours: 'h',
  minutes: 'min',
  seconds: 's',
  milliseconds: 'ms',
  // nanoseconds: 'ns',
};

const MS_PER = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
  month: 1000 * 60 * 60 * 24 * 30,
  year: 1000 * 60 * 60 * 24 * 365,
} as const;

export function durationToDisplayText(startDate: Date, endDate: Date): string {
  const diff = Math.abs(endDate.getTime() - startDate.getTime());

  const format = (value: number, unit: number, abbrev: string): string => {
    const rounded = Math.round(value / unit);
    const isExact = value % unit === 0;
    return `${isExact ? '' : '~'}${rounded}${abbrev}`;
  };

  if (diff >= MS_PER.year) {
    return format(diff, MS_PER.year, UNIT_ABBREV.years);
  }
  if (diff >= MS_PER.month) {
    return format(diff, MS_PER.month, UNIT_ABBREV.months);
  }
  if (diff >= MS_PER.week) {
    return format(diff, MS_PER.week, UNIT_ABBREV.weeks);
  }
  if (diff >= MS_PER.day) {
    return format(diff, MS_PER.day, UNIT_ABBREV.days);
  }
  if (diff >= MS_PER.hour) {
    return format(diff, MS_PER.hour, UNIT_ABBREV.hours);
  }
  if (diff >= MS_PER.minute) {
    return format(diff, MS_PER.minute, UNIT_ABBREV.minutes);
  }
  if (diff >= MS_PER.second) {
    return format(diff, MS_PER.second, UNIT_ABBREV.seconds);
  }

  return `${Math.round(diff)}${UNIT_ABBREV.milliseconds}`;
}
