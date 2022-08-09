/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { keysOf } from '../../components/common';

import {
  _EuiThemeBreakpoint,
  _EuiThemeBreakpoints,
} from '../../global_styling/variables/breakpoint';
import { breakpoint } from '../../themes/amsterdam/global_styling/variables/_breakpoint';

import { sortMapByLargeToSmallValues } from './_sorting';

/**
 * Given the current `width` and an object of `EuiThemeBreakpoints`,
 * this function returns the string that is the name of the breakpoint key
 * that is less than or equal to the width
 *
 * @param {number} width Can either be the full window width or any width
 * @param {EuiThemeBreakpoints} breakpoints An object with keys for sizing and values for minimum width
 * @returns {string | undefined} Name of the breakpoint key or `undefined` if a key doesn't exist
 */
export function getBreakpoint(
  width: number,
  breakpoints: _EuiThemeBreakpoints = breakpoint
): _EuiThemeBreakpoint | undefined {
  // Ensure the breakpoints map is sorted from largest value to smallest
  const sortedBreakpoints: _EuiThemeBreakpoints = sortMapByLargeToSmallValues(
    breakpoints
  );

  // Find the breakpoint (key) whose value is <= windowWidth starting with largest first
  return keysOf(sortedBreakpoints).find((key) => breakpoints[key] <= width);
}
