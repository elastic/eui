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

import { getDateMode, toAbsoluteString, toRelativeString } from './date_modes';

jest.mock('@elastic/datemath', () => {
  const moment = jest.requireActual('moment');
  const datemath = jest.requireActual('@elastic/datemath');
  const anchor = '2019-03-19T00:00:00.000Z';
  const anchoredDate = new Date(Date.parse(anchor));
  // https://momentjs.com/docs/#/customization/now/
  const offset = anchoredDate.getTime() - Date.now();
  moment.now = () => offset + Date.now();
  return {
    ...datemath,
    parse: (text: string, options: any) =>
      datemath.parse(text, {
        forceNow: anchoredDate, // For `toAbsoluteString`
        momentInstance: moment, // For `toRelativeString`
        ...options,
      }),
  };
});

describe('dateMode', () => {
  test('getDateMode', () => {
    expect(getDateMode('now')).toBe('now');
    expect(getDateMode('now/1d')).toBe('relative');
    expect(getDateMode('2020-03-19T00:00:00.000Z')).toBe('absolute');
  });

  test('toAbsoluteString', () => {
    expect(toAbsoluteString('now')).toBe('2019-03-19T00:00:00.000Z');
    expect(toAbsoluteString('now+y')).toBe('2020-03-19T00:00:00.000Z');
    expect(toAbsoluteString('now+y', true)).toBe('2020-03-19T00:00:00.000Z');
    expect(toAbsoluteString('now-1w')).toBe('2019-03-12T00:00:00.000Z');
    expect(toAbsoluteString('now-1w', true)).toBe('2019-03-12T00:00:00.000Z');
  });

  test('toRelativeString', () => {
    expect(toRelativeString('2019-03-19T00:00:00.000Z')).toBe('now');
    expect(toRelativeString('2020-03-19T00:00:00.000Z')).toBe('now+1y');
    expect(toRelativeString('2019-03-12T00:00:00.000Z')).toBe('now-1w');
    expect(toRelativeString('2019-03-17T00:00:00.000Z')).toBe('now-2d');
    expect(toRelativeString('2018-04-15T00:00:00.000Z')).toBe('now-11M');
  });
});
