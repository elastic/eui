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

import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

const interactiveComponents = [
  'EuiBetaBadge',
  'EuiButtonEmpty',
  'EuiButtonIcon',
  'EuiComboBox',
  'EuiSelect',
  'EuiSelectWithWidth',
  'EuiSuperSelect',
  'EuiPagination',
  'EuiTreeView',
  'EuiBreadcrumbs',
] as const;

const wrappingComponents = ['EuiFormRow'] as const;
const a11yProps = ['aria-label', 'aria-labelledby', 'label'] as const;

function hasSpread(attrs: TSESTree.JSXOpeningElement['attributes']): boolean {
  return attrs.some((a) => a.type === 'JSXSpreadAttribute');
}

function hasA11yProp(attrs: TSESTree.JSXOpeningElement['attributes']): boolean {
  return attrs.some(
    (attr): attr is TSESTree.JSXAttribute =>
      attr.type === 'JSXAttribute' &&
      attr.name.type === 'JSXIdentifier' &&
      a11yProps.includes(attr.name.name as (typeof a11yProps)[number]),
  );
}

function getReadableComponentName(name: TSESTree.JSXOpeningElement['name']): string {
  return name.type === 'JSXIdentifier' ? name.name : 'this component';
}

export const NoUnnamedInteractiveElement = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: 'suggestion',
    hasSuggestions: false, 
    schema: [],
    messages: {
      missingA11y:
        '{{component}} should have an accessible name via `aria-label`, `aria-labelledby`, or `label`.',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode; 

    const report = (n: TSESTree.JSXOpeningElement) => {
      if (n.name.type === 'JSXIdentifier') {
        context.report({
          node: n,
          messageId: 'missingA11y',
          data: { component: n.name.name },
        });
      }
    };

    return {
      JSXOpeningElement(node) {
        if (node.name.type !== 'JSXIdentifier') return;

        const isInteractive = interactiveComponents.includes(
          node.name.name as (typeof interactiveComponents)[number],
        );
        if (!isInteractive) return;

        if (hasSpread(node.attributes) || hasA11yProp(node.attributes)) return;

        const ancestors = sourceCode.getAncestors(node);
        const wrapper = [...ancestors]
          .reverse()
          .find(
            (a): a is TSESTree.JSXElement =>
              a.type === 'JSXElement' &&
              a.openingElement.name.type === 'JSXIdentifier' &&
              wrappingComponents.includes(
                a.openingElement.name.name as (typeof wrappingComponents)[number],
              ),
          );

        if (wrapper) {
          const open = wrapper.openingElement;
          if (!hasSpread(open.attributes) && !hasA11yProp(open.attributes)) {
            report(open);
          }
        } else {
          report(node);
        }
      },
    };
  },
});
