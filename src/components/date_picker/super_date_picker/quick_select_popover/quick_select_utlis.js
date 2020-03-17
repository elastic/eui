import { isString } from '../../../../services/predicate';
import dateMath from '@elastic/datemath';
import moment from 'moment';
import { relativeUnitsFromLargestToSmallest } from '../relative_options';

const LAST = 'last';
const NEXT = 'next';

export const parseTimeParts = value => {
  const matches =
    isString(value) &&
    value.match(/now(([\-\+])([0-9]+)([smhdwMy])(\/[smhdwMy])?)?/);

  if (!matches) {
    return {
      timeValueDefault: 15,
      timeUnitsDefault: 'm',
      timeTenseDefault: LAST,
    };
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

  const results = {
    timeValueDefault: 15,
    timeUnitsDefault: 'm',
    timeTenseDefault: LAST,
  };

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
