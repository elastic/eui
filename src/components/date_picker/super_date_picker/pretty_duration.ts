/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import dateMath from '@elastic/datemath';
import moment, { LocaleSpecifier } from 'moment'; // eslint-disable-line import/named
import { timeUnits, timeUnitsPlural } from './time_units';
import { getDateMode, DATE_MODES } from './date_modes';
import { parseRelativeParts } from './relative_utils';
import { DurationRange, TimeUnitId, ShortDate } from '../types';

const ISO_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

export const commonDurationRanges: DurationRange[] = [
  { start: 'now/d', end: 'now/d', label: 'Today' },
  { start: 'now/w', end: 'now/w', label: 'This week' },
  { start: 'now/M', end: 'now/M', label: 'This month' },
  { start: 'now/y', end: 'now/y', label: 'This year' },
  { start: 'now-1d/d', end: 'now-1d/d', label: 'Yesterday' },
  { start: 'now/w', end: 'now', label: 'Week to date' },
  { start: 'now/M', end: 'now', label: 'Month to date' },
  { start: 'now/y', end: 'now', label: 'Year to date' },
];

function cantLookup(timeFrom: string, timeTo: string, dateFormat: string) {
  const displayFrom = formatTimeString(timeFrom, dateFormat);
  const displayTo = formatTimeString(timeTo, dateFormat, true);
  return `${displayFrom} to ${displayTo}`;
}

function isRelativeToNow(timeFrom: ShortDate, timeTo: ShortDate) {
  const fromDateMode = getDateMode(timeFrom);
  const toDateMode = getDateMode(timeTo);
  const isLast =
    fromDateMode === DATE_MODES.RELATIVE && toDateMode === DATE_MODES.NOW;
  const isNext =
    fromDateMode === DATE_MODES.NOW && toDateMode === DATE_MODES.RELATIVE;
  return isLast || isNext;
}

export function formatTimeString(
  timeString: string,
  dateFormat: string,
  roundUp = false,
  locale: LocaleSpecifier = 'en'
) {
  const timeAsMoment = moment(timeString, ISO_FORMAT, true);
  if (timeAsMoment.isValid()) {
    return timeAsMoment.locale(locale).format(dateFormat);
  }

  if (timeString === 'now') {
    return 'now';
  }

  const tryParse = dateMath.parse(timeString, { roundUp: roundUp });
  if (moment.isMoment(tryParse)) {
    return `~ ${tryParse.locale(locale).fromNow()}`;
  }

  return timeString;
}

export function prettyDuration(
  timeFrom: ShortDate,
  timeTo: ShortDate,
  quickRanges: DurationRange[] = [],
  dateFormat: string
) {
  const matchingQuickRange = quickRanges.find(
    ({ start: quickFrom, end: quickTo }) => {
      return timeFrom === quickFrom && timeTo === quickTo;
    }
  );
  if (matchingQuickRange) {
    return matchingQuickRange.label;
  }

  if (isRelativeToNow(timeFrom, timeTo)) {
    let timeTense;
    let relativeParts;
    if (getDateMode(timeTo) === DATE_MODES.NOW) {
      timeTense = 'Last';
      relativeParts = parseRelativeParts(timeFrom);
    } else {
      timeTense = 'Next';
      relativeParts = parseRelativeParts(timeTo);
    }
    const countTimeUnit = relativeParts.unit.substring(0, 1) as TimeUnitId;
    const countTimeUnitFullName =
      relativeParts.count > 1
        ? timeUnitsPlural[countTimeUnit]
        : timeUnits[countTimeUnit];
    let text = `${timeTense} ${relativeParts.count} ${countTimeUnitFullName}`;
    if (relativeParts.round && relativeParts.roundUnit) {
      text += ` rounded to the ${timeUnits[relativeParts.roundUnit]}`;
    }
    return text;
  }

  return cantLookup(timeFrom, timeTo, dateFormat);
}

export function showPrettyDuration(
  timeFrom: ShortDate,
  timeTo: ShortDate,
  quickRanges: DurationRange[] = []
) {
  const matchingQuickRange = quickRanges.find(
    ({ start: quickFrom, end: quickTo }) => {
      return timeFrom === quickFrom && timeTo === quickTo;
    }
  );
  if (matchingQuickRange) {
    return true;
  }

  return isRelativeToNow(timeFrom, timeTo);
}
