/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeBreakpoints } from '../../global_styling/variables/breakpoint';

export const sortMapByLargeToSmallValues = (
  breakpointsMap: _EuiThemeBreakpoints
) =>
  Object.fromEntries(
    Object.entries(breakpointsMap).sort(([, a], [, b]) => b - a)
  ) as _EuiThemeBreakpoints;

export const sortMapBySmallToLargeValues = (
  breakpointsMap: _EuiThemeBreakpoints
) =>
  Object.fromEntries(
    Object.entries(breakpointsMap).sort(([, a], [, b]) => a - b)
  ) as _EuiThemeBreakpoints;
