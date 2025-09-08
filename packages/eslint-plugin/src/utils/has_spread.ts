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

import type { TSESTree } from '@typescript-eslint/utils';

/**
 * Checks whether a JSX opening element contains a spread attribute
 * (e.g., `...props`). Spreads make it impossible to statically know
 * all props present on an element, so ESLint rules often use this as
 * a quick bail-out to avoid false positives.
 *
 * @param attrs - The attributes array from a `JSXOpeningElement` node (ESTree).
 * @returns `true` if any attribute is a `JSXSpreadAttribute`; otherwise `false`.
 */

export function hasSpread(
  attrs: TSESTree.JSXOpeningElement['attributes']
): boolean {
  return attrs.some((a) => a.type === 'JSXSpreadAttribute');
}
