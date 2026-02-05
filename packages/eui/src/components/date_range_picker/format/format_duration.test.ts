/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { durationToDisplayShortText, MS_PER } from './format_duration';

describe('durationToDisplayShortText', () => {
  it('formats basic durations', () => {
    const start = new Date(0);

    expect(durationToDisplayShortText(start, new Date(100))).toBe('100ms');
    expect(durationToDisplayShortText(start, new Date(5 * MS_PER.second))).toBe(
      '5s'
    );
    expect(
      durationToDisplayShortText(start, new Date(15 * MS_PER.minute))
    ).toBe('15min');
    expect(durationToDisplayShortText(start, new Date(12 * MS_PER.hour))).toBe(
      '12h'
    );
    expect(durationToDisplayShortText(start, new Date(48 * MS_PER.hour))).toBe(
      '2d'
    );
    expect(durationToDisplayShortText(start, new Date(3 * MS_PER.day))).toBe(
      '3d'
    );
    expect(durationToDisplayShortText(start, new Date(2 * MS_PER.week))).toBe(
      '2w'
    );
    expect(durationToDisplayShortText(start, new Date(4 * MS_PER.month))).toBe(
      '4mos'
    );
    expect(durationToDisplayShortText(start, new Date(1 * MS_PER.year))).toBe(
      '1y'
    );
  });

  it('adds approximation tilde (when -> TBD)', () => {
    const start = new Date(0);

    expect(
      durationToDisplayShortText(start, new Date(60 * MS_PER.second))
    ).toBe('1min');
    expect(
      durationToDisplayShortText(
        start,
        new Date(60 * MS_PER.second + 1 * MS_PER.second)
      )
    ).toBe('~1min');

    // TODO once approximation logic is final
  });
});
