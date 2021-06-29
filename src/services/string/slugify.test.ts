/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { slugify } from './slugify';

describe('slugify', () => {
  const STRINGS = [
    'Single',
    'Two words',
    'More Than Two Words',
    'lowercase words',
  ];

  const SLUGIFIED = [
    'single',
    'two-words',
    'more-than-two-words',
    'lowercase-words',
  ];

  STRINGS.forEach((string, index) => {
    it(`should a lowercased, hypened string '${string}'`, () => {
      expect(slugify(string)).toBe(SLUGIFIED[index]);
    });
  });
});
