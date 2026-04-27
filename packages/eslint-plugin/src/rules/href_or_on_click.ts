/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { TSESTree, ESLintUtils } from '@typescript-eslint/utils';

const componentNames = ['EuiButton', 'EuiButtonEmpty', 'EuiLink', 'EuiBadge'];

export const HrefOnClick = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXOpeningElement(node: TSESTree.JSXOpeningElement): void {
        // Ensure node name is one of the valid component names
        if (
          node.name.type !== 'JSXIdentifier' ||
          !componentNames.includes(node.name.name)
        ) {
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
            messageId: 'hrefOrOnClick',
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
        'Recommend including `href` alongside `onClick` on link-like EUI components so that Cmd+Click (open in new tab) works.',
    },
    schema: [],
    messages: {
      hrefOrOnClick:
        '<{{name}}> has `onClick` but no `href`. Consider adding an `href` so that the component renders as a link and supports Cmd+Click / "Open in new tab".',
    },
  },
  defaultOptions: [],
});
