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

import { isDateLike, isNumber } from '../../../services/predicate';
import {
  dateFormat as defaultDateFormat,
  dateGranularity,
  GranularityType,
} from './date_format';
// ESLint doesn't realise that we can import Moment directly.
// eslint-disable-next-line import/named
import moment, { MomentInput } from 'moment';

export const DATE_TYPE = 'date';

export interface DateValue {
  type: 'date';
  raw: MomentInput;
  granularity: GranularityType | undefined;
  text: string;
  resolve: () => moment.Moment;
}

export const dateValuesEqual = (v1: DateValue, v2: DateValue) => {
  return (
    v1.raw === v2.raw &&
    v1.granularity === v2.granularity &&
    v1.text === v2.text
  );
};

export const isDateValue = (value: any): value is DateValue => {
  return (
    !!value &&
    value.type === DATE_TYPE &&
    !!value.raw &&
    !!value.text &&
    !!value.resolve
  );
};

export const dateValue: (
  raw: MomentInput,
  granularity?: GranularityType,
  dateFormat?: any
) => DateValue | undefined = (
  raw,
  granularity,
  dateFormat = defaultDateFormat
) => {
  if (!raw) {
    return undefined;
  }

  if (isDateLike(raw)) {
    const dateValue: DateValue = {
      type: DATE_TYPE,
      raw,
      granularity,
      text: dateFormat.print(raw),
      resolve: () => moment(raw),
    };
    return dateValue;
  }
  if (isNumber(raw)) {
    return {
      type: DATE_TYPE,
      raw,
      granularity,
      text: raw.toString(),
      resolve: () => moment(raw),
    };
  }
  const text = raw.toString();
  return {
    type: DATE_TYPE,
    raw,
    granularity,
    text,
    resolve: () => dateFormat.parse(text),
  };
};

export const dateValueParser = (format = defaultDateFormat) => {
  return (text: string) => {
    const parsed = format.parse(text);
    return dateValue(text, dateGranularity(parsed), format);
  };
};
