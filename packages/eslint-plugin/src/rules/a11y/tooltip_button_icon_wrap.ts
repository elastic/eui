/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, ESLintUtils } from '@typescript-eslint/utils';
import { removeAttribute } from '../../utils/remove_attr';
import { hasSpread } from '../../utils/has_spread';

const BUTTON_ICON = 'EuiButtonIcon';
const TOOLTIP = 'EuiToolTip';

function isWrappedByTooltip(node: TSESTree.JSXElement): boolean {
  let current: TSESTree.Node | undefined | null = node.parent;

  while (current) {
    switch (current.type) {
      case 'JSXElement': {
        const el = current as TSESTree.JSXElement;
        if (
          el.openingElement.name.type === 'JSXIdentifier' &&
          el.openingElement.name.name === TOOLTIP
        ) {
          return true;
        }
        current = current.parent;
        break;
      }
      case 'JSXFragment':
      case 'JSXExpressionContainer':
      case 'LogicalExpression':
      case 'ConditionalExpression':
        current = current.parent;
        break;
      default:
        return false;
    }
  }

  return false;
}

export const TooltipButtonIconWrap = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXElement(node) {
        const { openingElement } = node;
        if (
          openingElement.name.type !== 'JSXIdentifier' ||
          openingElement.name.name !== BUTTON_ICON
        ) {
          return;
        }

        let titleAttr: TSESTree.JSXAttribute | undefined;
        let ariaLabelAttr: TSESTree.JSXAttribute | undefined;

        for (const attr of openingElement.attributes) {
          if (
            attr.type !== 'JSXAttribute' ||
            attr.name.type !== 'JSXIdentifier'
          )
            continue;
          if (attr.name.name === 'title') titleAttr = attr;
          if (attr.name.name === 'aria-label') ariaLabelAttr = attr;
        }

        if (titleAttr) {
          const alreadyWrapped = isWrappedByTooltip(node);

          context.report({
            node: openingElement,
            messageId: 'useEuiToolTipInsteadOfTitle',
            fix: titleAttr.value
              ? (fixer) => {
                  const titleValue = context.sourceCode.getText(
                    titleAttr!.value as TSESTree.Node
                  );
                  const [removeStart, removeEnd] = removeAttribute(
                    context,
                    titleAttr!
                  );
                  if (alreadyWrapped) {
                    return fixer.removeRange([removeStart, removeEnd]);
                  }
                  return [
                    fixer.removeRange([removeStart, removeEnd]),
                    fixer.insertTextBefore(
                      node,
                      `<${TOOLTIP} content=${titleValue}>\n  `
                    ),
                    fixer.insertTextAfter(node, `\n</${TOOLTIP}>`),
                  ];
                }
              : undefined,
          });

          return;
        }

        if (
          !isWrappedByTooltip(node) &&
          !hasSpread(openingElement.attributes)
        ) {
          context.report({
            node: openingElement,
            messageId: 'wrapWithEuiToolTip',
            fix: ariaLabelAttr?.value
              ? (fixer) => {
                  const ariaLabelValue = context.sourceCode.getText(
                    ariaLabelAttr!.value as TSESTree.Node
                  );
                  return [
                    fixer.insertTextBefore(
                      node,
                      `<${TOOLTIP} content=${ariaLabelValue}>\n  `
                    ),
                    fixer.insertTextAfter(node, `\n</${TOOLTIP}>`),
                  ];
                }
              : undefined,
          });
        }
      },
    };
  },
  meta: {
    type: 'suggestion',
    docs: {
      description: `Ensure ${BUTTON_ICON} is wrapped with ${TOOLTIP} for sighted users`,
    },
    fixable: 'code',
    schema: [],
    messages: {
      useEuiToolTipInsteadOfTitle: [
        `Remove the \`title\` prop from ${BUTTON_ICON} and use ${TOOLTIP} instead.`,
        'Browser-native tooltips are unstyled, have no delay control and are not keyboard-accessible.',
        `Wrap with <${TOOLTIP} content={label}> and use \`aria-label\` for screen readers.`,
      ].join(' '),
      wrapWithEuiToolTip: [
        `${BUTTON_ICON} has no visible tooltip for sighted users.`,
        `Wrap with <${TOOLTIP} content={ariaLabel}> using the button's \`aria-label\` as content.`,
      ].join(' '),
    },
  },
  defaultOptions: [],
});
