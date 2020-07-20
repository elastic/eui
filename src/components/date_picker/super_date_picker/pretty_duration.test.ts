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

import { prettyDuration, showPrettyDuration } from './pretty_duration';

const dateFormat = 'MMMM Do YYYY, HH:mm:ss.SSS';
const quickRanges = [
  {
    start: 'now-15m',
    end: 'now',
    label: 'quick range 15 minutes custom display',
  },
];

describe('prettyDuration', () => {
  test('quick range', () => {
    const timeFrom = 'now-15m';
    const timeTo = 'now';
    expect(prettyDuration(timeFrom, timeTo, quickRanges, dateFormat)).toBe(
      'quick range 15 minutes custom display'
    );
  });

  test('last', () => {
    const timeFrom = 'now-16m';
    const timeTo = 'now';
    expect(prettyDuration(timeFrom, timeTo, quickRanges, dateFormat)).toBe(
      'Last 16 minutes'
    );
  });

  test('last that is rounded', () => {
    const timeFrom = 'now-1M/w';
    const timeTo = 'now';
    expect(prettyDuration(timeFrom, timeTo, quickRanges, dateFormat)).toBe(
      'Last 1 month rounded to the week'
    );
  });

  test('next', () => {
    const timeFrom = 'now';
    const timeTo = 'now+16m';
    expect(prettyDuration(timeFrom, timeTo, quickRanges, dateFormat)).toBe(
      'Next 16 minutes'
    );
  });

  test('from is in past', () => {
    const timeFrom = 'now-17m';
    const timeTo = 'now-15m';
    expect(prettyDuration(timeFrom, timeTo, quickRanges, dateFormat)).toBe(
      '~ 17 minutes ago to ~ 15 minutes ago'
    );
  });
});

describe('showPrettyDuration', () => {
  test('should show pretty duration for quick range', () => {
    expect(showPrettyDuration('now-15m', 'now', quickRanges)).toBe(true);
  });

  test('should show pretty duration for last', () => {
    expect(showPrettyDuration('now-17m', 'now', quickRanges)).toBe(true);
  });

  test('should show pretty duration for next', () => {
    expect(showPrettyDuration('now', 'now+17m', quickRanges)).toBe(true);
  });

  test('should not show pretty duration for relative to relative', () => {
    expect(showPrettyDuration('now-17m', 'now-3m', quickRanges)).toBe(false);
  });

  test('should not show pretty duration for absolute to absolute', () => {
    expect(
      showPrettyDuration(
        '2018-01-17T18:57:57.149Z',
        '2018-01-17T20:00:00.000Z',
        quickRanges
      )
    ).toBe(false);
  });

  test('should not show pretty duration for absolute to now', () => {
    expect(
      showPrettyDuration('2018-01-17T18:57:57.149Z', 'now', quickRanges)
    ).toBe(false);
  });
});
