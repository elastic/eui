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
