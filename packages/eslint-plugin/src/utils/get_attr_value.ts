/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, type TSESLint} from '@typescript-eslint/utils';

export function getAttrValue<
  TContext extends TSESLint.RuleContext<string, unknown[]>
>(
  context: TContext,
  attributes: TSESTree.JSXOpeningElement['attributes'],
  attrName: string
): string | undefined {
  const attr = attributes.find(
    (attr): attr is TSESTree.JSXAttribute =>
      attr.type === 'JSXAttribute' &&
      attr.name.type === 'JSXIdentifier' &&
      attr.name.name === attrName
  );

  if (!attr?.value) {
    return undefined;
  }

  if (attr.value.type === 'Literal') {
    return String(attr.value.value);
  }

  if (attr.value.type === 'JSXExpressionContainer') {
    const expression = attr.value.expression;

    if (expression.type === 'Literal') {
      return String(expression.value);
    }

    return context.sourceCode.getText(expression);
  }

  return undefined;
}
