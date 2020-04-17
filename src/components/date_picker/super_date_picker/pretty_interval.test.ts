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

import { prettyInterval } from './pretty_interval';

const IS_NOT_PAUSED = false;
const IS_PAUSED = true;

test('Off', () => {
  expect(prettyInterval(IS_NOT_PAUSED, 0)).toBe('Off');
  expect(prettyInterval(IS_PAUSED, 1000)).toBe('Off');
});

test('seconds', () => {
  expect(prettyInterval(IS_NOT_PAUSED, 1000)).toBe('1 second');
  expect(prettyInterval(IS_NOT_PAUSED, 15000)).toBe('15 seconds');
});

test('minutes', () => {
  expect(prettyInterval(IS_NOT_PAUSED, 60000)).toBe('1 minute');
  expect(prettyInterval(IS_NOT_PAUSED, 1800000)).toBe('30 minutes');
});

test('hours', () => {
  expect(prettyInterval(IS_NOT_PAUSED, 3600000)).toBe('1 hour');
  expect(prettyInterval(IS_NOT_PAUSED, 43200000)).toBe('12 hours');
});

test('days', () => {
  expect(prettyInterval(IS_NOT_PAUSED, 86400000)).toBe('1 day');
  expect(prettyInterval(IS_NOT_PAUSED, 86400000 * 2)).toBe('2 days');
});
