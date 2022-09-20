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

// Set the minimum window width at which to start to the breakpoint
export type _EuiThemeBreakpoints = Record<_EuiThemeBreakpoint, number>;
