/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { keysOf } from '../components/common';

export type EuiBreakpointSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export type EuiBreakpoints = {
  /**
   * Set the minimum window width at which to start to the breakpoint
   */
  [key in EuiBreakpointSize]: number;
};

export const BREAKPOINTS: EuiBreakpoints = {
  xl: 1200,
  l: 992,
  m: 768,
  s: 575,
  xs: 0,
};

export const BREAKPOINT_KEYS = keysOf(BREAKPOINTS);

/**
 * Given the current `width` and an object of `EuiBreakpoints`,
 * this function returns the string that is the name of the breakpoint key
 * that is less than or equal to the width
 *
 * @param {number} width Can either be the full window width or any width
 * @param {EuiBreakpoints} breakpoints An object with keys for sizing and values for minimum width
 * @returns {string | undefined} Name of the breakpoint key or `undefined` if a key doesn't exist
 */
export function getBreakpoint(
  width: number,
  breakpoints: EuiBreakpoints = BREAKPOINTS
): EuiBreakpointSize | undefined {
  // Find the breakpoint (key) whose value is <= windowWidth starting with largest first
  return keysOf(BREAKPOINTS).find((key) => breakpoints[key] <= width);
}

/**
 * Given the current `width` and a max breakpoint key,
 * this function returns true or false if the `width` falls within the max
 * breakpoint or any breakpoints below
 *
 * @param {number} width Can either be the full window width or any width
 * @param {EuiBreakpointSize | number} max The named breakpoint or custom number to check against
 * @param {EuiBreakpoints} breakpoints An object with keys for sizing and values for minimum width
 * @returns {boolean} Will return `false` if it can't find a value for the `max` breakpoint
 */
export function isWithinMaxBreakpoint(
  width: number,
  max: EuiBreakpointSize | number,
  breakpoints: EuiBreakpoints = BREAKPOINTS
): boolean {
  if (typeof max === 'number') {
    return width <= max;
  } else {
    const currentBreakpoint = getBreakpoint(width, breakpoints);
    return currentBreakpoint
      ? breakpoints[currentBreakpoint] <= breakpoints[max]
      : false;
  }
}

/**
 * Given the current `width` and a max breakpoint key,
 * this function returns true or false if the `width` falls within the max
 * breakpoint or any breakpoints below
 *
 * @param {number} width Can either be the full window width or any width
 * @param {EuiBreakpointSize | number} min The named breakpoint or custom number to check against
 * @param {EuiBreakpoints} breakpoints An object with keys for sizing and values for minimum width
 * @returns {boolean} Will return `false` if it can't find a value for the `min` breakpoint
 */
export function isWithinMinBreakpoint(
  width: number,
  min: EuiBreakpointSize | number,
  breakpoints: EuiBreakpoints = BREAKPOINTS
): boolean {
  if (typeof min === 'number') {
    return width >= min;
  } else {
    const currentBreakpoint = getBreakpoint(width, breakpoints);
    return currentBreakpoint
      ? breakpoints[currentBreakpoint] >= breakpoints[min]
      : false;
  }
}

/**
 * Given the current `width` and an array of breakpoint keys,
 * this function returns true or false if the `width` falls within
 * any of the named breakpoints
 *
 * @param {number} width Can either be the full window width or any width
 * @param {EuiBreakpointSize[]} sizes An array of named breakpoints
 * @param {EuiBreakpoints} breakpoints An object with keys for sizing and values for minimum width
 * @returns {boolean} Returns `true` if current breakpoint name is included in `sizes`
 */
export function isWithinBreakpoints(
  width: number,
  sizes: EuiBreakpointSize[],
  breakpoints: EuiBreakpoints = BREAKPOINTS
): boolean {
  const currentBreakpoint = getBreakpoint(width, breakpoints);
  return currentBreakpoint ? sizes.includes(currentBreakpoint) : false;
}
