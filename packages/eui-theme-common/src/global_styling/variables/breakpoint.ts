/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const EuiThemeBreakpoints = ['xs', 's', 'm', 'l', 'xl'] as const;

// This type cannot be a string enum / must be a generic string
// in case consumers add custom breakpoint sizes, such as xxl or xxs
export type _EuiThemeBreakpoint = string;

// Explicitly list out each key so we can document default values
// via JSDoc (which is available to devs in IDE via intellisense)
export type _EuiThemeBreakpoints = Record<_EuiThemeBreakpoint, number> & {
  /** - Default value: 0 */
  xs: number;
  /** - Default value: 575 */
  s: number;
  /** - Default value: 768 */
  m: number;
  /** - Default value: 992 */
  l: number;
  /** - Default value: 1200 */
  xl: number;
};
