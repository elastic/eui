/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeBreakpoint } from '..';
import { useEuiTheme, UseEuiTheme } from '../../services/theme';

/**
 * This isn't the full extend of what we need yet from breakpoints
 * @param breakpoint An EuiTheme breakpoint key as the minimum starting width
 * @param euiTheme UseEuiTheme.euiTheme
 * @returns `string`
 */
export const euiBreakpoint = (
  breakpoint: _EuiThemeBreakpoint,
  euiTheme: UseEuiTheme['euiTheme']
) => {
  return `@media screen and (min-width: ${euiTheme.breakpoint[breakpoint]}px)`;
};

// Hook version
export const useEuiBreakpoint = (breakpoint: _EuiThemeBreakpoint) => {
  const { euiTheme } = useEuiTheme();
  return euiBreakpoint(breakpoint, euiTheme);
};
