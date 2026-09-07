/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, ESLintUtils } from '@typescript-eslint/utils';
import { hasMeaningfulAttr } from '../../utils/has_meaningful_attr';

const COPY = 'EuiCopy';
const TOOLTIP = 'EuiToolTip';
const BEFORE_MESSAGE = 'beforeMessage';

/**
 * Resolves the JSX element returned by the `EuiCopy` render-prop child.
 *
 * `EuiCopy` renders its children through a function (`children(copy)`), so the
 * "first child" is the root JSX element that function returns. This handles
 * both implicit arrow returns (`(copy) => <El />`) and block bodies with an
 * explicit `return` statement. Non-render-prop children (e.g. a leading JSX
 * comment) are skipped so the render-prop function is still found.
 */
function getRenderPropRootElement(
  node: TSESTree.JSXElement
): TSESTree.JSXElement | null {
  const renderProp = node.children.find(
    (child): child is TSESTree.JSXExpressionContainer =>
      child.type === 'JSXExpressionContainer' &&
      (child.expression.type === 'ArrowFunctionExpression' ||
        child.expression.type === 'FunctionExpression')
  );

  if (!renderProp) return null;

  const expression = renderProp.expression as
    | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionExpression;

  let { body } = expression;

  if (body.type === 'BlockStatement') {
    const returnStatement = body.body.find(
      (statement): statement is TSESTree.ReturnStatement =>
        statement.type === 'ReturnStatement'
    );

    if (!returnStatement?.argument) return null;

    body = returnStatement.argument;
  }

  return body.type === 'JSXElement' ? body : null;
}

function isToolTipElement(element: TSESTree.JSXElement): boolean {
  const { name } = element.openingElement;

  return name.type === 'JSXIdentifier' && name.name === TOOLTIP;
}

export const NoNestedCopyTooltip = ESLintUtils.RuleCreator.withoutDocs(
  {
    create(context) {
      return {
        JSXElement(node) {
          const { openingElement } = node;

          if (
            openingElement.name.type !== 'JSXIdentifier' ||
            openingElement.name.name !== COPY
          ) {
            return;
          }

          // A statically empty/falsy `beforeMessage` renders no `EuiCopy`
          // tooltip, so a child `EuiToolTip` is not redundant — skip those.
          if (!hasMeaningfulAttr(openingElement, BEFORE_MESSAGE)) return;

          const rootElement = getRenderPropRootElement(node);

          if (!rootElement || !isToolTipElement(rootElement)) return;

          context.report({
            node: rootElement,
            messageId: 'redundantTooltipWrapper',
          });
        },
      };
    },
    meta: {
      type: 'problem',
      docs: {
        description: `Disallow wrapping the ${COPY} render-prop child in an ${TOOLTIP} when \`${BEFORE_MESSAGE}\` is set`,
      },
      schema: [],
      messages: {
        redundantTooltipWrapper: [
          `${COPY} already wraps its child in an ${TOOLTIP} and uses \`${BEFORE_MESSAGE}\` as that tooltip's content.`,
          `Wrapping the child in another ${TOOLTIP} creates a nested, conflicting tooltip.`,
          `Remove the ${TOOLTIP} wrapper and move its message into the \`${BEFORE_MESSAGE}\` prop instead.`,
        ].join(' '),
      },
    },
    defaultOptions: [],
  }
);
