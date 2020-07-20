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

import {
  isNil,
  isArray,
  isBoolean,
  isDate,
  isNaN,
  isNumber,
  isString,
} from '../predicate';
import { formatBoolean } from './format_boolean';
import { formatDate } from './format_date';
import { formatNumber } from './format_number';
import { formatText } from './format_text';

export const formatAuto = (value: any): string => {
  if (isNil(value) || isNaN(value)) {
    return '';
  }

  if (isString(value)) {
    return formatText(value);
  }

  if (isDate(value)) {
    return formatDate(value);
  }

  if (isBoolean(value)) {
    return formatBoolean(value);
  }

  if (isNumber(value)) {
    return formatNumber(value);
  }

  if (isArray(value)) {
    return Array.isArray(value)
      ? value.map(item => formatAuto(item)).join(', ')
      : formatAuto(value);
  }

  // TODO not sure if we want that.. the (+) is that we show something, the (-) is that it's very technical
  return JSON.stringify(value);
};
