/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import moment from 'moment';
import dateMath from '@elastic/datemath';
import { isString } from '../../../../services/predicate';
import { relativeUnitsFromLargestToSmallest } from '../relative_options';
import { DATE_MODES } from '../date_modes';
import { QuickSelect, TimeUnitId } from '../../types';

const LAST = 'last';
const NEXT = 'next';

const isNow = (value: string) => value === DATE_MODES.NOW;

/**
 * This function returns time value, time unit and time tense for a given time string.
 *
 * For example: for `now-40m` it will parse output as time value to `40` time unit to `m` and time unit to `last`.
 *
 * If given a datetime string it will return a default value.
 *
 * If the given string is in the format such as `now/d` it will parse the string to moment object and find the time value, time unit and time tense using moment
 *
 * This function accepts two strings start and end time. I the start value is now then it uses the end value to parse.
 */
export const parseTimeParts = (start: string, end: string): QuickSelect => {
  const results: QuickSelect = {
    timeTense: LAST,
    timeUnits: 'm',
    timeValue: 15,
  };

  const value = isNow(start) ? end : start;

  const matches =
    isString(value) &&
    value.match(/now(([-+])(\d+)([smhdwMy])(\/[smhdwMy])?)?/);

  if (!matches) {
    return results;
  }

  const operator = matches[2];
  const matchedTimeValue = matches[3];
  const timeUnits = matches[4] as TimeUnitId;

  if (matchedTimeValue && timeUnits && operator) {
    return {
      timeTense: operator === '+' ? NEXT : LAST,
      timeUnits,
      timeValue: parseInt(matchedTimeValue, 10),
    };
  }

  const duration = moment.duration(moment().diff(dateMath.parse(value)));
  let unitOp = '';
  for (let i = 0; i < relativeUnitsFromLargestToSmallest.length; i++) {
    const as = duration.as(relativeUnitsFromLargestToSmallest[i]);
    if (as < 0) {
      unitOp = '+';
    }
    if (Math.abs(as) > 1) {
      return {
        timeValue: Math.round(Math.abs(as)),
        timeUnits: relativeUnitsFromLargestToSmallest[i],
        timeTense: unitOp === '+' ? NEXT : LAST,
      };
    }
  }

  return results;
};
