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

/**
 * euiBreakpoint should accept standard euiBreakpointSize's, 0, and inifinity, undefined
 */
export type _validBreakpointSizes =
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | '0'
  | 'infinity'
  | undefined;

export const euiBreakpoint = (
  sizes: _validBreakpointSizes[],
  { euiTheme }: UseEuiTheme
) => {
  if (sizes.length > 1 && !_isValidBreakpointArray(sizes)) {
    console.warn(
      'euiBreakpoint: One or more elements within sizes[] are invlid'
    );
    return '@media only screen';
  }

  // 1. Check for single element arrays
  if (sizes.length === 1) {
    switch (sizes[0]) {
      // If sizes only contains one element and it is the smallest size (xs), don't set a min-width
      case 'xs':
        // Will return 574px instead of 0
        return `@media only screen and (max-width: ${_getMaxWidthFromBreakpoint(
          sizes[0]
        )}px)`;
      // If sizes only contains one elements and it is the largest size (xl), don't set a max-width
      case 'xl':
        return `@media only screen and (min-width: ${
          euiTheme.breakpoint[sizes[0]]
        }px)`;
      default:
        console.warn(
          `euiBreakpoint cannot create media query for ${sizes[0]}}`
        );
        return '@media only screen';
    }
  } // We should create a max-width query if sizes[0] is undefined OR if sizes[0] is 0
  else if (sizes[0] === '0' || sizes[0] === undefined) {
    switch (sizes[1]) {
      case 'xs':
        // Will return 574px instead of 0
        return `@media only screen and (max-width: ${_getMaxWidthFromBreakpoint(
          sizes[1]
        )}px)`;

      case 's':
      case 'm':
      case 'l':
      case 'xl':
        return `@media only screen and (max-width: ${
          euiTheme.breakpoint[sizes[1]]
        }px)`;

      default:
        console.warn(
          `euiBreakpoint cannot create media query for ${sizes[0]} and  ${sizes[1]}`
        );
        return '@media only screen';
    }
  } // We should create a min-width query if sizes[1] is undefined OR is sizes[1] is infinity
  else if (sizes[1] === 'infinity' || sizes[1] === undefined) {
    switch (sizes[0]) {
      case 'xs':
      case 's':
      case 'm':
      case 'l':
      case 'xl':
        return `@media only screen and (min-width: ${
          euiTheme.breakpoint[sizes[0]]
        }px)`;

      default:
        console.warn(
          `euiBreakpoint cannot create media query for ${sizes[0]} and  ${sizes[1]}`
        );
        return '@media only screen';
    }
  } else {
    const minSize = sizes[0] as EuiBreakpointSize;
    const maxSize = sizes[sizes.length - 1] as EuiBreakpointSize;

    return `@media only screen and (min-width: ${
      euiTheme.breakpoint[minSize]
    }px) and (max-width: ${_getMaxWidthFromBreakpoint(maxSize)}px)`;
  }
};

export const useEuiBreakpoint = (sizes: _validBreakpointSizes[]) => {
  const euiTheme = useEuiTheme();
  return euiBreakpoint(sizes, euiTheme);
};

/**
 * Check array for validity
 * Invalid arrays:
 * - [0, infinity]
 * - [undefined, undefined || 0 || infinity]
 * - Any array where the first element is larger than the second (i.e. ['xl', 's'] or ['infinity', 'm'])
 * - Single element arrays of undefined, 0, or infinity
 * - The two elements in the array are the same
 *
 * This function is only exported for testing
 */
export const _isValidBreakpointArray = (sizes: _validBreakpointSizes[]) => {
  // Create an array ranking the breakpointSizes in order to compare indexes and determine which sizes are larger than others
  const sizeRanking = [undefined, '0', 'xs', 's', 'm', 'l', 'xl', 'infinity'];
  const sizeOfFirstElement = sizeRanking.indexOf(sizes[0]);
  const sizeOfSecondElement = sizeRanking.indexOf(sizes[1]);

  if (
    sizes.length === 1 &&
    (sizes[0] === undefined || sizes[0] === 'infinity' || sizes[0] === '0')
  ) {
    console.warn(`euiBreakpoint cannot create media query for ${sizes[0]}`);
    return false;
  } else if (sizes[0] === sizes[1]) {
    console.warn(
      'euiBreakpoint cannot create media query. The first and second element of sizes[] cannot be equal'
    );
    return false;
  } else if (sizes[0] === '0' && sizes[1] === 'infinity') {
    console.warn(
      'euiBreakpoint cannot create media query for sizes 0px to infinity'
    );
    return false;
  } else if (
    sizes[0] === undefined &&
    (sizes[1] === undefined || sizes[1] === '0' || sizes[1] === 'infinity')
  ) {
    console.warn(
      'euiBreakpoint cannot create media query for sizes undefined to undefined'
    );
    return false;
  } else if (
    sizeOfFirstElement > sizeOfSecondElement &&
    sizes[0] !== undefined &&
    sizes[1] !== undefined
  ) {
    console.warn(
      'euiBreakpoint cannot create a media query. The first element of sizes[] must be smaller than the second.'
    );
    return false;
  } else {
    return true;
  }
};

export const _getMaxWidthFromBreakpoint = (size: EuiBreakpointSize) => {
  // Edge case: Catch max-width for the largest breakpoint in BREAKPOINT_KEYS
  if (size === BREAKPOINT_KEYS[0]) {
    return Number.MAX_SAFE_INTEGER;
  }

  const newTSizeIndex = BREAKPOINT_KEYS.indexOf(size) - 1;
  const newTSize = BREAKPOINT_KEYS[newTSizeIndex];
  const newPxSize = BREAKPOINTS[newTSize] - 1;
  return newPxSize;
};
