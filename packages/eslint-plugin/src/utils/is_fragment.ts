/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree } from '@typescript-eslint/utils';

/**
 * Returns true if the opening element is a React fragment: bare `<Fragment>`,
 * `<React.Fragment>`, or the `<>` shorthand.
 */
export function isFragment(opening: TSESTree.JSXOpeningElement): boolean {
  const { name } = opening;
  if (name.type === 'JSXIdentifier' && name.name === 'Fragment') return true;
  return (
    name.type === 'JSXMemberExpression' &&
    name.object.type === 'JSXIdentifier' &&
    name.object.name === 'React' &&
    name.property.type === 'JSXIdentifier' &&
    name.property.name === 'Fragment'
  );
}
