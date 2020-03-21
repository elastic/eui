/**
 * This function returns time value, time unit and time tense for a given time string.
 * For example: for `now-40m` it will parse output as time value to `40`
 * time unit to `m` and time unit to `last`.
 * If given a datetime string it will return a default value.
 * If the given string is in the format such as `now/d` it will parse the string to moment object
 * and find the time value, time unit and time tense using moment
 *
 * @param {string} value The time string to be parsed
 * @returns {object} time value, time unit and time tense
 */

import { isString } from '../../../../services/predicate';
import dateMath from '@elastic/datemath';
import moment from 'moment';
import { relativeUnitsFromLargestToSmallest } from '../relative_options';

const LAST = 'last';
const NEXT = 'next';
const NOW = 'now';

const isNow = value => value === NOW;

export const parseTimeParts = value => {
  const results = {
    timeValueDefault: 15,
    timeUnitsDefault: 'm',
    timeTenseDefault: LAST,
  };

  if (isNow(value)) {
    results.timeValueDefault = 0;
    results.timeUnitsDefault = 's';
    results.timeTenseDefault = LAST;
    return results;
  }

  const matches =
    isString(value) &&
    value.match(/now(([\-\+])([0-9]+)([smhdwMy])(\/[smhdwMy])?)?/);

  if (!matches) {
    return results;
  }

  const operator = matches && matches[2];
  const timeValue = matches && matches[3];
  const timeUnitsDefault = matches && matches[4];

  if (timeValue && timeUnitsDefault && operator) {
    const timeValueDefault = parseInt(timeValue);
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
