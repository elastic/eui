/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { TSESTree, ESLintUtils } from '@typescript-eslint/utils';

const TOOLTIP_ROLE_QUERIES = new Set([
  'getByRole',
  'queryByRole',
  'findByRole',
]);

const isTooltipRoleQuery = (node: TSESTree.CallExpression): boolean => {
  const firstArg = node.arguments[0];

  if (firstArg?.type !== 'Literal' || firstArg.value !== 'tooltip')
    return false;

  const callee = node.callee;

  // `screen.getByRole('tooltip')` or destructured `getByRole('tooltip')`
  if (callee.type === 'MemberExpression')
    return (
      callee.property.type === 'Identifier' &&
      TOOLTIP_ROLE_QUERIES.has(callee.property.name)
    );

  if (callee.type === 'Identifier')
    return TOOLTIP_ROLE_QUERIES.has(callee.name);

  return false;
};

const isFireEventFocus = (node: TSESTree.CallExpression): boolean =>
  node.callee.type === 'MemberExpression' &&
  node.callee.object.type === 'Identifier' &&
  node.callee.object.name === 'fireEvent' &&
  node.callee.property.type === 'Identifier' &&
  node.callee.property.name === 'focus';

const isEuiToolTipClassSelector = (node: TSESTree.Literal): boolean =>
  typeof node.value === 'string' && node.value.includes('euiToolTip');

const isTestBlock = (node: TSESTree.CallExpression): boolean => {
  const callee = node.callee;
  return (
    callee.type === 'Identifier' &&
    (callee.name === 'it' || callee.name === 'test')
  );
};

type BlockState = {
  violations: TSESTree.CallExpression[];
  hasTooltipSignal: boolean;
};

export const PreferTooltipTriggerFocusTestUtility =
  ESLintUtils.RuleCreator.withoutDocs({
    create(context) {
      const blockStack: BlockState[] = [];

      const currentBlock = (): BlockState | undefined =>
        blockStack[blockStack.length - 1];

      return {
        CallExpression(node: TSESTree.CallExpression) {
          if (isTestBlock(node)) {
            blockStack.push({ violations: [], hasTooltipSignal: false });
            return;
          }

          const block = currentBlock();
          if (!block) return;
          if (isTooltipRoleQuery(node)) block.hasTooltipSignal = true;
          if (isFireEventFocus(node)) block.violations.push(node);
        },
        Literal(node: TSESTree.Literal) {
          const block = currentBlock();
          if (!block) return;
          if (isEuiToolTipClassSelector(node)) block.hasTooltipSignal = true;
        },
        'CallExpression:exit'(node: TSESTree.CallExpression) {
          if (!isTestBlock(node)) return;

          const block = blockStack.pop();
          if (!block?.hasTooltipSignal) return;

          for (const violation of block.violations) {
            context.report({
              node: violation,
              messageId: 'preferTooltipTriggerFocusTestUtility',
            });
          }
        },
      };
    },
    meta: {
      type: 'suggestion',
      docs: {
        description:
          'Prefer `focusEuiToolTipTrigger` over `fireEvent.focus` in tooltip tests. Plain `fireEvent.focus` does not simulate `:focus-visible` in jsdom and will not trigger the tooltip.',
      },
      schema: [],
      messages: {
        preferTooltipTriggerFocusTestUtility:
          'Use `focusEuiToolTipTrigger` from EUI test utilities instead of `fireEvent.focus` when testing tooltip focus behavior.',
      },
    },
    defaultOptions: [],
  });
