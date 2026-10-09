/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { sortMapBySmallToLargeValues } from '../../services/breakpoint/_sorting';
import { EUI_BREAKPOINT_CONTAINER } from '../../services/breakpoint/breakpoint_container';
import { useEuiTheme, UseEuiTheme } from '../../services/theme/hooks';
import { _EuiThemeBreakpoint } from '../variables';

// Query the nearest breakpoint container instead of the viewport when `EuiProvider` `breakpointContainer` is set.
// A bare `@container <name>` without a condition is invalid, so condition-less rules stay `@media`.
const atRule = ({ breakpointContainer }: UseEuiTheme, conditions: string[]) => {
  if (!conditions.length) return '@media only screen';
  return breakpointContainer
    ? `@container ${EUI_BREAKPOINT_CONTAINER} ${conditions.join(' and ')}`
    : ['@media only screen', ...conditions].join(' and ');
};

/**
 * Makes the element a breakpoint container when `EuiProvider` `breakpointContainer` is set.
 * Also set `EUI_BREAKPOINT_CONTAINER_ATTRIBUTE` on it, so the JS breakpoint hooks measure the same element.
 * Like any CSS container, it becomes the containing block for its `position: fixed` descendants
 * and starts a stacking context.
 */
export const euiBreakpointContainer = ({ breakpointContainer }: UseEuiTheme) =>
  breakpointContainer
    ? `container: ${EUI_BREAKPOINT_CONTAINER} / inline-size;`
    : '';

/**
 * Generates a CSS media query rule string based on the input breakpoint *ranges*.
 * Examples with default theme breakpoints:
 *
 * euiBreakpoint(['s']) becomes `@media only screen and (min-width: 575px) and (max-width: 767px)`
 * euiBreakpoint(['s', 'l']) becomes `@media only screen and (min-width: 575px) and (max-width: 1199px)`
 *
 * Use the smallest and largest sizes to generate media queries with only min/max-width.
 * Examples with default theme breakpoints:
 *
 * euiBreakpoint(['xs', 'm']) becomes `@media only screen and (max-width: 991px)`
 * euiBreakpoint(['l', 'xl']) becomes `@media only screen and (min-width: 992px)`
 */
export const euiBreakpoint = (
  euiThemeContext: UseEuiTheme,
  sizes: [_EuiThemeBreakpoint, ..._EuiThemeBreakpoint[]]
) => {
  const { euiTheme } = euiThemeContext;
  // Ensure we inherit any theme breakpoint overrides & sort by small to large
  const orderedBreakpoints = Object.keys(
    sortMapBySmallToLargeValues(euiTheme.breakpoint)
  );

  // Ensure the sizes array is in the correct ascending size order
  const orderedSizes = sizes.sort(
    (a, b) => orderedBreakpoints.indexOf(a) - orderedBreakpoints.indexOf(b)
  );

  const firstBreakpoint = orderedSizes[0];
  const minBreakpointSize = euiTheme.breakpoint[firstBreakpoint];

  const lastBreakpoint = orderedSizes[sizes.length - 1];
  let maxBreakpointSize: number | undefined;

  // To get the correct screen range, we set the max-width to the next breakpoint
  // size in the sizes array (unless the size is already the largest breakpoint)
  if (lastBreakpoint !== orderedBreakpoints[orderedBreakpoints.length - 1]) {
    const nextBreakpoint = orderedBreakpoints.indexOf(lastBreakpoint) + 1;
    maxBreakpointSize = euiTheme.breakpoint[orderedBreakpoints[nextBreakpoint]];
  }

  return atRule(
    euiThemeContext,
    [
      minBreakpointSize ? `(min-width: ${minBreakpointSize}px)` : false, // If 0, don't render a min-width
      maxBreakpointSize ? `(max-width: ${maxBreakpointSize - 1}px)` : false, // If undefined, don't render a max-width
    ].filter((condition): condition is string => Boolean(condition))
  );
};

export const useEuiBreakpoint = (
  sizes: [_EuiThemeBreakpoint, ..._EuiThemeBreakpoint[]]
) => {
  const euiTheme = useEuiTheme();
  return euiBreakpoint(euiTheme, sizes);
};

/**
 * Min/Max width breakpoint utilities that generate only a single min/max query/bound
 *
 * *Unlike the above euiBreakpoint utility*, these utilities treat breakpoint
 * sizes as a one-dimensional point, rather than a two-dimensional *screen range*.
 * Examples with default theme breakpoints:
 *
 * euiMaxBreakpoint('m') becomes `@media only screen and (max-width: 767px)`
 * euiMinBreakpoint('m') becomes `@media only screen and (min-width: 768px)`
 *
 * This is safer and more intentional to use than euiBreakpoint(['xs', 's']) / euiBreakpoint(['m', 'xl'])
 * in the event that consumers add larger or smaller custom breakpoints (e.g 'xxs' or `xxl`)
 * and if the intention of the media query is actually "m and below/above" vs. "only screens m/l/xl".
 */

export const euiMinBreakpoint = (
  euiThemeContext: UseEuiTheme,
  size: _EuiThemeBreakpoint
) => {
  const { euiTheme } = euiThemeContext;
  const minBreakpointSize = euiTheme.breakpoint[size];
  if (minBreakpointSize) {
    return atRule(euiThemeContext, [`(min-width: ${minBreakpointSize}px)`]);
  } else {
    console.warn(`Invalid min breakpoint size: ${size}`);
    return '@media only screen';
  }
};

export const useEuiMinBreakpoint = (size: _EuiThemeBreakpoint) => {
  const euiTheme = useEuiTheme();
  return euiMinBreakpoint(euiTheme, size);
};

export const euiMaxBreakpoint = (
  euiThemeContext: UseEuiTheme,
  size: _EuiThemeBreakpoint
) => {
  const { euiTheme } = euiThemeContext;
  const maxBreakpointSize = euiTheme.breakpoint[size];
  if (maxBreakpointSize) {
    return atRule(euiThemeContext, [`(max-width: ${maxBreakpointSize - 1}px)`]);
  } else {
    console.warn(`Invalid max breakpoint size: ${size}`);
    return '@media only screen';
  }
};

export const useEuiMaxBreakpoint = (size: _EuiThemeBreakpoint) => {
  const euiTheme = useEuiTheme();
  return euiMaxBreakpoint(euiTheme, size);
};
