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

import { useState, useEffect } from 'react';

import { isWithinBreakpoints, EuiBreakpointSize } from '../breakpoint';

/**
 * Given the current window.innerWidth and an array of breakpoint keys,
 * this hook stores state and returns true or false if the window.innerWidth
 * falls within any of the named breakpoints.
 *
 * @param {EuiBreakpointSize[]} sizes An array of named breakpoints
 * @returns {boolean} Returns `true` if current breakpoint name is included in `sizes`
 */
export function useIsWithinBreakpoints(sizes: EuiBreakpointSize[]) {
  const [isWithinBreakpointsValue, setIsWithinBreakpointsValue] = useState<
    boolean
  >(false);

  useEffect(() => {
    function handleResize() {
      setIsWithinBreakpointsValue(
        isWithinBreakpoints(window.innerWidth, sizes)
      );
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [sizes]);

  return isWithinBreakpointsValue;
}
