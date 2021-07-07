/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  getBreakpoint,
  EuiBreakpoints,
  isWithinMaxBreakpoint,
  isWithinBreakpoints,
} from './breakpoint';

const CUSTOM_BREAKPOINTS: EuiBreakpoints = {
  xl: 1400,
  l: 1078,
  m: 812,
  s: 667,
  xs: 320,
};

describe('getBreakpoint', () => {
  describe('with default BREAKPOINTS', () => {
    it("should return 'xs' for 320", () => {
      expect(getBreakpoint(320)).toBe('xs');
    });
    it("should return 's' for 667", () => {
      expect(getBreakpoint(667)).toBe('s');
    });
    it("should return 'm' for 812", () => {
      expect(getBreakpoint(812)).toBe('m');
    });
    it("should return 'l' for 1078", () => {
      expect(getBreakpoint(1078)).toBe('l');
    });
    it("should return 'xl' for 1400", () => {
      expect(getBreakpoint(1400)).toBe('xl');
    });
  });

  describe('with custom breakpoints', () => {
    it("should return 'undefined' for 240", () => {
      expect(getBreakpoint(240, CUSTOM_BREAKPOINTS)).toBe(undefined);
    });
    it("should return 'xs' for 575", () => {
      expect(getBreakpoint(575, CUSTOM_BREAKPOINTS)).toBe('xs');
    });
    it("should return 's' for 768", () => {
      expect(getBreakpoint(768, CUSTOM_BREAKPOINTS)).toBe('s');
    });
    it("should return 'm' for 992", () => {
      expect(getBreakpoint(992, CUSTOM_BREAKPOINTS)).toBe('m');
    });
    it("should return 'l' for 1200", () => {
      expect(getBreakpoint(1200, CUSTOM_BREAKPOINTS)).toBe('l');
    });
    it("should return 'xl' for 1400", () => {
      expect(getBreakpoint(1400, CUSTOM_BREAKPOINTS)).toBe('xl');
    });
  });
});

describe('isWithinMaxBreakpoint', () => {
  describe('with default BREAKPOINTS', () => {
    it("should return 'true' for 'xs' and 320", () => {
      expect(isWithinMaxBreakpoint(320, 'xs')).toBe(true);
    });
    it("should return 'true' for 's' and 667", () => {
      expect(isWithinMaxBreakpoint(667, 's')).toBe(true);
    });
    it("should return 'true' for 'm' and 812", () => {
      expect(isWithinMaxBreakpoint(812, 'm')).toBe(true);
    });
    it("should return 'true' for 'l' and 1078", () => {
      expect(isWithinMaxBreakpoint(1078, 'l')).toBe(true);
    });
    it("should return 'true' for 'xl' and 1400", () => {
      expect(isWithinMaxBreakpoint(1400, 'xl')).toBe(true);
    });
  });

  describe('with custom breakpoints', () => {
    it("should return 'false' for 'xs' and 240", () => {
      expect(isWithinMaxBreakpoint(240, 'xs', CUSTOM_BREAKPOINTS)).toBe(false);
    });
    it("should return 'true' for 'xs' and 575", () => {
      expect(isWithinMaxBreakpoint(575, 'xs', CUSTOM_BREAKPOINTS)).toBe(true);
    });
    it("should return 'true' for 's' and 768", () => {
      expect(isWithinMaxBreakpoint(768, 's', CUSTOM_BREAKPOINTS)).toBe(true);
    });
    it("should return 'true' for 'm' and 992", () => {
      expect(isWithinMaxBreakpoint(992, 'm', CUSTOM_BREAKPOINTS)).toBe(true);
    });
    it("should return 'true' for 'l' and 1200", () => {
      expect(isWithinMaxBreakpoint(1200, 'l', CUSTOM_BREAKPOINTS)).toBe(true);
    });
    it("should return 'true' for 'xl' and 1400", () => {
      expect(isWithinMaxBreakpoint(1400, 'xl', CUSTOM_BREAKPOINTS)).toBe(true);
    });
  });

  describe('with max as a number', () => {
    it("should return 'true' for a 320 width and a '480' max", () => {
      expect(isWithinMaxBreakpoint(320, 480)).toBe(true);
    });
  });

  describe('isWithinBreakpoints', () => {
    describe('with default BREAKPOINTS', () => {
      it("should return 'true' for 'xs' and 320", () => {
        expect(isWithinBreakpoints(320, ['xs'])).toBe(true);
      });
      it("should return 'true' for 's' and 667", () => {
        expect(isWithinBreakpoints(667, ['s'])).toBe(true);
      });
      it("should return 'true' for 'm' and 812", () => {
        expect(isWithinBreakpoints(812, ['m'])).toBe(true);
      });
      it("should return 'true' for 'l' and 1078", () => {
        expect(isWithinBreakpoints(1078, ['l'])).toBe(true);
      });
      it("should return 'true' for 'xl' and 1400", () => {
        expect(isWithinBreakpoints(1400, ['xl'])).toBe(true);
      });
    });

    describe('with custom breakpoints', () => {
      it("should return 'false' for 'xs' and 240", () => {
        expect(isWithinBreakpoints(240, ['xs'], CUSTOM_BREAKPOINTS)).toBe(
          false
        );
      });
      it("should return 'true' for 'xs' and 575", () => {
        expect(isWithinBreakpoints(575, ['xs'], CUSTOM_BREAKPOINTS)).toBe(true);
      });
      it("should return 'true' for 's' and 768", () => {
        expect(isWithinBreakpoints(768, ['s'], CUSTOM_BREAKPOINTS)).toBe(true);
      });
      it("should return 'true' for 'm' and 992", () => {
        expect(isWithinBreakpoints(992, ['m'], CUSTOM_BREAKPOINTS)).toBe(true);
      });
      it("should return 'true' for 'l' and 1200", () => {
        expect(isWithinBreakpoints(1200, ['l'], CUSTOM_BREAKPOINTS)).toBe(true);
      });
      it("should return 'true' for 'xl' and 1400", () => {
        expect(isWithinBreakpoints(1400, ['xl'], CUSTOM_BREAKPOINTS)).toBe(
          true
        );
      });
    });

    describe('with multiple sizes', () => {
      it("should return 'true' for a 667 width and ['xs', 's']", () => {
        expect(isWithinBreakpoints(667, ['xs', 's'])).toBe(true);
      });
    });
  });
});
