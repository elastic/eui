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

import {  ESLintUtils } from '@typescript-eslint/utils';
import { isInConditionalRendering } from '../../utils/is_in_conditional_rendering';
import { hasSpread } from '../../utils/has_spread';

const CALLOUT_COMPONENT = 'EuiCallOut';

export const CallOutAnnounceOnMount = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
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
          context.report({
            node: openingElement,
            messageId: 'missingAnnounceOnMount',
            fix: hasSpread(openingElement.attributes) ? undefined : (fixer) => {
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
    type: 'problem',
    docs: {
      description: `Ensure ${CALLOUT_COMPONENT} components that are conditionally rendered have announceOnMount prop for better accessibility`
    },
    fixable: 'code',
    schema: [],
    messages: {
      missingAnnounceOnMount: [
        `${CALLOUT_COMPONENT} should have \`announceOnMount\` prop when conditionally rendered for better accessibility.`,
        '\n',
        `When ${CALLOUT_COMPONENT} appears dynamically (e.g., after user interaction, form validation, etc.),`,
        'screen readers may not announce its content. Adding `announceOnMount` ensures the callout',
        'is properly announced to users with assistive technologies.',
        '\n',
        'Example:',
        `  <${CALLOUT_COMPONENT} announceOnMount title="Error" color="danger">`,
        '    This message will be announced when it appears',
        `  </${CALLOUT_COMPONENT}>`,
      ].join('\n'),
    },
  },
  defaultOptions: [],
});
