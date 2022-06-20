/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const EUI_BREAKPOINT_KEYS = {
  xs: 0,
  s: 575,
  m: 768,
  l: 992,
  xl: 1200,
} as const;
export type EuiBreakpointKeys = keyof typeof EUI_BREAKPOINT_KEYS;

export const euiBreakpoint = (sizes: EuiBreakpointKeys[]) => {
  // Check to see if both min-width and max-width should be set

  // If sizes only contains one element and it is the smallest size (xs), don't set a min-width
  if (sizes.length === 1 && sizes[0] === 'xs') {
    return `@media only screen and (max-width: ${
      EUI_BREAKPOINT_KEYS[sizes[0]]
    }px)`;
  } // If sizes only contains one elements and it is the largest size (xl), don't set a max-width
  else if (sizes.length === 1 && sizes[0] === 'xl') {
    return `@media only screen and (min-width: ${
      EUI_BREAKPOINT_KEYS[sizes[0]]
    }px)`;
  } // Else, set a min-width and max-width
  else {
    // minSize should equal the first element in the sizes array and the mazSize should equal the last element
    const minSize = sizes[0];
    const maxSize = sizes[sizes.length - 1];

    // -1px to prevent the overlap breakpoints
    return `@media only screen and (min-width: ${
      EUI_BREAKPOINT_KEYS[minSize]
    }px) and (max-width: ${EUI_BREAKPOINT_KEYS[maxSize] - 1}px)`;
  }
};
