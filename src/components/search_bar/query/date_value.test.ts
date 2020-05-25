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

import { dateValueParser, isDateValue } from './date_value';
import { Random } from '../../../services';

const random = new Random();

describe('date value', () => {
  test('dateValueParser', () => {
    const date = random.moment().utc();
    const parse = jest.fn();
    parse.mockReturnValue(date);
    const format = { parse, print: jest.fn() };
    const parser = dateValueParser(format);
    const value = parser('dateString');

    expect(parse.mock.calls.length).toBe(1);
    expect(parse.mock.calls[0][0]).toBe('dateString');
    expect(isDateValue(value)).toBe(true);
    expect(value!.resolve().isSame(date)).toBe(true);
  });
});
