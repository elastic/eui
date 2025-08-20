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

const interactiveComponents = [
  'EuiBetaBadge',
  'EuiButtonEmpty',
  'EuiButtonIcon',
  'EuiComboBox',
  'EuiSelect',
  'EuiSelectWithWidth',
  'EuiSuperSelect',
];

const wrappingComponents = ['EuiFormRow'];
const a11yProps = ['aria-label', 'aria-labelledby', 'label'];

export const NoUnnamedInteractiveElement = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (
          node.name.type === 'JSXIdentifier' &&
          interactiveComponents.includes(node.name.name)
        ) {
          // Check if wrapped in a wrapping component
          const parent = context.getAncestors().reverse().find(
            (ancestor) =>
              ancestor.type === 'JSXElement' &&
              ancestor.openingElement &&
              ancestor.openingElement.name.type === 'JSXIdentifier' &&
              wrappingComponents.includes(ancestor.openingElement.name.name)
          );
          if (parent) {
            const hasA11yProp = parent.openingElement.attributes.some(
              (attr) =>
                attr.type === 'JSXAttribute' &&
                attr.name.type === 'JSXIdentifier' &&
                a11yProps.includes(attr.name.name)
            );
            if (hasA11yProp) return;
            context.report({
              node: parent.openingElement,
              messageId: 'missingA11y',
              data: { component: parent.openingElement.name.name },
              fix(fixer) {
                return fixer.insertTextAfter(
                  parent.openingElement.name,
                  ` aria-label="${parent.openingElement.name.name}"`
                );
              },
            });
            return;
          }

          // Check props on the interactive element itself
          const hasA11yProp = node.attributes.some(
            (attr) =>
              attr.type === 'JSXAttribute' &&
              attr.name.type === 'JSXIdentifier' &&
              a11yProps.includes(attr.name.name)
          );
          if (hasA11yProp) return;
          context.report({
            node,
            messageId: 'missingA11y',
            data: { component: node.name.name },
            fix(fixer) {
              return fixer.insertTextAfter(
                node.name,
                ` aria-label="${node.name.name}"`
              );
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
        'Ensure interactive EUI components have an accessible name via aria-label, aria-labelledby, or label.',
    },
    schema: [],
    messages: {
      missingA11y:
        '{{ component }} should have a `aria-label` for accessibility.',
    },
  },
  defaultOptions: [],
});