/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
        `Note: If ${CALLOUT_COMPONENT} is inside a condition and not an action, explicitly set \`announceOnMount={false}\``,
        'Example:',
        `  <${CALLOUT_COMPONENT} announceOnMount title="Error" color="danger">`,
        '    This message will be announced when it appears',
        `  </${CALLOUT_COMPONENT}>`,
      ].join('\n'),
    },
  },
  defaultOptions: [],
});
