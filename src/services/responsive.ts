/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { keysOf } from '../components/common';

export type EuiBreakpointSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export type EuiBreakpoints = {
  /**
   * Set the minimum window width at which to start to the breakpoint
   */
  [key in EuiBreakpointSize]: number
};

export const BREAKPOINTS: EuiBreakpoints = {
  xl: 1200,
  l: 992,
  m: 768,
  s: 575,
  xs: 0,
};

export const BREAKPOINT_KEYS = keysOf(BREAKPOINTS);

export function getBreakpoint(
  windowWidth: number,
  breakpoints: EuiBreakpoints = BREAKPOINTS
) {
  // Find the breakpoint (key) whose value is <= windowWidth starting with largest first
  return BREAKPOINT_KEYS.find(key => breakpoints[key] <= windowWidth);
}
