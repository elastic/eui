/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ESLintUtils } from '@typescript-eslint/utils';

const radioComponents = ['EuiRadio', 'EuiRadioGroup'];

export const NoUnnamedRadioGroup = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (
          node.name.type === 'JSXIdentifier' &&
          radioComponents.includes(node.name.name)
        ) {
          const hasNameAttr = node.attributes.some(
            (attr) =>
              attr.type === 'JSXAttribute' &&
              attr.name.type === 'JSXIdentifier' &&
              attr.name.name === 'name'
          );

          if (!hasNameAttr) {
            context.report({
              node,
              messageId: 'missingRadioName',
              data: { component: node.name.name },
            });
          }
        }
      },
    };
  },
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure that all radio input components have a `name` attribute. The `name` attribute is required for radio inputs to be grouped correctly, allowing users to select only one option from a set. Without a `name`, radios may not behave as expected and can cause accessibility issues for assistive technologies.',
    },
    schema: [],
    messages: {
      missingRadioName:
        '{{ component }} must have a `name` attribute. The `name` attribute is required for radio inputs to be grouped correctly, ensuring only one option can be selected and improving accessibility for all users.',
    },
  },
  defaultOptions: [],
});
