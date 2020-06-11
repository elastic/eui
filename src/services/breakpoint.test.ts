/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { getBreakpoint, EuiBreakpoints } from './breakpoint';

describe('getBreakpoint', () => {
  describe('default BREAKPOINTS', () => {
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

  const CUSTOM_BREAKPOINTS: EuiBreakpoints = {
    xl: 1400,
    l: 1078,
    m: 812,
    s: 667,
    xs: 320,
  };

  describe('custom breakpoints', () => {
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
