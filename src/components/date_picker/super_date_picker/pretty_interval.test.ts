/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../../test/internal';

import { usePrettyInterval } from './pretty_interval';

const IS_NOT_PAUSED = false;
const IS_PAUSED = true;
const SHORT_HAND = true;

describe('usePrettyInterval', () => {
  test('off', () => {
    expect(
      testCustomHook(() => usePrettyInterval(IS_NOT_PAUSED, 0)).return
    ).toBe('Off');
    expect(
      testCustomHook(() => usePrettyInterval(IS_PAUSED, 1000)).return
    ).toBe('Off');
  });

  test('seconds', () => {
    expect(
      testCustomHook(() => usePrettyInterval(IS_NOT_PAUSED, 1000)).return
    ).toBe('1 second');
    expect(
      testCustomHook(() => usePrettyInterval(IS_NOT_PAUSED, 15000)).return
    ).toBe('15 seconds');
    expect(
      testCustomHook(() => usePrettyInterval(IS_NOT_PAUSED, 15000, SHORT_HAND))
        .return
    ).toBe('15 s');
  });

  test('minutes', () => {
    expect(
      testCustomHook(() => usePrettyInterval(IS_NOT_PAUSED, 60000)).return
    ).toBe('1 minute');
    expect(
      testCustomHook(() => usePrettyInterval(IS_NOT_PAUSED, 1800000)).return
    ).toBe('30 minutes');
    expect(
      testCustomHook(() =>
        usePrettyInterval(IS_NOT_PAUSED, 1800000, SHORT_HAND)
      ).return
    ).toBe('30 m');
  });

  test('hours', () => {
    expect(
      testCustomHook(() => usePrettyInterval(IS_NOT_PAUSED, 3600000)).return
    ).toBe('1 hour');
    expect(
      testCustomHook(() => usePrettyInterval(IS_NOT_PAUSED, 43200000)).return
    ).toBe('12 hours');
    expect(
      testCustomHook(() =>
        usePrettyInterval(IS_NOT_PAUSED, 43200000, SHORT_HAND)
      ).return
    ).toBe('12 h');
  });

  test('days', () => {
    expect(
      testCustomHook(() => usePrettyInterval(IS_NOT_PAUSED, 86400000)).return
    ).toBe('1 day');
    expect(
      testCustomHook(() => usePrettyInterval(IS_NOT_PAUSED, 86400000 * 2))
        .return
    ).toBe('2 days');
    expect(
      testCustomHook(() =>
        usePrettyInterval(IS_NOT_PAUSED, 86400000, SHORT_HAND)
      ).return
    ).toBe('1 d');
  });
});
