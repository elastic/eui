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

import _times from 'lodash/times';
import _memoize from 'lodash/memoize';

// wrap the lodash functions to avoid having lodash's TS type definition from being
// exported, which can conflict with the lodash namespace if other versions are used

/* eslint-disable import/export */
export function times<T>(count: number): number[];
export function times<T>(count: number, iteratee: (index: number) => T): T[];
export function times<T>(count: number, iteratee?: (index: number) => T) {
  if (iteratee === undefined) {
    return _times(count);
  }
  return _times(count, iteratee);
}
/* eslint-enable import/export */

// eslint-disable-next-line space-before-function-paren
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: any[]) => any
): (...args: Parameters<T>) => ReturnType<T> {
  return _memoize(func, resolver);
}

export const browserTick = (callback: FrameRequestCallback) => {
  requestAnimationFrame(callback);
};
