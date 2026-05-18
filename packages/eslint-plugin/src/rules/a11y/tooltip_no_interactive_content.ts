/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, ESLintUtils } from '@typescript-eslint/utils';
import {
  INTERACTIVE_EUI_COMPONENTS,
  CONDITIONALLY_INTERACTIVE_EUI_COMPONENTS,
} from '../../utils/constants';

const TOOLTIP_COMPONENTS = ['EuiToolTip', 'EuiIconTip'];
const TOOLTIP_CONTENT_PROPS = ['content', 'title'];
const INTERACTIVE_HTML_ELEMENTS = [
  'a',
  'button',
  'input',
  'select',
  'textarea',
];
const CONDITIONALLY_INTERACTIVE_SET = new Set(
  CONDITIONALLY_INTERACTIVE_EUI_COMPONENTS
);

const INTERACTIVE_ELEMENTS = new Set([
  ...INTERACTIVE_HTML_ELEMENTS,
  ...INTERACTIVE_EUI_COMPONENTS.filter(
    (c) => !CONDITIONALLY_INTERACTIVE_SET.has(c)
  ),
]);

function findInteractiveElement(
  node: TSESTree.Node
): TSESTree.JSXOpeningElement | null {
  if (node.type === 'JSXElement') {
    const el = node as TSESTree.JSXElement;
    const { name } = el.openingElement;

    if (name.type === 'JSXIdentifier' && INTERACTIVE_ELEMENTS.has(name.name)) {
      return el.openingElement;
    }

    for (const child of el.children) {
      const found = findInteractiveElement(child);
      if (found) return found;
    }
  } else if (node.type === 'JSXFragment') {
    for (const child of (node as TSESTree.JSXFragment).children) {
      const found = findInteractiveElement(child);
      if (found) return found;
    }
  } else if (node.type === 'JSXExpressionContainer') {
    const { expression } = node as TSESTree.JSXExpressionContainer;
    if (expression.type !== 'JSXEmptyExpression') {
      return findInteractiveElement(expression);
    }
  } else if (node.type === 'LogicalExpression') {
    const { left, right } = node as TSESTree.LogicalExpression;
    return findInteractiveElement(left) ?? findInteractiveElement(right);
  } else if (node.type === 'ConditionalExpression') {
    const { consequent, alternate } = node as TSESTree.ConditionalExpression;
    return (
      findInteractiveElement(consequent) ?? findInteractiveElement(alternate)
    );
  }
  return null;
}

export const TooltipNoInteractiveContent = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXElement(node) {
        const { openingElement } = node;
        if (
          openingElement.name.type !== 'JSXIdentifier' ||
          !TOOLTIP_COMPONENTS.includes(openingElement.name.name)
        ) {
          return;
        }

        const componentName = openingElement.name.name;

        for (const attr of openingElement.attributes) {
          if (
            attr.type !== 'JSXAttribute' ||
            attr.name.type !== 'JSXIdentifier' ||
            !TOOLTIP_CONTENT_PROPS.includes(attr.name.name)
          ) {
            continue;
          }

          if (!attr.value || attr.value.type !== 'JSXExpressionContainer') {
            continue;
          }

          const { expression } = attr.value;
          if (expression.type === 'JSXEmptyExpression') {
            continue;
          }

          const interactiveEl = findInteractiveElement(expression);
          if (interactiveEl) {
            context.report({
              node: interactiveEl,
              messageId: 'noInteractiveContent',
              data: {
                propName: (attr.name as TSESTree.JSXIdentifier).name,
                componentName,
                elementName: (interactiveEl.name as TSESTree.JSXIdentifier)
                  .name,
              },
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
        'Disallow interactive elements in `EuiToolTip` and `EuiIconTip` content',
    },
    schema: [],
    messages: {
      noInteractiveContent:
        '{{ elementName }} inside {{ componentName }} {{ propName }} is not keyboard-reachable. Tooltip content renders in a portal with `role="tooltip"`. Use `EuiPopover` for interactive content instead.',
    },
  },
  defaultOptions: [],
});
