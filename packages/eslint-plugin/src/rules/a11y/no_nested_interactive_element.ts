/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, ESLintUtils } from '@typescript-eslint/utils';
import { LEAF_INTERACTIVE_EUI_COMPONENTS } from '../../utils/constants';
import { getElementName } from '../../utils/get_element_name';
import {
  hasInteractivityProp,
  isInteractiveElement,
} from '../../utils/is_interactive_element';
import { walkJsxChildren } from '../../utils/walk_jsx_children';

type MessageId = 'nestedInteractive' | 'clickableCardContent';

/** Describes why, and where, an element must not contain other controls. */
interface Target {
  messageId: MessageId;
  /** Props whose value renders inside the element's interactive area. */
  contentProps: string[];
}

const CARD = 'EuiCard';

/**
 * Leaf-control props that render *inside* the focusable element, in addition
 * to children. Props that render a **sibling** control (e.g. `EuiListGroupItem`
 * `extraAction`) are intentionally absent.
 */
const LEAF_CONTENT_PROPS: Record<string, string[]> = {
  EuiKeyPadMenuItem: ['label'],
  EuiListGroupItem: ['label'],
  EuiStepHorizontal: ['title'],
};

/**
 * `EuiCard` content that sits inside the card's click area. A card with
 * `onClick`/`href` attaches a wrapper click handler that forwards to the title
 * link, so any control rendered here fires both its own action and the card's.
 *
 * `selectable` cards are deliberately not a target: pairing the select button
 * with a footer action is a supported EUI pattern.
 */
const CARD_CONTENT_PROPS = ['title', 'description', 'footer'];

const LEAF_COMPONENTS = new Set(LEAF_INTERACTIVE_EUI_COMPONENTS);

function getTarget(node: TSESTree.JSXElement): Target | null {
  const name = getElementName(node.openingElement);

  if (!name) return null;

  if (name === CARD) {
    return hasInteractivityProp(node.openingElement)
      ? { messageId: 'clickableCardContent', contentProps: CARD_CONTENT_PROPS }
      : null;
  }

  if (LEAF_COMPONENTS.has(name)) {
    return {
      messageId: 'nestedInteractive',
      contentProps: LEAF_CONTENT_PROPS[name] ?? [],
    };
  }

  return null;
}

/** The element's children plus the expression value of each content prop. */
function getContentRoots(
  node: TSESTree.JSXElement,
  contentProps: string[]
): TSESTree.Node[] {
  const propValues = node.openingElement.attributes.flatMap((attr) =>
    attr.type === 'JSXAttribute' &&
    attr.name.type === 'JSXIdentifier' &&
    contentProps.includes(attr.name.name) &&
    attr.value?.type === 'JSXExpressionContainer' &&
    attr.value.expression.type !== 'JSXEmptyExpression'
      ? [attr.value.expression]
      : []
  );

  return [...node.children, ...propValues];
}

export const NoNestedInteractiveElement = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXElement(node) {
        const target = getTarget(node);

        if (!target) return;

        const componentName = getElementName(node.openingElement)!;

        for (const root of getContentRoots(node, target.contentProps)) {
          // Non-interactive elements (layout wrappers, `EuiToolTip`, text, …)
          // are walked through; interactive ones are reported and not descended.
          walkJsxChildren(
            root,
            (leaf) => {
              if (leaf.type !== 'JSXElement') return;

              context.report({
                node: leaf.openingElement,
                messageId: target.messageId,
                data: {
                  componentName,
                  elementName: getElementName(leaf.openingElement),
                },
              });
            },
            {
              sourceCode: context.sourceCode,
              shouldSkip: (element) => !isInteractiveElement(element),
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
        'Disallow interactive elements inside other interactive elements',
    },
    schema: [],
    messages: {
      nestedInteractive:
        '{{ elementName }} is nested inside {{ componentName }}, which renders a single focusable element. Nested controls are invalid HTML and not reliably reachable by keyboard or screen reader. Render {{ elementName }} as a sibling instead.',
      clickableCardContent:
        '{{ elementName }} inside a clickable {{ componentName }} also triggers the card `onClick`/`href` when activated. Use one action per card: remove the card `onClick`/`href`, or move {{ elementName }} outside the card.',
    },
  },
  defaultOptions: [],
});
