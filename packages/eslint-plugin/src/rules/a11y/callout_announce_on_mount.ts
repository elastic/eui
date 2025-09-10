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

import { type TSESTree, ESLintUtils } from '@typescript-eslint/utils';

const CALLOUT_COMPONENT = 'EuiCallOut';

export const CallOutAnnounceOnMount = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    function isInConditionalRendering(node: TSESTree.JSXElement): boolean {
      let parent: TSESTree.Node | undefined = node.parent;
      
      while (parent) {
        if (parent.type === 'ConditionalExpression' || 
            parent.type === 'IfStatement' ||
            (parent.type === 'LogicalExpression' && parent.operator === '&&')) {
          return true;
        }
        parent = parent.parent;
      }
      return false;
    }

    return {
      JSXElement(node) {
        const { openingElement } = node;
        if (openingElement.name.type !== 'JSXIdentifier' || 
            openingElement.name.name !== CALLOUT_COMPONENT) {
          return;
        }
        if (openingElement.attributes.some(attr => 
          attr.type === 'JSXAttribute' &&
          attr.name.type === 'JSXIdentifier' &&
          attr.name.name === 'announceOnMount'
        )) {
          return;
        }
        if (isInConditionalRendering(node)) {
          const hasSpread = openingElement.attributes.some(a => a.type === 'JSXSpreadAttribute');
          
          context.report({
            node: openingElement,
            messageId: 'missingAnnounceOnMount',
            fix: hasSpread ? undefined : (fixer) => {
              return fixer.insertTextAfterRange(
                [openingElement.name.range[1], openingElement.name.range[1]], 
                ' announceOnMount'
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
      description: 'Ensure EuiCallout components that are conditionally rendered have announceOnMount prop for better accessibility'
    },
    fixable: 'code',
    schema: [],
    messages: {
      missingAnnounceOnMount: [
        'EuiCallout should have "announceOnMount" prop when conditionally rendered for better accessibility.',
        '\n',
        'When EuiCallout appears dynamically (e.g., after user interaction, form validation, etc.),',
        'screen readers may not announce its content. Adding "announceOnMount" ensures the callout',
        'is properly announced to users with assistive technologies.',
        '\n',
        'Example:',
        '  <EuiCallout announceOnMount title="Error" color="danger">',
        '    This message will be announced when it appears',
        '  </EuiCallout>',
      ].join('\n'),
    },
  },
  defaultOptions: [],
});
