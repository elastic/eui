/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import dateMath from '@elastic/datemath';
import moment, { LocaleSpecifier } from 'moment'; // eslint-disable-line import/named
import { useEuiI18n } from '../../i18n';
import { getDateMode, DATE_MODES } from './date_modes';
import { parseRelativeParts } from './relative_utils';
import { useI18nTimeOptions } from './time_options';
import {
  DurationRange,
  TimeUnitAllId,
  ShortDate,
  RelativeParts,
} from '../types';

/**
 * Pretty duration i18n strings
 * Units should not be simply concatenated because different languages
 * will have different grammar/positions for time than English
 */

const useRelativeDurationI18n = (duration: number) => ({
  s: useEuiI18n(
    'euiPrettyDuration.lastDurationSeconds',
    ({ duration }) => `Last ${duration} second${duration === 1 ? '' : 's'}`,
    { duration }
  ),
  's+': useEuiI18n(
    'euiPrettyDuration.nextDurationSeconds',
    ({ duration }) => `Next ${duration} second${duration === 1 ? '' : 's'}`,
    { duration }
  ),
  m: useEuiI18n(
    'euiPrettyDuration.lastDurationMinutes',
    ({ duration }) => `Last ${duration} minute${duration === 1 ? '' : 's'}`,
    { duration }
  ),
  'm+': useEuiI18n(
    'euiPrettyDuration.nextDurationMinutes',
    ({ duration }) => `Next ${duration} minute${duration === 1 ? '' : 's'}`,
    { duration }
  ),
  h: useEuiI18n(
    'euiPrettyDuration.lastDurationHours',
    ({ duration }) => `Last ${duration} hour${duration === 1 ? '' : 's'}`,
    { duration }
  ),
  'h+': useEuiI18n(
    'euiPrettyDuration.nextDurationHours',
    ({ duration }) => `Next ${duration} hour${duration === 1 ? '' : 's'}`,
    { duration }
  ),
  d: useEuiI18n(
    'euiPrettyDuration.lastDurationDays',
    ({ duration }) => `Last ${duration} day${duration === 1 ? '' : 's'}`,
    { duration }
  ),
  'd+': useEuiI18n(
    'euiPrettyDuration.nexttDurationDays',
    ({ duration }) => `Next ${duration} day${duration === 1 ? '' : 's'}`,
    { duration }
  ),
  w: useEuiI18n(
    'euiPrettyDuration.lastDurationWeeks',
    ({ duration }) => `Last ${duration} week${duration === 1 ? '' : 's'}`,
    { duration }
  ),
  'w+': useEuiI18n(
    'euiPrettyDuration.nextDurationWeeks',
    ({ duration }) => `Next ${duration} week${duration === 1 ? '' : 's'}`,
    { duration }
  ),
  M: useEuiI18n(
    'euiPrettyDuration.lastDurationMonths',
    ({ duration }) => `Last ${duration} month${duration === 1 ? '' : 's'}`,
    { duration }
  ),
  'M+': useEuiI18n(
    'euiPrettyDuration.nextDurationMonths',
    ({ duration }) => `Next ${duration} month${duration === 1 ? '' : 's'}`,
    { duration }
  ),
  y: useEuiI18n(
    'euiPrettyDuration.lastDurationYears',
    ({ duration }) => `Last ${duration} year${duration === 1 ? '' : 's'}`,
    { duration }
  ),
  'y+': useEuiI18n(
    'euiPrettyDuration.nextDurationYears',
    ({ duration }) => `Next ${duration} year${duration === 1 ? '' : 's'}`,
    { duration }
  ),
});

const useRelativeDurationRoundedI18n = (prettyDuration: string) => ({
  s: useEuiI18n(
    'euiPrettyDuration.durationRoundedToSecond',
    '{prettyDuration} rounded to the second',
    { prettyDuration }
  ),
  m: useEuiI18n(
    'euiPrettyDuration.durationRoundedToMinute',
    '{prettyDuration} rounded to the minute',
    { prettyDuration }
  ),
  h: useEuiI18n(
    'euiPrettyDuration.durationRoundedToHour',
    '{prettyDuration} rounded to the hour',
    { prettyDuration }
  ),
  d: useEuiI18n(
    'euiPrettyDuration.durationRoundedToDay',
    '{prettyDuration} rounded to the day',
    { prettyDuration }
  ),
  w: useEuiI18n(
    'euiPrettyDuration.durationRoundedToWeek',
    '{prettyDuration} rounded to the week',
    { prettyDuration }
  ),
  M: useEuiI18n(
    'euiPrettyDuration.durationRoundedToMonth',
    '{prettyDuration} rounded to the month',
    { prettyDuration }
  ),
  y: useEuiI18n(
    'euiPrettyDuration.durationRoundedToYear',
    '{prettyDuration} rounded to the year',
    { prettyDuration }
  ),
});

