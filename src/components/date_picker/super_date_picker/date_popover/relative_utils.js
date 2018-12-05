
import dateMath from '@elastic/datemath';
import moment from 'moment';
import _ from 'lodash';
import { relativeOptions } from './relative_options';

export function parseRelativeParts(value) {
  const matches = _.isString(value) && value.match(/now(([\-\+])([0-9]+)([smhdwMy])(\/[smhdwMy])?)?/);

  const isNow = matches && !matches[1];
  const operator = matches && matches[2];
  const count = matches && matches[3];
  const unit = matches && matches[4];
  const roundBy = matches && matches[5];

  if (isNow) {
    return { count: 0, unit: 's', round: false };
  }

  if (count && unit) {
    return {
      count: parseInt(count, 10),
      unit: operator === '+' ? `${unit}+` : unit,
      round: roundBy ? true : false,
    };
  }

  const results = { count: 0, unit: 's', round: false };
  const duration = moment.duration(moment().diff(dateMath.parse(value)));
  const units = _.pluck(_.clone(relativeOptions).reverse(), 'value')
    .filter(s => /^[smhdwMy]$/.test(s));
  let unitOp = '';
  for (let i = 0; i < units.length; i++) {
    const as = duration.as(units[i]);
    if (as < 0) unitOp = '+';
    if (Math.abs(as) > 1) {
      results.count = Math.round(Math.abs(as));
      results.unit = units[i] + unitOp;
      results.round = false;
      break;
    }
  }
  return results;
}

export function toRelativeStringFromParts(relativeParts) {
  const count = _.get(relativeParts, `count`, 0);
  const round = _.get(relativeParts, `round`, false);

  if (count === 0 && !round) {
    return 'now';
  }

  const matches = _.get(relativeParts, `unit`, 's').match(/([smhdwMy])(\+)?/);
  const unit = matches[1];
  const operator = matches && matches[2] ? matches[2] : '-';

  let result = `now${operator}${count}${unit}`;
  result += (round ? `/${unit}` : '');
  return result;
}
