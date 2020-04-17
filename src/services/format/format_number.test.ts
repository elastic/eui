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

import { formatNumber } from './format_number';

describe('formatNumber', () => {
  const value = 1234.5678;

  test('no config', () => {
    expect(formatNumber(value)).toBe(value.toString());
  });

  test('with config - "decimal1" format', () => {
    expect(formatNumber(value, 'decimal1')).toBe('1,234.5');
  });

  test('with config - "decimal1" format - rounded', () => {
    expect(formatNumber(value, { format: 'decimal1', round: true })).toBe(
      '1,234.6'
    );
  });

  test('with config - "decimal2" format', () => {
    expect(formatNumber(value, 'decimal2')).toBe('1,234.56');
  });

  test('with config - "decimal2" format - rounded', () => {
    expect(formatNumber(value, { format: 'decimal2', round: true })).toBe(
      '1,234.57'
    );
  });

  test('with config - "decimal3" format', () => {
    expect(formatNumber(value, 'decimal3')).toBe('1,234.567');
  });

  test('with config - "decimal3" format - rounded', () => {
    expect(formatNumber(value, { format: 'decimal3', round: true })).toBe(
      '1,234.568'
    );
  });

  test('with config - "ordinal" format', () => {
    expect(formatNumber(1, 'ordinal')).toBe('1st');
    expect(formatNumber(132, 'ordinal')).toBe('132nd');
    expect(formatNumber(89, 'ordinal')).toBe('89th');
    expect(formatNumber(23, 'ordinal')).toBe('23rd');
  });

  test('with config - "integer" format', () => {
    expect(formatNumber(value, 'integer')).toBe('1,234');
  });
});
