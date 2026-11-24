/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { getVisibleCount } from './get_visible_count';

describe('getVisibleCount', () => {
  // The last visible pill needs: available - previous pills - badge (if pills
  // are hidden) - gaps (8 per pill and badge) - input
  const base = { gap: 8, badgeWidth: 40, inputWidth: 12, pillMinWidth: 64 };

  it('shows every pill when they all fit', () => {
    expect(
      getVisibleCount({ ...base, widths: [100, 100], available: 300 })
    ).toBe(2);
  });

  it('truncates the last pill when it only partly fits', () => {
    // 250 - 100 - 16 (gaps) - 12 (input) = 122 left for a 200px pill
    expect(
      getVisibleCount({ ...base, widths: [100, 200], available: 250 })
    ).toBe(2);
  });

  it('shows all pills with a truncated last one, without a badge, if it keeps the minimum width', () => {
    // 300 - 200 - 24 - 12 = 64 left for the third pill
    expect(
      getVisibleCount({ ...base, widths: [100, 100, 100], available: 300 })
    ).toBe(3);
  });

  it('folds pills into the badge once the last one would drop below the minimum width', () => {
    // 3 pills: 299 - 200 - 24 - 12 = 63 < 64. 2 pills + badge: 299 - 100 - 40 - 24 - 12 = 123
    expect(
      getVisibleCount({ ...base, widths: [100, 100, 100], available: 299 })
    ).toBe(2);
  });

  it('hides more pills when there is less room', () => {
    // 2 pills + badge: 200 - 100 - 40 - 24 - 12 = 24 < 64. 1 pill + badge: 132
    expect(
      getVisibleCount({ ...base, widths: [100, 100, 100], available: 200 })
    ).toBe(1);
  });

  it('truncates a lone pill that is too wide', () => {
    expect(getVisibleCount({ ...base, widths: [500], available: 200 })).toBe(1);
  });

  it('shows no pill when not even a truncated one fits next to the badge', () => {
    // 1 pill + badge: 100 - 40 - 16 - 12 = 32 < 64
    expect(
      getVisibleCount({ ...base, widths: [500, 500], available: 100 })
    ).toBe(0);
  });

  it('returns 0 without pills', () => {
    expect(getVisibleCount({ ...base, widths: [], available: 500 })).toBe(0);
  });
});
