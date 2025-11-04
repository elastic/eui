/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

const TABLE_COMPONENTS = ['EuiInMemoryTable', 'EuiBasicTable'];
const TABLE_CAPTION_PROP = 'tableCaption';

export const RequireTableCaption = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
        if (node.name.type !== 'JSXIdentifier') {
          return;
        }

        const component = node.name.name;

        if (!TABLE_COMPONENTS.includes(component)) {
          return;
        }

        const hasTableCaption = node.attributes.some(
          (attr) =>
            attr.type === 'JSXAttribute' &&
            attr.name.type === 'JSXIdentifier' &&
            attr.name.name === TABLE_CAPTION_PROP
        );

        if (!hasTableCaption) {
          context.report({
            node,
            messageId: 'missingTableCaption',
            data: { component }
          });
        }
      },
    };
  },
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description: `Ensure ${TABLE_COMPONENTS.join(', ')} have a \`${TABLE_CAPTION_PROP}\` prop for accessibility.`,
    },
    schema: [],
    messages: {
      missingTableCaption: [
        '{{component}} must include a `tableCaption` prop for accessibility.',
        '',
        'Example:',
        '  <{{component}} tableCaption="Descriptive caption for the table" ... />',
      ].join('\n'),
    },
  },
});
