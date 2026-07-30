/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, ESLintUtils } from '@typescript-eslint/utils';
import { hasSpread } from '../../utils/has_spread';

const BUTTON_ICON = 'EuiButtonIcon';
const TOOLTIP = 'EuiToolTip';
const COPY = 'EuiCopy';
const BEFORE_MESSAGE = 'beforeMessage';

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

function hasBeforeMessage(openingElement: TSESTree.JSXOpeningElement): boolean {
  return openingElement.attributes.some(
    (attr) =>
      attr.type === 'JSXAttribute' &&
      attr.name.type === 'JSXIdentifier' &&
      attr.name.name === BEFORE_MESSAGE
  );
}

/**
 * `EuiCopy` renders its render-prop child inside its own `EuiToolTip`, but only
 * when `beforeMessage` is set — that prop is the tooltip's `content`, and
 * `EuiToolTip` suppresses itself when the content is empty. So an
 * `EuiButtonIcon` rendered within an `<EuiCopy beforeMessage="…">` already has a
 * tooltip for sighted users and wrapping it in another `EuiToolTip` would create
 * nested, conflicting tooltips — see the `no-nested-copy-tooltip` rule. Without
 * `beforeMessage` there is no such tooltip, so the button must still be wrapped.
 */
function isInsideEuiCopyWithBeforeMessage(node: TSESTree.JSXElement): boolean {
  for (
    let current: TSESTree.Node | undefined | null = node.parent;
    current;
    current = current.parent
  ) {
    if (
      current.type === 'JSXElement' &&
      current.openingElement.name.type === 'JSXIdentifier' &&
      current.openingElement.name.name === COPY
    ) {
      return hasBeforeMessage(current.openingElement);
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

        for (const attr of openingElement.attributes) {
          if (
            attr.type !== 'JSXAttribute' ||
            attr.name.type !== 'JSXIdentifier'
          )
            continue;
          if (attr.name.name === 'title') titleAttr = attr;
        }

        if (titleAttr) {
          context.report({
            node: openingElement,
            messageId: 'useEuiToolTipInsteadOfTitle',
          });

          return;
        }

        if (
          !isWrappedByTooltip(node) &&
          !isInsideEuiCopyWithBeforeMessage(node) &&
          !hasSpread(openingElement.attributes)
        ) {
          context.report({
            node: openingElement,
            messageId: 'wrapWithEuiToolTip',
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
    schema: [],
    messages: {
      useEuiToolTipInsteadOfTitle: [
        `Remove the \`title\` prop from ${BUTTON_ICON} and use ${TOOLTIP} instead.`,
        'Browser-native tooltips are unstyled, have no delay control and are not keyboard-accessible.',
        `Wrap with <${TOOLTIP} content={label}> and use \`aria-label\` for screen readers.`,
        'If you want to skip the tooltip but are unsure, please ping or contact EUI team.',
      ].join(' '),
      wrapWithEuiToolTip: [
        `${BUTTON_ICON} has no visible tooltip for sighted users.`,
        `Wrap with <${TOOLTIP} content={ariaLabel}> using the button's \`aria-label\` as content.`,
        'If you want to skip the tooltip but are unsure, please ping or contact EUI team.',
      ].join(' '),
    },
  },
  defaultOptions: [],
});
