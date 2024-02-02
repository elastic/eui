/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, renderHook } from '../../../test/rtl';

import {
  usePrettyDuration,
  PrettyDuration,
  showPrettyDuration,
  useFormatTimeString,
} from './pretty_duration';

const dateFormat = 'MMMM Do YYYY, HH:mm:ss.SSS';
const quickRanges = [
  {
    start: 'now-15m',
    end: 'now',
    label: 'quick range 15 minutes custom display',
  },
];

describe('usePrettyDuration', () => {
  test('quick range', () => {
    const timeFrom = 'now-15m';
    const timeTo = 'now';
    expect(
      renderHook(() =>
        usePrettyDuration({ timeFrom, timeTo, quickRanges, dateFormat })
      ).result.current
    ).toBe('quick range 15 minutes custom display');
  });

  test('last', () => {
    const timeFrom = 'now-16m';
    const timeTo = 'now';
    expect(
      renderHook(() =>
        usePrettyDuration({ timeFrom, timeTo, quickRanges, dateFormat })
      ).result.current
    ).toBe('Last 16 minutes');
  });

  test('last that is rounded', () => {
    const timeFrom = 'now-1M/w';
    const timeTo = 'now';
    expect(
      renderHook(() =>
        usePrettyDuration({ timeFrom, timeTo, quickRanges, dateFormat })
      ).result.current
    ).toBe('Last 1 month rounded to the week');
  });

  test('next', () => {
    const timeFrom = 'now';
    const timeTo = 'now+16m';
    expect(
      renderHook(() =>
        usePrettyDuration({ timeFrom, timeTo, quickRanges, dateFormat })
      ).result.current
    ).toBe('Next 16 minutes');
  });

  test('from is in past', () => {
    const timeFrom = 'now-17m';
    const timeTo = 'now-15m';
    expect(
      renderHook(() =>
        usePrettyDuration({ timeFrom, timeTo, quickRanges, dateFormat })
      ).result.current
    ).toBe('~ 17 minutes ago to ~ 15 minutes ago');
  });
});

describe('PrettyDuration', () => {
  it('renders the returned string from usePrettyDuration', () => {
    const { container } = render(
      <PrettyDuration
        timeFrom="now"
        timeTo="now+15m"
        quickRanges={quickRanges}
        dateFormat={dateFormat}
      />
    );
    expect(container.firstChild).toMatchInlineSnapshot(`Next 15 minutes`);
  });
});

describe('showPrettyDuration', () => {
  test('should show pretty duration for quick range', () => {
    expect(showPrettyDuration('now-15m', 'now', quickRanges)).toBe(true);
  });

  test('should show pretty duration for last', () => {
    expect(showPrettyDuration('now-17m', 'now', quickRanges)).toBe(true);
  });

  test('should show pretty duration for next', () => {
    expect(showPrettyDuration('now', 'now+17m', quickRanges)).toBe(true);
  });

  test('should not show pretty duration for relative to relative', () => {
    expect(showPrettyDuration('now-17m', 'now-3m', quickRanges)).toBe(false);
  });

  test('should not show pretty duration for absolute to absolute', () => {
    expect(
      showPrettyDuration(
        '2018-01-17T18:57:57.149Z',
        '2018-01-17T20:00:00.000Z',
        quickRanges
      )
    ).toBe(false);
  });

  test('should not show pretty duration for absolute to now', () => {
    expect(
      showPrettyDuration('2018-01-17T18:57:57.149Z', 'now', quickRanges)
    ).toBe(false);
  });
});

describe('useFormatTimeString', () => {
  it('it takes a time string and formats it into a humanized date', () => {
    expect(
      renderHook(() => useFormatTimeString('now-3s', dateFormat)).result.current
    ).toEqual('~ a few seconds ago');
    expect(
      renderHook(() => useFormatTimeString('now+1m', dateFormat)).result.current
    ).toEqual('~ in a minute');
    expect(
      renderHook(() => useFormatTimeString('now+100w', dateFormat)).result
        .current
    ).toEqual('~ in 2 years');
  });

  it("always parses the 'now' string as-is", () => {
    expect(
      renderHook(() => useFormatTimeString('now', dateFormat)).result.current
    ).toEqual('now');
  });

  describe('options', () => {
    test('locale', () => {
      expect(
        renderHook(() =>
          useFormatTimeString('now+15m', dateFormat, { locale: 'ja' })
        ).result.current
      ).toBe('~ 15分後');
    });

    describe('canRoundRelativeUnits', () => {
      const option = { canRoundRelativeUnits: false };

      it("allows skipping moment.fromNow()'s default rounding", () => {
        expect(
          renderHook(() => useFormatTimeString('now-3s', dateFormat, option))
            .result.current
        ).toEqual('3 seconds ago');
        expect(
          renderHook(() => useFormatTimeString('now+1m', dateFormat, option))
            .result.current
        ).toEqual('in a minute');
        expect(
          renderHook(() => useFormatTimeString('now+100w', dateFormat, option))
            .result.current
        ).toEqual('in 100 weeks');
      });
    });
  });
});
