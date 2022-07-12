/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../test/internal';
import {
  useEuiBreakpoint,
  useEuiBreakpointMin,
  useEuiBreakpointMax,
} from './_responsive';
import { BREAKPOINT_KEYS } from '../../services';

//let breakpointKeys = BREAKPOINT_KEYS.reverse();
describe('useEuiBreakpoint returns a media query', () => {
  describe('when a single breakpoint is provided', () => {
    BREAKPOINT_KEYS.forEach((size) => {
      it(size, () => {
        expect(
          testCustomHook(() => useEuiBreakpoint([size])).return
        ).toMatchSnapshot();
      });
    });
  });

  describe('when two breakpoints are provided', () => {
    // Loop though breakpoint sizes from smallest to largest skipping instances where the sizes matach (i.e. ['s','s'])
    // and instances where the first size is larger than the second (i.e. ['l', 'xs'])

    it('xs - s', () => {
      expect(
        testCustomHook(() => useEuiBreakpoint(['xs', 's'])).return
      ).toMatchSnapshot();
    });

    it('xs - m', () => {
      expect(
        testCustomHook(() => useEuiBreakpoint(['xs', 'm'])).return
      ).toMatchSnapshot();
    });

    it('xs - l', () => {
      expect(
        testCustomHook(() => useEuiBreakpoint(['xs', 'l'])).return
      ).toMatchSnapshot();
    });

    it('xs - xl', () => {
      expect(
        testCustomHook(() => useEuiBreakpoint(['xs', 'xl'])).return
      ).toMatchSnapshot();
    });

    it('s - m', () => {
      expect(
        testCustomHook(() => useEuiBreakpoint(['s', 'm'])).return
      ).toMatchSnapshot();
    });

    it('s - l', () => {
      expect(
        testCustomHook(() => useEuiBreakpoint(['s', 'l'])).return
      ).toMatchSnapshot();
    });

    it('s - xl', () => {
      expect(
        testCustomHook(() => useEuiBreakpoint(['s', 'xl'])).return
      ).toMatchSnapshot();
    });

    it('m - l', () => {
      expect(
        testCustomHook(() => useEuiBreakpoint(['m', 'l'])).return
      ).toMatchSnapshot();
    });

    it('m - xl', () => {
      expect(
        testCustomHook(() => useEuiBreakpoint(['m', 'xl'])).return
      ).toMatchSnapshot();
    });

    it('l - xl', () => {
      expect(
        testCustomHook(() => useEuiBreakpoint(['l', 'xl'])).return
      ).toMatchSnapshot();
    });
  });
});

describe('useEuiBreakpointMin returns a min-width media query', () => {
  BREAKPOINT_KEYS.forEach((size) => {
    it(size, () => {
      expect(
        testCustomHook(() => useEuiBreakpointMin(size)).return
      ).toMatchSnapshot();
    });
  });
});

describe('useEuiBreakpointMin returns a max-width media query', () => {
  BREAKPOINT_KEYS.forEach((size) => {
    it(size, () => {
      expect(
        testCustomHook(() => useEuiBreakpointMax(size)).return
      ).toMatchSnapshot();
    });
  });
});
