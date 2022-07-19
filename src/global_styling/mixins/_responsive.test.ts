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
      'useEuiBreakpoint returns a media query for two element breakpoint combinations (%s and %s)',
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

  describe('0 as a first argument should not render a min-width query', () => {
    EuiThemeBreakpoints.forEach((size) => {
      test(`(0 and ${size})`, () => {
        expect(
          testCustomHook(() => useEuiBreakpoint([0, size])).return
        ).toMatchSnapshot();
      });
    });
  });

  describe('Infinity as a last argument should not render a max-width query', () => {
    EuiThemeBreakpoints.forEach((size) => {
      test(`(${size} and Infinity)`, () => {
        expect(
          testCustomHook(() => useEuiBreakpoint([size, Infinity])).return
        ).toMatchSnapshot();
      });
    });
  });

  describe('breakpoint size arrays with more than 2 sizes', () => {
    it('should use the first and last items in the array', () => {
      expect(
        testCustomHook(() => useEuiBreakpoint(['s', 'm', 'l'])).return
      ).toMatchSnapshot();
    });
  });

  describe('single breakpoint sizes should infer the next breakpoint size as max-width', () => {
    EuiThemeBreakpoints.forEach((size) => {
      test(`${size}`, () => {
        expect(
          testCustomHook(() => useEuiBreakpoint([size])).return
        ).toMatchSnapshot();
      });
    });
  });

  describe('invalid arguments', () => {
    const fallbackOutput = '@media only screen';

    const oldConsoleError = console.warn;
    let consoleStub: jest.Mock;
    beforeEach(() => {
      console.warn = consoleStub = jest.fn();
    });
    afterEach(() => {
      console.warn = oldConsoleError;
    });

    describe('invalid array sizes', () => {
      afterEach(() => {
        expect(consoleStub).toHaveBeenCalledTimes(1);
        expect(consoleStub).toHaveBeenLastCalledWith(
          'Pass more than one breakpoint size'
        );
      });

      it('empty array', () => {
        expect(testCustomHook(() => useEuiBreakpoint([])).return).toEqual(
          fallbackOutput
        );
      });

      it('invalid single non-breakpoint size', () => {
        expect(testCustomHook(() => useEuiBreakpoint([0])).return).toEqual(
          fallbackOutput
        );
      });

      it('invalid single non-breakpoint size', () => {
        expect(
          testCustomHook(() => useEuiBreakpoint([Infinity])).return
        ).toEqual(fallbackOutput);
      });
    });

    describe('invalid breakpoint keys', () => {
      afterEach(() => {
        expect(consoleStub).toHaveBeenCalledTimes(2);
        expect(consoleStub).toHaveBeenCalledWith(
          'Invalid min-width breakpoint size passed'
        );
        expect(consoleStub).toHaveBeenCalledWith(
          'Invalid max-width breakpoint size passed'
        );
      });

      it('warns when invalid size key strings are passed', () => {
        expect(
          // @ts-expect-error deliberate incorrect type
          testCustomHook(() => useEuiBreakpoint(['teeny-tiny', 'SUPERMASSIVE']))
            .return
        ).toEqual(fallbackOutput);
      });

      it('warns when invalid size numbers are passed', () => {
        expect(
          testCustomHook(() => useEuiBreakpoint([100, 400])).return // we might support this someday, but today is not that day
        ).toEqual(fallbackOutput);
      });

      it('warns when 0 and Infinity are used in the wrong position', () => {
        expect(
          testCustomHook(() => useEuiBreakpoint([Infinity, 0])).return
        ).toEqual(fallbackOutput);
      });
    });

    describe('invalid breakpoint size order', () => {
      afterEach(() => {
        expect(consoleStub).toHaveBeenCalledTimes(1);
        expect(consoleStub).toHaveBeenLastCalledWith(
          'Invalid breakpoint sizes passed. The first size should be smaller than the last size'
        );
      });

      it('warns if min breakpoint is not smaller than the max breakpoint', () => {
        expect(
          testCustomHook(() => useEuiBreakpoint(['xl', 'xs'])).return
        ).toEqual(fallbackOutput);
      });

      it('warns if the min/max breakpoints are equal', () => {
        expect(
          testCustomHook(() => useEuiBreakpoint(['s', 's'])).return
        ).toEqual(fallbackOutput);
      });
    });

    describe('valid but funky breakpoint combos', () => {
      afterEach(() => {
        expect(consoleStub).not.toHaveBeenCalled();
      });

      test('0 and xs', () => {
        // Since xs is (currently) already 0, this should output nothing
        expect(
          testCustomHook(() => useEuiBreakpoint([0, 'xs'])).return
        ).toEqual(fallbackOutput);
      });

      test('xs and infinity', () => {
        // Since xs is (currently) 0, there should be no min or max width
        expect(
          testCustomHook(() => useEuiBreakpoint(['xs', Infinity])).return
        ).toEqual(fallbackOutput);
      });
    });
  });
});
