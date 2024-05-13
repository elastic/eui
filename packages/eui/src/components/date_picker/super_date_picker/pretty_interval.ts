/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiI18n } from '../../i18n';

const MS_INTERVALS = {
  s: 1000,
  get m() {
    return 60 * this.s;
  },
  get h() {
    return 60 * this.m;
  },
  get d() {
    return 24 * this.h;
  },
} as const;

type IntervalUnitId = keyof typeof MS_INTERVALS;

/**
 * Pretty interval i18n strings
 *
 * Units should not be simply concatenated because different languages
 * will have different grammar/positions for time than English
 */
const usePrettyIntervalI18n = (interval: number) => ({
  s: useEuiI18n(
    'euiPrettyInterval.seconds',
    ({ interval }) => `${interval} second${interval > 1 ? 's' : ''}`,
    { interval }
  ),
  m: useEuiI18n(
    'euiPrettyInterval.minutes',
    ({ interval }) => `${interval} minute${interval > 1 ? 's' : ''}`,
    { interval }
  ),
  h: useEuiI18n(
    'euiPrettyInterval.hours',
    ({ interval }) => `${interval} hour${interval > 1 ? 's' : ''}`,
    { interval }
  ),
  d: useEuiI18n(
    'euiPrettyInterval.days',
    ({ interval }) => `${interval} day${interval > 1 ? 's' : ''}`,
    { interval }
  ),
  shorthand: {
    s: useEuiI18n('euiPrettyInterval.secondsShorthand', '{interval} s', {
      interval,
    }),
    m: useEuiI18n('euiPrettyInterval.minutesShorthand', '{interval} m', {
      interval,
    }),
    h: useEuiI18n('euiPrettyInterval.hoursShorthand', '{interval} h', {
      interval,
    }),
    d: useEuiI18n('euiPrettyInterval.daysShorthand', '{interval} d', {
      interval,
    }),
  },
});

export const usePrettyInterval = (
  isPaused: boolean,
  intervalInMs: number,
  options?: { shortHand?: boolean; unit?: IntervalUnitId }
) => {
  const { shortHand = false, unit } = options || {};

  let prettyInterval = '';
  let interval: number;
  let unitId: IntervalUnitId;

  if (unit) {
    unitId = unit;
    interval = Math.round(intervalInMs / MS_INTERVALS[unit]);
  } else {
    if (intervalInMs < MS_INTERVALS.m) {
      interval = Math.round(intervalInMs / MS_INTERVALS.s);
      unitId = 's';
    } else if (intervalInMs < MS_INTERVALS.h) {
      interval = Math.round(intervalInMs / MS_INTERVALS.m);
      unitId = 'm';
    } else if (intervalInMs < MS_INTERVALS.d) {
      interval = Math.round(intervalInMs / MS_INTERVALS.h);
      unitId = 'h';
    } else {
      interval = Math.round(intervalInMs / MS_INTERVALS.d);
      unitId = 'd';
    }
  }
  const prettyIntervalI18n = usePrettyIntervalI18n(interval);
  prettyInterval = shortHand
    ? prettyIntervalI18n.shorthand[unitId]
    : prettyIntervalI18n[unitId];

  const off = useEuiI18n('euiPrettyInterval.off', 'Off');
  if (isPaused || intervalInMs === 0) {
    prettyInterval = off;
  }

  return prettyInterval;
};
