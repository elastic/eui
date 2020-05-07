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
import {
  parseRelativeParts,
  toRelativeStringFromParts,
} from './relative_utils';
import {
  AbsoluteDateMode,
  RelativeDateMode,
  NowDateMode,
  ShortDate,
} from '../types';

export const DATE_MODES: {
  ABSOLUTE: AbsoluteDateMode;
  RELATIVE: RelativeDateMode;
  NOW: NowDateMode;
} = {
  ABSOLUTE: 'absolute',
  RELATIVE: 'relative',
  NOW: 'now',
};

export function getDateMode(value: ShortDate) {
  if (value === 'now') {
    return DATE_MODES.NOW;
  }

  if (value.includes('now')) {
    return DATE_MODES.RELATIVE;
  }

  return DATE_MODES.ABSOLUTE;
}

export function toAbsoluteString(value: string, roundUp: boolean = false) {
  const valueAsMoment = dateMath.parse(value, { roundUp });
  if (!valueAsMoment) {
    return value;
  }
  return valueAsMoment.toISOString();
}

export function toRelativeString(value: string) {
  return toRelativeStringFromParts(parseRelativeParts(value));
}
