/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, ESLintUtils } from '@typescript-eslint/utils';

const TOOLTIP_COMPONENT = 'EuiToolTip';
const ICON_COMPONENT = 'EuiIcon';
const ICON_TIP_COMPONENT = 'EuiIconTip';

export const PreferEuiIconTip = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXElement(node) {
        const openingElement = node.openingElement;
        if (
          openingElement.name.type !== 'JSXIdentifier' ||
          openingElement.name.name !== TOOLTIP_COMPONENT
        ) {
          return;
        }

        // Find first JSX child
        const firstChild = node.children.find(
          (child): child is TSESTree.JSXElement =>
            child.type === 'JSXElement'
        );

        if (
          firstChild &&
          firstChild.openingElement.name.type === 'JSXIdentifier' &&
          firstChild.openingElement.name.name === ICON_COMPONENT
        ) {
          context.report({
            node: firstChild,
            messageId: 'preferEuiIconTip'
          });
        }
      },
    };
  },
  meta: {
    type: 'suggestion',
    docs: {
      description: `Prefer using ${ICON_TIP_COMPONENT} over <${TOOLTIP_COMPONENT}><${ICON_COMPONENT}/></${TOOLTIP_COMPONENT}>, as it delivers better accessibility and improved support for assistive technologies.`
    },
    schema: [],
    messages: {
      preferEuiIconTip: `Ensure ${ICON_TIP_COMPONENT} is used rather than <${TOOLTIP_COMPONENT}><${ICON_COMPONENT}/></${TOOLTIP_COMPONENT}>, as it delivers better accessibility and improved support for assistive technologies.`,
    },
  },
  defaultOptions: [],
});
