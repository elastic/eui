import dateMath from '@elastic/datemath';
import moment from 'moment';

import { get } from '../../../services/objects';
import { isString } from '../../../services/predicate';
import { relativeUnitsFromLargestToSmallest } from './relative_options';

const ROUND_DELIMETER = '/';

export function parseRelativeParts(value) {
  const matches =
    isString(value) &&
    value.match(/now(([\-\+])([0-9]+)([smhdwMy])(\/[smhdwMy])?)?/);

  const isNow = matches && !matches[1];
  const operator = matches && matches[2];
  const count = matches && matches[3];
  const unit = matches && matches[4];
  const roundBy = matches && matches[5];

  if (isNow) {
    return { count: 0, unit: 's', round: false };
  }

  if (count && unit) {
    const isRounded = roundBy ? true : false;
    return {
      count: parseInt(count, 10),
      unit: operator === '+' ? `${unit}+` : unit,
      round: isRounded,
      roundUnit: isRounded ? roundBy.replace(ROUND_DELIMETER, '') : undefined,
    };
  }

  const results = { count: 0, unit: 's', round: false };
  const duration = moment.duration(moment().diff(dateMath.parse(value)));
  let unitOp = '';
  for (let i = 0; i < relativeUnitsFromLargestToSmallest.length; i++) {
    const as = duration.as(relativeUnitsFromLargestToSmallest[i]);
    if (as < 0) unitOp = '+';
    if (Math.abs(as) > 1) {
      results.count = Math.round(Math.abs(as));
      results.unit = relativeUnitsFromLargestToSmallest[i] + unitOp;
      results.round = false;
      break;
    }
  }
  return results;
}

export function toRelativeStringFromParts(relativeParts) {
  const count = get(relativeParts, 'count', 0);
  const isRounded = get(relativeParts, 'round', false);

  if (count === 0 && !isRounded) {
    return 'now';
  }

  const matches = get(relativeParts, 'unit', 's').match(/([smhdwMy])(\+)?/);
  const unit = matches[1];
  const operator = matches && matches[2] ? matches[2] : '-';
  const round = isRounded ? `${ROUND_DELIMETER}${unit}` : '';

  return `now${operator}${count}${unit}${round}`;
}
