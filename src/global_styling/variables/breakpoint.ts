/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const EuiThemeBreakpoints = ['xs', 's', 'm', 'l', 'xl'] as const;

export type _EuiThemeBreakpoint = typeof EuiThemeBreakpoints[number];

export type _EuiThemeBreakpoints = {
  /**
   * Set the minimum window width at which to start to the breakpoint
   */
  [key in _EuiThemeBreakpoint]: number;
};

export const EuiBreakpoints = Object.keys(breakpoint);

// NOT how we want to do this, but quick way to convert
export const getEuiBreakpoint = EuiBreakpoints.map(
  // @ts-ignore todo
  (bp) => `@media screen and (min-width: ${breakpoint[bp]}px)`
);
