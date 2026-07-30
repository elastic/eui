/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { TSESTree } from '@typescript-eslint/utils';

/**
 * Checks whether a JSX opening element has an attribute whose value is
 * statically "meaningful" — present and not a statically-known empty/falsy
 * value (`""`, `{''}`, `{0}`, `{false}`, `{null}`, `{undefined}`).
 *
 * Dynamic or otherwise non-statically-analyzable values (variables, JSX,
 * template literals, calls, …) are treated as meaningful, since their runtime
 * value is unknown. Boolean shorthand (`<El attr />`) is also meaningful.
 *
 * Useful for rules that must distinguish an attribute that actually renders
 * something from one that is present but effectively empty.
 *
 * @param openingElement - The `JSXOpeningElement` node (ESTree).
 * @param attrName - The attribute name to look up.
 * @returns `true` if the attribute is present with a non-empty/non-falsy or
 * dynamic value; otherwise `false`.
 */
export function hasMeaningfulAttr(
  openingElement: TSESTree.JSXOpeningElement,
  attrName: string
): boolean {
  const attr = openingElement.attributes.find(
    (a): a is TSESTree.JSXAttribute =>
      a.type === 'JSXAttribute' &&
      a.name.type === 'JSXIdentifier' &&
      a.name.name === attrName
  );

  if (!attr) return false;

  // Boolean shorthand: `<El attr />` → present and truthy.
  if (attr.value == null) return true;

  // String literal: `attr="…"`.
  if (attr.value.type === 'Literal') {
    return Boolean(attr.value.value);
  }

  if (attr.value.type === 'JSXExpressionContainer') {
    const { expression } = attr.value;

    // Statically-known literals: `{''}`, `{0}`, `{false}`, `{null}`.
    if (expression.type === 'Literal') {
      return Boolean(expression.value);
    }

    // `{undefined}` (an identifier, not a literal).
    if (expression.type === 'Identifier' && expression.name === 'undefined') {
      return false;
    }
  }

  // Dynamic / unknown value → treat as present.
  return true;
}
