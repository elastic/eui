/**
 * This function returns time value, time unit and time tense for a given time string.
 * For example: for `now-40m` it will parse output as time value to `40`
 * time unit to `m` and time unit to `last`.
 * If given a datetime string it will return a default value.
 * If the given string is in the format such as `now/d` it will parse the string to moment object
 * and find the time value, time unit and time tense using moment
 * This function accepts two strings start and end time. I the start value is now then it uses
 * the end value to parse.
 *
 * @param {string} start start time
 * @param {string} start end time
 * @returns {object} time value, time unit and time tense
 */

import moment from 'moment';
import dateMath from '@elastic/datemath';
import { isString } from '../../../../services/predicate';
import { relativeUnitsFromLargestToSmallest } from '../relative_options';
import { DATE_MODES } from '../date_modes';

const LAST = 'last';
const NEXT = 'next';

const isNow = value => value === DATE_MODES.NOW;

export const parseTimeParts = (start, end) => {
  const results = {
    timeValueDefault: 15,
    timeUnitsDefault: 'm',
    timeTenseDefault: LAST,
  };

  const value = isNow(start) ? end : start;

  const matches =
    isString(value) &&
    value.match(/now(([-+])(\d+)([smhdwMy])(\/[smhdwMy])?)?/);

  if (!matches) {
    return results;
  }

  const operator = matches[2];
  const timeValue = matches[3];
  const timeUnitsDefault = matches[4];

  if (timeValue && timeUnitsDefault && operator) {
    const timeValueDefault = parseInt(timeValue, 10);
    const timeTenseDefault = operator === '+' ? NEXT : LAST;

    return {
      timeValueDefault,
      timeUnitsDefault,
      timeTenseDefault,
    };
  }

  const duration = moment.duration(moment().diff(dateMath.parse(value)));
  let unitOp = '';
  for (let i = 0; i < relativeUnitsFromLargestToSmallest.length; i++) {
    const as = duration.as(relativeUnitsFromLargestToSmallest[i]);
    if (as < 0) unitOp = '+';
    if (Math.abs(as) > 1) {
      results.timeValueDefault = Math.round(Math.abs(as));
      results.timeUnitsDefault = relativeUnitsFromLargestToSmallest[i];
      results.timeTenseDefault = unitOp === '+' ? NEXT : LAST;
      break;
    }
  }
  return results;
};
