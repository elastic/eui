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
import { hasSpread } from '../../utils/has_spread';
import {
  getAllowedA11yPropNamesForComponent,
  type A11yConfig,
} from '../../utils/get_allowed_a11y_prop_names_for_component';
import { hasA11yPropForComponent } from '../../utils/has_a11y_prop_for_component';

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
const interactiveComponentsWithLabel = ['EuiBetaBadge'] as const;
const baseA11yProps = ['aria-label', 'aria-labelledby'] as const;

// Single source of truth for the utils (keeps them reusable)
const a11yConfig: A11yConfig = {
  interactiveComponentsWithLabel: [...interactiveComponentsWithLabel],
  wrappingComponents: [...wrappingComponents],
  baseA11yProps: [...baseA11yProps],
};

export const NoUnnamedInteractiveElement = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: 'problem',
    hasSuggestions: false,
    schema: [],
    messages: {
      missingA11y:
        '{{component}} must include an accessible label. Use one of: {{a11yProps}}',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode;

    function report(opening: TSESTree.JSXOpeningElement) {
      if (opening.name.type !== 'JSXIdentifier') return;
      const component = opening.name.name;
      const allowed = getAllowedA11yPropNamesForComponent(component, a11yConfig).join(', ');
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

        const componentName = node.name.name;
        const isInteractive = (
          interactiveComponents as readonly string[]
        ).includes(componentName);
        if (!isInteractive) return;

        if (
          hasSpread(node.attributes) ||
          hasA11yPropForComponent(componentName, node.attributes, a11yConfig)
        ) {
          return;
        }

        const ancestors = sourceCode.getAncestors(node);
        const wrapper = [...ancestors]
          .reverse()
          .find(
            (a): a is TSESTree.JSXElement =>
              a.type === 'JSXElement' &&
              a.openingElement.name.type === 'JSXIdentifier' &&
              (wrappingComponents as readonly string[]).includes(
                a.openingElement.name.name
              )
          );

        if (wrapper) {
          const open = wrapper.openingElement;
          const wrapperName =
            open.name.type === 'JSXIdentifier' ? open.name.name : '';
          if (
            !hasSpread(open.attributes) &&
            !hasA11yPropForComponent(wrapperName, open.attributes, a11yConfig)
          ) {
            report(open);
          }
        } else {
          report(node);
        }
      },
    };
  },
});