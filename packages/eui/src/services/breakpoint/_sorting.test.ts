/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  sortMapByLargeToSmallValues,
  sortMapBySmallToLargeValues,
} from './_sorting';

describe('sortMapByLargeToSmallValues', () => {
  it('sorts an object by its values from largest to smallest', () => {
    expect(
      sortMapByLargeToSmallValues({
        medium: 10,
        large: 30,
        small: 5,
      } as any)
    ).toEqual({
      large: 30,
      medium: 10,
      small: 5,
    });
  });
});

describe('sortMapBySmallToLargeValues', () => {
  it('sorts an object by its values from small to largest', () => {
    expect(
      sortMapBySmallToLargeValues({
        large: 100,
        medium: 10,
        small: 1,
      } as any)
    ).toEqual({
      small: 1,
      medium: 10,
      large: 100,
    });
  });
});
