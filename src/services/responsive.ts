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

interface EuiBreakpoint {
  min: number;
  max: number;
}

export type EuiBreakpoints = {
  /**
   * Usually small handheld devices.
   * `min` & `max` required
   */
  xs: EuiBreakpoint;
  /**
   * Up to portrait rotation of tabled devices.
   * `min` & `max` required
   */
  s: EuiBreakpoint;
  /**
   * Transitional breakpoint between handleds and laptops.
   * `min` & `max` required
   */
  m: EuiBreakpoint;
  /**
   * Up to a small laptop screen.
   * Everything above is considered `xl`.
   * `min` & `max` required
   */
  l: EuiBreakpoint;
};

export const BREAKPOINTS: EuiBreakpoints = {
  xs: {
    min: 0,
    max: 574,
  },
  s: {
    min: 575,
    max: 767,
  },
  m: {
    min: 768,
    max: 991,
  },
  l: {
    min: 992,
    max: 1199,
  },
};

export function getBreakpoint(
  windowWidth: number,
  breakpoints: EuiBreakpoints = BREAKPOINTS
) {
  if (windowWidth <= breakpoints.xs.max) {
    return 'xs';
  } else if (windowWidth <= breakpoints.s.max) {
    return 's';
  } else if (windowWidth <= breakpoints.m.max) {
    return 'm';
  } else if (windowWidth <= breakpoints.l.max) {
    return 'l';
  } else {
    return 'xl';
  }
}
