/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { formatText } from './format_text';

describe('formatText', () => {
  test('no config - not nil value', () => {
    expect(formatText('abc')).toBe('abc');
    expect(formatText(1)).toBe('1');
    const now = Date.now();
    expect(formatText(new Date(now))).toBe(new Date(now).toString());
    expect(
      formatText({
        /* simple object */
      })
    ).toBe('[object Object]');
  });

  test('no config - nil value', () => {
    expect(formatText()).toBe('');
    expect(formatText(null)).toBe('');
  });

  test('with config - nil value', () => {
    expect(formatText(undefined, { nil: '-' })).toBe('-');
    expect(formatText(null, { nil: '-' })).toBe('-');
  });
});
