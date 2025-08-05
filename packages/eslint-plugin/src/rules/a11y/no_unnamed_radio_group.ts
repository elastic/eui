/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
