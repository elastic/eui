/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { TSESTree, ESLintUtils } from '@typescript-eslint/utils';

import { hasSpread } from '../utils/has_spread';

export const RequireHrefForLink = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXOpeningElement(node: TSESTree.JSXOpeningElement): void {
        if (
          node.name.type !== 'JSXIdentifier' ||
          node.name.name !== 'EuiLink'
        ) {
          return;
        }

        // Bail out if props are spread — we can't statically determine
        // whether `href` is provided via the spread
        if (hasSpread(node.attributes)) {
          return;
        }

        // Check if the node has `href` and `onClick` attributes
        const hasHref = node.attributes.some(
          (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'href'
        );
        const hasOnClick = node.attributes.some(
          (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'onClick'
        );

        // Report an issue if `onClick` is present without `href`
        if (hasOnClick && !hasHref) {
          context.report({
            node,
            messageId: 'requireHrefForLink',
            data: {
              name: node.name.name,
            },
          });
        }
      },
    };
  },
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Recommend including `href` alongside `onClick` on EuiLink so that Ctrl/Cmd+Click (open link in new tab) works.',
    },
    schema: [],
    messages: {
      requireHrefForLink:
        '<{{name}}> has `onClick` but no `href`. Consider adding `href` so that the component renders as a link and supports Ctrl/Cmd+Click / "Open link in new tab".',
    },
  },
  defaultOptions: [],
});
