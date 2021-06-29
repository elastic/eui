/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { formatBoolean } from './format_boolean';

describe('formatBoolean', () => {
  test('no config', () => {
    expect(formatBoolean(true)).toBe('Yes');
    expect(formatBoolean(false)).toBe('No');
  });

  test('with config', () => {
    const config = { yes: 'Aye', no: 'Nay' };
    expect(formatBoolean(true, config)).toBe('Aye');
    expect(formatBoolean(false, config)).toBe('Nay');
  });
});
