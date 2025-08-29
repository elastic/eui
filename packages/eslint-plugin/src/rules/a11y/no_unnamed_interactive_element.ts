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

const interactiveComponentsWithoutLabel = [
  'EuiBetaBadge',
  'EuiButtonIcon',
  'EuiButtonEmpty',
  'EuiBreadcrumbs',
];


function getAllowedA11yPropNamesForComponent(
  componentName: string,
): string[] {
  if (interactiveComponentsWithoutLabel.includes(componentName)) {
    return a11yProps.filter((p) => p !== 'label');
  }
  return [...a11yProps];
}

function hasA11yProp(attrs: TSESTree.JSXOpeningElement['attributes']): boolean {
  return attrs.some(
    (attr): attr is TSESTree.JSXAttribute =>
      attr.type === 'JSXAttribute' &&
      attr.name.type === 'JSXIdentifier' &&
      a11yProps.includes(attr.name.name as (typeof a11yProps)[number]),
  );
}


export const NoUnnamedInteractiveElement = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: 'problem',
    hasSuggestions: false, 
    schema: [],
    messages: {
      missingA11y:
        '{{component}} must include an accessible label. Use one of: {{a11yProps}}'
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode; 

function report(opening: TSESTree.JSXOpeningElement) {
  if (opening.name.type !== 'JSXIdentifier') return;
  const component = opening.name.name;
  const allowed = getAllowedA11yPropNamesForComponent(component).join(', ');
  context.report({
    node: opening,
    messageId: 'missingA11y',
    data: {
      component,
      a11yProps: allowed,
    },
  });
}

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