/**
 * Reusable format time string util
 */

const ISO_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

export const useFormatTimeString = (
  timeString: string,
  dateFormat: string,
  roundUp = false,
  locale: LocaleSpecifier = 'en'
): string => {
  // i18n'd strings
  const nowDisplay = useEuiI18n('euiPrettyDuration.now', 'now');
  const invalidDateDisplay = useEuiI18n(
    'euiPrettyDuration.invalid',
    'Invalid date'
  );

  const timeAsMoment = moment(timeString, ISO_FORMAT, true);
  if (timeAsMoment.isValid()) {
    return timeAsMoment.locale(locale).format(dateFormat);
  }

  if (timeString === 'now') {
    return nowDisplay;
  }

  const tryParse = dateMath.parse(timeString, { roundUp: roundUp });
  if (!moment(tryParse).isValid()) {
    return invalidDateDisplay;
  }

  if (moment.isMoment(tryParse)) {
    return `~ ${tryParse.locale(locale).fromNow()}`;
  }

  return timeString;
};

/**
 * Pretty duration hook+component
 */

interface PrettyDurationProps {
  timeFrom: ShortDate;
  timeTo: ShortDate;
  quickRanges?: DurationRange[];
  dateFormat: string;
}

export const usePrettyDuration = ({
  timeFrom,
  timeTo,
  quickRanges,
  dateFormat,
}: PrettyDurationProps) => {
  let prettyDuration: string = '';

  /**
   * If it's a quick range, use the quick range label
   */
  const { commonDurationRanges } = useI18nTimeOptions();
  const matchingQuickRange = hasRangeMatch(
    timeFrom,
    timeTo,
    quickRanges || commonDurationRanges
  );
  if (matchingQuickRange && matchingQuickRange.label) {
    prettyDuration = matchingQuickRange.label;
  }

  /**
   * Otherwise if it's a relative (possibly rounded) duration, figure out
   * a pretty i18n'd duration to display
   */
  let relativeDuration: number = 0;
  let relativeParts = {} as RelativeParts;

  if (isRelativeToNow(timeFrom, timeTo)) {
    if (getDateMode(timeTo) === DATE_MODES.NOW) {
      relativeParts = parseRelativeParts(timeFrom);
    } else {
      relativeParts = parseRelativeParts(timeTo);
    }
    relativeDuration = relativeParts.count;
  }

  const relativeDurationI18n = useRelativeDurationI18n(relativeDuration);
  const relativeDurationString = relativeParts.unit
    ? relativeDurationI18n[relativeParts.unit as TimeUnitAllId]
    : '';

  const roundedDurationI18n = useRelativeDurationRoundedI18n(
    relativeDurationString
  );
  const roundedDurationString =
    relativeParts.round && relativeParts.roundUnit
      ? roundedDurationI18n[relativeParts.roundUnit]
      : '';

  if (!prettyDuration) {
    prettyDuration = roundedDurationString || relativeDurationString;
  }

  /**
   * If it's none of the above, display basic fallback copy
   */
  const displayFrom = useFormatTimeString(timeFrom, dateFormat);
  const displayTo = useFormatTimeString(timeTo, dateFormat, true);
  const fallbackDuration = useEuiI18n(
    'euiPrettyDuration.fallbackDuration',
    '{displayFrom} to {displayTo}',
    { displayFrom, displayTo }
  );
  if (!prettyDuration) {
    prettyDuration = fallbackDuration;
  }

  return prettyDuration;
};

export const PrettyDuration: React.FC<PrettyDurationProps> = ({
  timeFrom,
  timeTo,
  quickRanges,
  dateFormat,
}) => {
  const prettyDuration = usePrettyDuration({
    timeFrom,
    timeTo,
    quickRanges,
    dateFormat,
  });
  return <>{prettyDuration}</>;
};

/**
 * Non-hook utils
 */

const hasRangeMatch = (
  timeFrom: ShortDate,
  timeTo: ShortDate,
  ranges: DurationRange[]
) => {
  return ranges.find(({ start, end }) => timeFrom === start && timeTo === end);
};

const isRelativeToNow = (timeFrom: ShortDate, timeTo: ShortDate): boolean => {
  const fromDateMode = getDateMode(timeFrom);
  const toDateMode = getDateMode(timeTo);
  const isLast =
    fromDateMode === DATE_MODES.RELATIVE && toDateMode === DATE_MODES.NOW;
  const isNext =
    fromDateMode === DATE_MODES.NOW && toDateMode === DATE_MODES.RELATIVE;
  return isLast || isNext;
};

export const showPrettyDuration = (
  timeFrom: ShortDate,
  timeTo: ShortDate,
  quickRanges: DurationRange[]
): boolean => {
  if (hasRangeMatch(timeFrom, timeTo, quickRanges)) {
    return true;
  }
  return isRelativeToNow(timeFrom, timeTo);
};
