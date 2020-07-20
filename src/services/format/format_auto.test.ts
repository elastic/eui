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

import { formatAuto } from './format_auto';

describe('formatAuto', () => {
  test('boolean value', () => {
    expect(formatAuto(true)).toBe('Yes');
    expect(formatAuto(false)).toBe('No');
  });

  test('numeric value', () => {
    expect(formatAuto(1234.567)).toBe('1234.567');
  });

  test('string value', () => {
    expect(formatAuto('value')).toBe('value');
  });

  test('date value', () => {
    const value = new Date(1999, 0, 1, 2, 3, 4, 5);
    expect(formatAuto(value)).toBe('1 Jan 1999 02:03');
  });

  test('array of dates', () => {
    const dates = [new Date(1999, 0, 1, 2, 3, 4, 5)];
    expect(formatAuto(dates)).toBe('1 Jan 1999 02:03');
  });

  test('object value', () => {
    const obj = { key: 'value' };
    expect(formatAuto(obj)).toBe('{"key":"value"}');
  });
});
