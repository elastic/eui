/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiTheme, UseEuiTheme } from '../../services/theme/hooks';
import { EuiThemeBreakpoints, _EuiThemeBreakpoint } from '../variables';

/**
 * Generates a CSS media query rule string based on the input breakpoint ranges.
 * Examples:
 * euiBreakpoint(['s']) becomes `@media only screen and (min-width: 575px) and (max-width: 767px)`
 * euiBreakpoint(['s', 'l']) becomes `@media only screen and (min-width: 575px) and (max-width: 1199px)`
 *
 * Use the `xs` and `xl` sizes to generate media queries with only min/max-width.
 * Examples:
 * euiBreakpoint(['xs', 'm']) becomes `@media only screen and (max-width: 991px)`
 * euiBreakpoint(['l', 'xl']) becomes `@media only screen and (min-width: 992px)`
 */
export const euiBreakpoint = (
  { euiTheme }: UseEuiTheme,
  sizes: [_EuiThemeBreakpoint, ..._EuiThemeBreakpoint[]]
) => {
  // Ensure the array is in the correct ascending size order
  const orderedSizes = sizes.sort(
    (a, b) => EuiThemeBreakpoints.indexOf(a) - EuiThemeBreakpoints.indexOf(b)
  );

  const firstBreakpoint: _EuiThemeBreakpoint = orderedSizes[0];
  const minBreakpointSize = euiTheme.breakpoint[firstBreakpoint];

  const lastBreakpoint: _EuiThemeBreakpoint = orderedSizes[sizes.length - 1];
  let maxBreakpointSize: number | undefined;

  // To get the correct screen range, we set the max-width
  // to the next breakpoint size in the sizes array
  if (lastBreakpoint !== 'xl') {
    const nextBreakpoint = EuiThemeBreakpoints.indexOf(lastBreakpoint) + 1;
    maxBreakpointSize =
      euiTheme.breakpoint[EuiThemeBreakpoints[nextBreakpoint]];
  }

  return [
    '@media only screen',
    minBreakpointSize ? `(min-width: ${minBreakpointSize}px)` : false, // If xs/0, don't render a min-width
    maxBreakpointSize ? `(max-width: ${maxBreakpointSize - 1}px)` : false, // If xl/undefined, don't render a max-width
  ]
    .filter(Boolean)
    .join(' and ');
};

export const useEuiBreakpoint = (
  sizes: [_EuiThemeBreakpoint, ..._EuiThemeBreakpoint[]]
) => {
  const euiTheme = useEuiTheme();
  return euiBreakpoint(euiTheme, sizes);
};
