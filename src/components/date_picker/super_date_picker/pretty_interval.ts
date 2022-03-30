/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiI18n } from '../../i18n';

const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = 60 * MS_IN_SECOND;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;

type IntervalUnitId = 's' | 'm' | 'h' | 'd';

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
  shortHand: boolean = false
) => {
  let prettyInterval = '';
  let interval: number;
  let unitId: IntervalUnitId;

  if (intervalInMs < MS_IN_MINUTE) {
    interval = Math.round(intervalInMs / MS_IN_SECOND);
    unitId = 's';
  } else if (intervalInMs < MS_IN_HOUR) {
    interval = Math.round(intervalInMs / MS_IN_MINUTE);
    unitId = 'm';
  } else if (intervalInMs < MS_IN_DAY) {
    interval = Math.round(intervalInMs / MS_IN_HOUR);
    unitId = 'h';
  } else {
    interval = Math.round(intervalInMs / MS_IN_DAY);
    unitId = 'd';
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
