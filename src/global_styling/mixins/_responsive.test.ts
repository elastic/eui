/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../test/internal';
import { EuiThemeBreakpoints, _EuiThemeBreakpoint } from '../variables';
import { useEuiBreakpoint } from './_responsive';

describe('useEuiBreakpoint', () => {
  describe('common breakpoint size arrays', () => {
    const possibleTwoElementBreakpointCombinations = [];
    for (let i = 0; i < EuiThemeBreakpoints.length; i++) {
      for (let j = 1; j < EuiThemeBreakpoints.length; j++) {
        if (j > i) {
          possibleTwoElementBreakpointCombinations.push([
            `${EuiThemeBreakpoints[i]}`,
            `${EuiThemeBreakpoints[j]}`,
          ]);
        }
      }
    }

    test.each(possibleTwoElementBreakpointCombinations)(
      'returns a media query for two element breakpoint combinations (%s and %s)',
      (minSize, maxSize) => {
        expect(
          testCustomHook(() =>
            useEuiBreakpoint([
              minSize as _EuiThemeBreakpoint,
              maxSize as _EuiThemeBreakpoint,
            ])
          ).return
        ).toMatchSnapshot();
      }
    );
  });

  describe('single breakpoint sizes', () => {
    EuiThemeBreakpoints.forEach((size) => {
      test(`(${size})`, () => {
        expect(
          testCustomHook(() => useEuiBreakpoint([size])).return
        ).toMatchSnapshot();
      });
    });
  });

  describe('breakpoint size arrays with more than 2 sizes', () => {
    it('should use the first and last items in the array', () => {
      expect(
        testCustomHook(() => useEuiBreakpoint(['s', 'm', 'l'])).return
      ).toMatchInlineSnapshot(
        '"@media only screen and (min-width: 575px) and (max-width: 1199px)"'
      );
    });

    it('handles sorting the array if sizes are passed in the wrong order', () => {
      expect(
        testCustomHook(() => useEuiBreakpoint(['l', 's', 'm'])).return
      ).toMatchInlineSnapshot(
        '"@media only screen and (min-width: 575px) and (max-width: 1199px)"'
      );
    });
  });

  it('does not generate a min-width if the min size is xs', () => {
    expect(
      testCustomHook(() => useEuiBreakpoint(['xs', 'm'])).return
    ).toMatchInlineSnapshot('"@media only screen and (max-width: 991px)"');
  });

  it('skips generating a max-width if the max size is xl', () => {
    expect(
      testCustomHook(() => useEuiBreakpoint(['m', 'xl'])).return
    ).toMatchInlineSnapshot('"@media only screen and (min-width: 768px)"');
  });

  describe('fallback behavior', () => {
    const fallbackOutput = '@media only screen';

    test('if at least one input is not passed', () => {
      // @ts-expect-error Source has 0 element(s) but target requires 1
      expect(testCustomHook(() => useEuiBreakpoint([])).return).toEqual(
        fallbackOutput
      );
    });

    test('if a breakpoint key without a corresponding value is passed', () => {
      expect(testCustomHook(() => useEuiBreakpoint(['asdf'])).return).toEqual(
        fallbackOutput
      );
    });
  });
});
