/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  EuiBreakpointSize,
  BREAKPOINT_KEYS,
  BREAKPOINTS,
} from '../../services';
import { useEuiTheme, UseEuiTheme } from '../../services/theme/hooks';

export const euiBreakpoint = (
  sizes: EuiBreakpointSize[],
  euiThemeContext: UseEuiTheme
) => {
  const euiTheme = euiThemeContext.euiTheme;
  //console.log(BREAKPOINT_KEYS);
  // Check to see if both min-width and max-width should be set
  // If sizes only contains one element and it is the smallest size (xs), don't set a min-width
  if (sizes.length === 1 && sizes[0] === 'xs') {
    return euiBreakpointMax(sizes[0], euiThemeContext);
  } // If sizes only contains one elements and it is the largest size (xl), don't set a max-width
  else if (sizes.length === 1 && sizes[0] === 'xl') {
    return euiBreakpointMin(sizes[0], euiThemeContext);
  } // Else, set a min-width and max-width
  else {
    // minSize should equal the first element in the sizes array and the mazSize should equal the last element
    const minSize = sizes[0];
    const maxSize = sizes[sizes.length - 1];

    // -1px to prevent the overlap breakpoints
    return `@media only screen and (min-width: ${
      euiTheme.breakpoint[minSize]
    }px) and (max-width: ${getMaxWidthFromBreakpoint(maxSize)}px)`;
  }
};

export const useEuiBreakpoint = (sizes: EuiBreakpointSize[]) => {
  const euiTheme = useEuiTheme();
  euiBreakpoint(sizes, euiTheme);
};

export const euiBreakpointMin = (
  size: EuiBreakpointSize,
  { euiTheme }: UseEuiTheme
) => {
  return `@media only screen and (min-width: ${euiTheme.breakpoint[size]}px)`;
};

export const euiBreakpointMax = (
  size: EuiBreakpointSize,
  { euiTheme }: UseEuiTheme
) => {
  return `@media only screen and (max-width: ${euiTheme.breakpoint[size]}px)`;
};

const getMaxWidthFromBreakpoint = (size: EuiBreakpointSize) => {
  // Edge case to catch input of 'xl'
  if (size === BREAKPOINT_KEYS[0]) {
    return Number.MAX_SAFE_INTEGER;
  }

  const newTSizeIndex = BREAKPOINT_KEYS.indexOf(size) - 1;
  const newTSize = BREAKPOINT_KEYS[newTSizeIndex];
  const newPxSize = BREAKPOINTS[newTSize] - 1;
  return newPxSize;
};
