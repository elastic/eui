/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeBreakpoint } from '../../global_styling/variables/breakpoint';
import { useEuiTheme } from '../theme';
import { useCurrentEuiBreakpoint } from './current_breakpoint_hook';

/**
 * Given an array of breakpoint keys, this hook returns true or false
 * if the breakpoint size of the current window width falls within
 * any of the named breakpoints.
 *
 * @param {EuiThemeBreakpoint[]} sizes An array of named EUI breakpoints
 * @param {boolean} isResponsive Some components have the option to turn off responsive behavior.
 *   Since hooks can't be called conditionally, it's easier to pass the condition into the hook
 * @returns {boolean} Returns `true` if current breakpoint name is included in `sizes`
 */
export const useIsWithinBreakpoints = (
  sizes: _EuiThemeBreakpoint[],
  isResponsive = true
) => {
  const currentBreakpoint = useCurrentEuiBreakpoint();

  return currentBreakpoint && isResponsive
    ? sizes.includes(currentBreakpoint)
    : false;
};

/**
 * Given a max breakpoint key, this hook returns true if the breakpoint size
 * of the current window width falls within the max breakpoint or any below,
 * and false otherwise
 *
 * @param {EuiThemeBreakpoint} max The named max breakpoint to check against
 * @returns {boolean} Will return `false` if it can't find a value for the `max` breakpoint
 */
export function useIsWithinMaxBreakpoint(max: _EuiThemeBreakpoint): boolean {
  const {
    euiTheme: { breakpoint: breakpoints },
  } = useEuiTheme();
  const currentBreakpoint = useCurrentEuiBreakpoint();

  if (currentBreakpoint == null || breakpoints[max] == null) {
    return false;
  }

  return breakpoints[currentBreakpoint] <= breakpoints[max];
}

/**
 * Given a min breakpoint key, this hook returns true if the breakpoint size
 * of the current window width falls within the min breakpoint or any above,
 * and false otherwise
 *
 * @param {EuiThemeBreakpoint} min The named min breakpoint to check against
 * @returns {boolean} Will return `false` if it can't find a value for the `min` breakpoint
 */
export function useIsWithinMinBreakpoint(min: _EuiThemeBreakpoint): boolean {
  const {
    euiTheme: { breakpoint: breakpoints },
  } = useEuiTheme();
  const currentBreakpoint = useCurrentEuiBreakpoint();

  if (currentBreakpoint == null || breakpoints[min] == null) {
    return false;
  }

  return breakpoints[currentBreakpoint] >= breakpoints[min];
}
