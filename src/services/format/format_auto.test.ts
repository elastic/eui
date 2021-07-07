/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
