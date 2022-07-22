/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiTheme, UseEuiTheme } from '../../services/theme/hooks';
import { EuiThemeBreakpoints, _EuiThemeBreakpoint } from '../variables';

export const BREAKPOINT_SIZES = [...EuiThemeBreakpoints, 0, Infinity] as const;
export type EuiBreakpointSizes = typeof BREAKPOINT_SIZES[number];

const mediaQuery = '@media only screen';
const getMinWidthQuery = (breakpoint: number) => `(min-width: ${breakpoint}px)`;
const getMaxWidthQuery = (breakpoint: number) =>
  `(max-width: ${breakpoint - 1}px)`;

/**
 * Generates a CSS media query rule string based on the input sizes.
 * Example: euiBreakpoint(['s, 'l']) becomes `@media only screen and (min-width: 575px) and (max-width: 991px)`
 *
 * Note: Unlike the Sass mixin, the JS mixin allows creating media queries
 * with just (min-width) and (max-width) via the 0 and Infinity args.
 * Example: euiBreakpoint(['m', Infinity]) becomes `@media only screen and (min-width: 768px)`
 * Example: euiBreakpoint([0, 'm']) becomes `@media only screen and (max-width: 767px)`
 */
export const euiBreakpoint = (
  sizes: EuiBreakpointSizes[],
  { euiTheme }: UseEuiTheme
) => {
  let firstBreakpoint: EuiBreakpointSizes | undefined = sizes[0];
  let lastBreakpoint: EuiBreakpointSizes | undefined = sizes[sizes.length - 1];
  let minBreakpoint: number | undefined;
  let maxBreakpoint: number | undefined;

  if (sizes.length <= 1) {
    if (typeof firstBreakpoint === 'string') {
      const minIndex = EuiThemeBreakpoints.indexOf(firstBreakpoint);
      const maxIndex = minIndex + 1;
      if (firstBreakpoint !== 'xl') {
        lastBreakpoint = EuiThemeBreakpoints[maxIndex] as _EuiThemeBreakpoint;
      } else {
        lastBreakpoint = undefined;
      }
    } else {
      console.warn('Pass more than one breakpoint size');
      firstBreakpoint = lastBreakpoint = undefined;
    }
  }

  if (
    firstBreakpoint != null &&
    (BREAKPOINT_SIZES.includes(firstBreakpoint) === false ||
      firstBreakpoint === Infinity)
  ) {
    console.warn('Invalid min-width breakpoint size passed');
  } else if (typeof firstBreakpoint === 'string') {
    minBreakpoint = euiTheme.breakpoint[firstBreakpoint as _EuiThemeBreakpoint];
  }

  if (
    lastBreakpoint != null &&
    (BREAKPOINT_SIZES.includes(lastBreakpoint) === false ||
      lastBreakpoint === 0)
  ) {
    console.warn('Invalid max-width breakpoint size passed');
  } else if (typeof lastBreakpoint === 'string') {
    maxBreakpoint = euiTheme.breakpoint[lastBreakpoint as _EuiThemeBreakpoint];
  }

  if (
    minBreakpoint != null &&
    maxBreakpoint != null &&
    (minBreakpoint > maxBreakpoint || minBreakpoint === maxBreakpoint)
  ) {
    console.warn(
      'Invalid breakpoint sizes passed. The first size should be smaller than the last size'
    );
    // We can't accurately guess what they wanted, so unset the breakpoints
    minBreakpoint = maxBreakpoint = undefined;
  }

  return [
    mediaQuery,
    minBreakpoint ? getMinWidthQuery(minBreakpoint) : false,
    maxBreakpoint ? getMaxWidthQuery(maxBreakpoint) : false,
  ]
    .filter(Boolean)
    .join(' and ');
};

export const useEuiBreakpoint = (sizes: EuiBreakpointSizes[]) => {
  const euiTheme = useEuiTheme();
  return euiBreakpoint(sizes, euiTheme);
};
