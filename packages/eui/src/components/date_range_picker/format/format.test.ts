/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { textToTimeRange } from '../parse';
import { durationToDisplayText, MS_PER } from './format_duration';
import { timeRangeToDisplayText } from './format_time_range';

describe('durationToDisplayText', () => {
  it('formats basic durations', () => {
    const start = new Date(0);

    expect(durationToDisplayText(start, new Date(100))).toBe('100ms');
    expect(durationToDisplayText(start, new Date(5 * 1000))).toBe('5s');
    expect(durationToDisplayText(start, new Date(15 * MS_PER.minute))).toBe(
      '15min'
    );
    expect(durationToDisplayText(start, new Date(12 * MS_PER.hour))).toBe(
      '12h'
    );
    expect(durationToDisplayText(start, new Date(48 * MS_PER.hour))).toBe('2d');
    expect(durationToDisplayText(start, new Date(3 * MS_PER.day))).toBe('3d');
    expect(durationToDisplayText(start, new Date(2 * MS_PER.week))).toBe('2w');
    expect(durationToDisplayText(start, new Date(7 * MS_PER.week))).toBe(
      '~2mos'
    );
    expect(durationToDisplayText(start, new Date(4 * MS_PER.month))).toBe(
      '4mos'
    );
    expect(durationToDisplayText(start, new Date(1 * MS_PER.year))).toBe('1y');
  });

  it('adds approximation tilde only when sub-unit seconds exist', () => {
    const start = new Date(0);

    const seconds = new Date(42 * 1000);
    const exactMinutes = new Date(15 * 60 * 1000);
    const minutesWithMsJitter = new Date(15 * 60 * 1000 + 500);
    const minutesWithSeconds = new Date(15 * 60 * 1000 + 33 * 1000);
    const exactWeeks = new Date(2 * MS_PER.week);
    const weekWithSeconds = new Date(2 * MS_PER.week + 33 * 1000);
    const exactMonths = new Date(2 * MS_PER.month);
    const monthWithSeconds = new Date(2 * MS_PER.month + 33 * 1000);
    const exactYears = new Date(2 * MS_PER.year);
    const yearWithSeconds = new Date(2 * MS_PER.year + 33 * 1000);

    expect(durationToDisplayText(start, seconds)).toBe('42s');
    expect(durationToDisplayText(start, exactMinutes)).toBe('15min');
    expect(durationToDisplayText(start, minutesWithMsJitter)).toBe('15min');
    expect(durationToDisplayText(start, minutesWithSeconds)).toMatch(
      /^~\d+min$/
    );
    expect(durationToDisplayText(start, exactWeeks)).toBe('2w');
    expect(durationToDisplayText(start, weekWithSeconds)).toBe('~2w');
    expect(durationToDisplayText(start, exactMonths)).toBe('2mos');
    expect(durationToDisplayText(start, monthWithSeconds)).toBe('~2mos');
    expect(durationToDisplayText(start, exactYears)).toBe('2y');
    expect(durationToDisplayText(start, yearWithSeconds)).toBe('~2y');
  });
});

describe('timeRangeToDisplayText', () => {
  const toDisplay = (
    text: string,
    options?: Parameters<typeof timeRangeToDisplayText>[1]
  ) => timeRangeToDisplayText(textToTimeRange(text), options);

  it('handles relative to relative', () => {
    expect(toDisplay('-15m to -5m')).toBe('15 minutes ago → 5 minutes ago');
  });

  it('handles relative to now', () => {
    expect(toDisplay('-1w')).toBe('1 week ago → now');
  });

  it('handles now to relative', () => {
    expect(toDisplay('now to +15m')).toBe('now → 15 minutes from now');
  });

  it('handles absolute to absolute', () => {
    expect(toDisplay('Feb 3 2016, 19:00 to Feb 3 2026, 19:00')).toBe(
      'Feb 3 2016, 19:00 → Feb 3 2026, 19:00'
    );
  });

  it('handles absolute to now', () => {
    expect(toDisplay('Feb 3 2016 to now')).toBe('Feb 3 2016, 00:00 → now');
  });

  it('handles now to absolute', () => {
    expect(toDisplay('now to Feb 3 2027')).toBe('now → Feb 3 2027, 00:00');
  });

  it('handles relative to absolute', () => {
    jest.useFakeTimers().setSystemTime(new Date('2016-02-03T19:00:00.000Z'));
    expect(toDisplay('-15m to feb 3 2026, 19:00')).toBe(
      '15 minutes ago → Feb 3 2026, 19:00'
    );
    jest.useRealTimers();
  });

  it('handles absolute to relative', () => {
    jest.useFakeTimers().setSystemTime(new Date('2016-02-03T19:00:00.000Z'));
    expect(toDisplay('feb 3 2016, 19:00 to +10y')).toBe(
      'Feb 3 2016, 19:00 → 10 years from now'
    );
    jest.useRealTimers();
  });

  it('keeps natural language, capitalized', () => {
    expect(timeRangeToDisplayText(textToTimeRange('last 7 minutes'))).toBe(
      'Last 7 minutes'
    );
  });

  it.todo('uses abbreviations for absolute dates, with default format');

  it('supports a custom delimiter', () => {
    expect(toDisplay('-1h', { delimiter: 'until' })).toBe(
      '1 hour ago until now'
    );
  });

  it('supports a custom date format', () => {
    expect(
      toDisplay('feb 3, 2016 to feb 3, 2026', { dateFormat: 'YYYY' })
    ).toBe('2016 → 2026');
  });

  it('returns raw text for invalid ranges', () => {
    const invalidRange = textToTimeRange('not a range');

    expect(timeRangeToDisplayText(invalidRange)).toBe('not a range');
  });
});
