/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { getBreakpoint } from './breakpoint';

const CUSTOM_BREAKPOINTS = {
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
