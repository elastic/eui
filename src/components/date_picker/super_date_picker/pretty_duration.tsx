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
import { DurationRange, TimeUnitId, ShortDate, RelativeParts } from '../types';

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

  const timeOptions = useI18nTimeOptions();
  const {
    timeUnits,
    timeUnitsPlural,
    timeTenseOptions,
    commonDurationRanges,
  } = timeOptions;

  const matchingQuickRange = hasRangeMatch(
    timeFrom,
    timeTo,
    quickRanges || commonDurationRanges
  );
  if (matchingQuickRange && matchingQuickRange.label) {
    prettyDuration = matchingQuickRange.label;
  }

  let relativeDuration = '';
  let relativeParts = {} as RelativeParts;
  if (isRelativeToNow(timeFrom, timeTo)) {
    let timeTense;
    if (getDateMode(timeTo) === DATE_MODES.NOW) {
      timeTense = timeTenseOptions[0].text; // Last
      relativeParts = parseRelativeParts(timeFrom);
    } else {
      timeTense = timeTenseOptions[1].text; // Next
      relativeParts = parseRelativeParts(timeTo);
    }

    const countTimeUnit = relativeParts.unit.substring(0, 1) as TimeUnitId;
    const countTimeUnitFullName =
      relativeParts.count > 1
        ? timeUnitsPlural[countTimeUnit]
        : timeUnits[countTimeUnit];

    relativeDuration = `${timeTense} ${relativeParts.count} ${countTimeUnitFullName}`;
  }
  const roundedRelativeDuration = useEuiI18n(
    'euiPrettyDuration.roundedRelativeDuration',
    '{time} rounded to the {unit}',
    { time: relativeDuration, unit: timeUnits[relativeParts.roundUnit!] }
  );
  if (relativeParts.round && relativeParts.roundUnit) {
    relativeDuration = roundedRelativeDuration;
  }
  if (!prettyDuration) {
    prettyDuration = relativeDuration;
  }

  // Can't look up the returned value, display a fallback text
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
