/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
