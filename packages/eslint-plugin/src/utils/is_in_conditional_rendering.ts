/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { TSESTree } from '@typescript-eslint/utils';

export function isInConditionalRendering(node: TSESTree.JSXElement): boolean {
  let parent: TSESTree.Node | undefined = node.parent;
  while (parent) {
    if (parent.type === 'ConditionalExpression' ||
      parent.type === 'IfStatement' ||
      (parent.type === 'LogicalExpression' && parent.operator === '&&')) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}
