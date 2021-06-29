/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { relativeUnitsFromLargestToSmallest } from './relative_options';

describe('relativeUnitsFromLargestToSmallest', () => {
  test('relativeUnitsFromLargestToSmallest length', () => {
    expect(relativeUnitsFromLargestToSmallest.length).toBe(7);
  });
  test('relativeUnitsFromLargestToSmallest order', () => {
    expect(relativeUnitsFromLargestToSmallest).toEqual([
      'y',
      'M',
      'w',
      'd',
      'h',
      'm',
      's',
    ]);
  });
});
