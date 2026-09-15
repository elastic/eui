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

const LEAF_COMPONENTS = new Set(LEAF_INTERACTIVE_EUI_COMPONENTS);

function getTarget(
  componentName: string,
  openingElement: TSESTree.JSXOpeningElement
): Target | null {
  if (componentName === CARD) {
    // A card with `onClick`/`href` attaches a wrapper click handler that
    // forwards to the title link, so a control anywhere in its content fires
    // both its own action and the card's. `selectable` cards are deliberately
    // not a target: pairing the select button with a footer action is a
    // supported EUI pattern.
    return hasInteractivityProp(openingElement)
      ? {
          messageId: 'clickableCardContent',
          contentProps: ['title', 'description', 'footer'],
        }
      : null;
  }

  if (LEAF_COMPONENTS.has(componentName)) {
    return {
      messageId: 'nestedInteractive',
      contentProps: LEAF_CONTENT_PROPS[componentName] ?? [],
    };
  }

  return null;
}

/** The element's children plus the expression value of each content prop. */
function getContentRoots(
  node: TSESTree.JSXElement,
  contentProps: string[]
): TSESTree.Node[] {
  const roots: TSESTree.Node[] = [...node.children];

  for (const attr of node.openingElement.attributes) {
    if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') {
      continue;
    }
    if (!contentProps.includes(attr.name.name)) continue;
    // Only `prop={<JSX />}` can hold an element; a string literal cannot.
    if (attr.value?.type !== 'JSXExpressionContainer') continue;
    if (attr.value.expression.type === 'JSXEmptyExpression') continue;

    roots.push(attr.value.expression);
  }

  return roots;
}

export const NoNestedInteractiveElement = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXElement(node) {
        const componentName = getElementName(node.openingElement);

        if (!componentName) return;

        const target = getTarget(componentName, node.openingElement);

        if (!target) return;

        // Non-interactive elements (layout wrappers, `EuiToolTip`, text, …) are
        // walked through; interactive ones are reported and not descended into,
        // so this scan flags only the outermost control of a subtree. Anything
        // deeper is reported against its own nearest target, when that target
        // is itself scanned.
        for (const root of getContentRoots(node, target.contentProps)) {
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
