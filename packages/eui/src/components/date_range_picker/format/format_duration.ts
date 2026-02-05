/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// TODO a "spec" for approximation is needed

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

export const MS_PER = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
  month: 1000 * 60 * 60 * 24 * 30.44, // average days per month
  year: 1000 * 60 * 60 * 24 * 365,
} as const;

// for determining if a duration is exact or approximate
const TOLERANCE: Record<number, number> = {
  [MS_PER.year]: MS_PER.month,
  [MS_PER.month]: MS_PER.day,
  [MS_PER.week]: MS_PER.day,
  [MS_PER.day]: MS_PER.hour,
  [MS_PER.hour]: MS_PER.minute,
  [MS_PER.minute]: MS_PER.second,
  [MS_PER.second]: 1, // 1ms
};

export function durationToDisplayShortText(
  startDate: Date,
  endDate: Date
): string {
  const diff = Math.abs(endDate.getTime() - startDate.getTime());

  const format = (value: number, unitMs: number, abbrev: string): string => {
    const unitCount = Math.round(value / unitMs);
    const absoluteError = Math.abs(value - unitCount * unitMs);
    const tolerance = TOLERANCE[unitMs] ?? MS_PER.second;
    const isExact = absoluteError < tolerance;
    return `${isExact ? '' : '~'}${unitCount}${abbrev}`;
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
