/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dateMath from '@elastic/datemath';
import moment from 'moment';

import { get } from '../../../services/objects';
import { isString } from '../../../services/predicate';
import { relativeUnitsFromLargestToSmallest } from './relative_options';
import { TimeUnitId, RelativeParts } from '../types';

const ROUND_DELIMETER = '/';

export function parseRelativeParts(value: string): RelativeParts {
  const matches =
    isString(value) &&
    value.match(/now(([\-\+])([0-9]+)([smhdwMy])(\/[smhdwMy])?)?/);

  const operator = matches && matches[2];
  const count = matches && matches[3];
  const unit = matches && matches[4];
  const roundBy = matches && matches[5];

  if (count && unit) {
    const isRounded = roundBy ? true : false;
    const roundUnit =
      isRounded && roundBy
        ? (roundBy.replace(ROUND_DELIMETER, '') as TimeUnitId)
        : undefined;
    return {
      count: parseInt(count, 10),
      unit: operator === '+' ? `${unit}+` : unit,
      round: isRounded,
      ...(roundUnit ? { roundUnit } : {}),
    };
  }

  const results = { count: 0, unit: 's', round: false };
  const duration = moment.duration(moment().diff(dateMath.parse(value)));
  let unitOp = '';
  for (let i = 0; i < relativeUnitsFromLargestToSmallest.length; i++) {
    const asRelative = duration.as(relativeUnitsFromLargestToSmallest[i]);
    if (asRelative < 0) unitOp = '+';
    if (Math.abs(asRelative) > 1) {
      results.count = Math.round(Math.abs(asRelative));
      results.unit = relativeUnitsFromLargestToSmallest[i] + unitOp;
      results.round = false;
      break;
    }
  }
  return results;
}

export const toRelativeStringFromParts = (relativeParts: RelativeParts) => {
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
};
