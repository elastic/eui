/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
