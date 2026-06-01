/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ESLintUtils } from '@typescript-eslint/utils';

const COMPONENT_NAME = 'EuiCallOut';

export const CallOutRequireTitle = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (
          node.name.type !== 'JSXIdentifier' ||
          node.name.name !== COMPONENT_NAME
        ) {
          return;
        }

        const hasTitle = node.attributes.some(
          (attr) =>
            attr.type === 'JSXAttribute' &&
            attr.name.type === 'JSXIdentifier' &&
            attr.name.name === 'title'
        );

        if (!hasTitle) {
          context.report({
            node,
            messageId: 'missingTitle',
          });
        }
      },
    };
  },
  meta: {
    type: 'suggestion',
    docs: {
      description: `Ensure ${COMPONENT_NAME} always has a \`title\` prop.`,
    },
    schema: [],
    messages: {
      missingTitle: [
        `${COMPONENT_NAME} should always have a \`title\` prop.`,
        'Example:',
        `  <${COMPONENT_NAME} title="Callout title">`,
        `    ...`,
        `  </${COMPONENT_NAME}>`,
      ].join('\n'),
    },
  },
  defaultOptions: [],
});
