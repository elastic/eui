/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, ESLintUtils } from '@typescript-eslint/utils';
import { walkJsxChildren } from '../../utils/walk_jsx_children';
import { getElementName } from '../../utils/get_element_name';
import { hasMeaningfulAttr } from '../../utils/has_meaningful_attr';
import { isInteractiveElement } from '../../utils/is_interactive_element';

const TOOLTIP_COMPONENTS = ['EuiToolTip', 'EuiIconTip'];
const TOOLTIP_CONTENT_PROPS = ['content', 'title'];
const LIST_GROUP_ITEM = 'EuiListGroupItem';
const LIST_GROUP_ITEM_EXTRA_ACTION = 'EuiButtonIcon';

function getSyntheticInteractiveElementName(
  element: TSESTree.JSXElement
): string | null {
  const componentName = getElementName(element.openingElement);

  if (
    componentName === LIST_GROUP_ITEM &&
    hasMeaningfulAttr(element.openingElement, 'extraAction')
  ) {
    return LIST_GROUP_ITEM_EXTRA_ACTION;
  }

  return null;
}

function shouldSkipTooltipContentElement(element: TSESTree.JSXElement): boolean {
  const elementName = getElementName(element.openingElement);

  if (!elementName) return true;
  if (getSyntheticInteractiveElementName(element)) return false;

  // Custom components stay traversable here; local ones are resolved by
  // `walkJsxChildren` before this guard runs, and unresolved ones remain opaque.
  if (/^[A-Z]/.test(elementName) && !elementName.startsWith('Eui')) {
    return true;
  }

  return !isInteractiveElement(element);
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

          let found = false;

          walkJsxChildren(
            expression,
            (leaf) => {
              if (found || leaf.type !== 'JSXElement') return;
              const elementName =
                getSyntheticInteractiveElementName(leaf) ??
                getElementName(leaf.openingElement);
              if (!elementName) return;

              context.report({
                node: leaf.openingElement,
                messageId: 'noInteractiveContent',
                data: {
                  propName: (attr.name as TSESTree.JSXIdentifier).name,
                  componentName,
                  elementName,
                },
              });
              found = true;
            },
            {
              sourceCode: context.sourceCode,
              shouldSkip: shouldSkipTooltipContentElement,
            }
          );
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
