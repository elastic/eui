/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeBreakpoint } from '../../global_styling/variables/breakpoint';
import { useCurrentEuiBreakpoint } from './';

/**
 * Given the current window.innerWidth and an array of breakpoint keys,
 * this hook stores state and returns true or false if the window.innerWidth
 * falls within any of the named breakpoints.
 *
 * @param {_EuiThemeBreakpoint[]} sizes An array of named EUI breakpoints
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
