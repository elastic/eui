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

import { isEqual, last } from 'lodash';
import { useEffect, useRef, useMemo } from 'react';

function compareDependencies(oldDeps: any[], newDeps: any[]) {
  oldDeps.forEach((oldDep, index) => {
    const newDep = newDeps[index];
    if(!isEqual(newDep, oldDep)) {
      console.log(`The dependency changed in position ${index}`);
      console.log("Old value: ", oldDep);
      console.log("New value: ", newDep);
    }
  });
}

function useDebugHooks(hook: Function, hookFn: Function, dependencies: any[], name: string, isShouldReturn = false) {
  const oldDepsRef = useRef(dependencies);
  return hook((params?: any) => {
    const oldDeps = oldDepsRef.current;

    if (dependencies.length !== 0) {
      console.log(`hook for ${name} was executed cause some dependency was changed`);
      compareDependencies(oldDeps, dependencies);
    }

    // Save the current dependencies
    oldDepsRef.current = dependencies;
    if (isShouldReturn) {
      return hookFn(params);
    } else {
      hookFn(params);
    }
  }, dependencies)
}

export function usePerfomanceCheck(
  dependencies: any[],
  markName: string,
) {
  useDebugEffect(() => {
    window.performance.mark(`${markName}Finish`);
    window.performance.measure(markName, `${markName}Start`, `${markName}Finish`);
    const obj = window.performance.getEntriesByName(markName);
    console.log(`time of all operations after some changes`, last(obj));
  }, dependencies, 'usePerfomanceCheck')
}

export function useDebugEffect(hookFn: Function, dependencies: any[], name: string) {
  return useDebugHooks(useEffect, hookFn, dependencies, name);
}

export function useDebugMemo(hookFn: Function, dependencies: any[], name: string) {
  const enhancedHookFn = (params?: any) => {
    window.performance.mark(`execute cache-related hook for ${name}`);
    const obj = window.performance.getEntriesByName(`execute cache-related hook for ${name}`);
    console.log(`hook was called for ${name}`, last(obj));
    return hookFn(params);
  };
  return useDebugHooks(useMemo, enhancedHookFn, dependencies, name, true);
}
