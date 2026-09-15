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
 * Leaf-control props whose value renders *inside* the focusable element, in
 * addition to children. Props that render a **sibling** control (e.g.
 * `EuiListGroupItem` `extraAction`) are intentionally absent, as are props
 * rendered into a portal (e.g. `EuiContextMenuItem` `toolTipContent`).
 */
const LEAF_CONTENT_PROPS: Record<string, string[]> = {
  EuiContextMenuItem: ['icon'],
  EuiFacetButton: ['icon'],
  EuiHeaderSectionItemButton: ['notification'],
  EuiKeyPadMenuItem: ['label'],
  EuiListGroupItem: ['icon', 'label'],
  EuiStepHorizontal: ['title'],
  EuiTab: ['append', 'prepend'],
};

/**
 * `EuiCard` props rendered inside the card wrapper, which is what carries the
 * forwarding click handler. `betaBadgeProps` can also produce a control, but it
 * is configured through an object rather than JSX and is not analysed here.
 */
const CARD_CONTENT_PROPS = ['description', 'footer', 'image', 'title'];

const LEAF_COMPONENTS = new Set(LEAF_INTERACTIVE_EUI_COMPONENTS);
const LEAF_HTML_ELEMENTS = new Set(['a', 'button']);
const COMPONENTS_WITH_CHILDREN_PROP = new Set([
  'a',
  CARD,
  'button',
  'EuiBadge',
  'EuiBetaBadge',
  'EuiButton',
  'EuiButtonEmpty',
  'EuiContextMenuItem',
  'EuiFacetButton',
  'EuiFilterButton',
  'EuiHeaderLink',
  'EuiHeaderSectionItemButton',
  'EuiKeyPadMenuItem',
  'EuiLink',
  'EuiTab',
]);

/**
 * Whether a boolean prop is set to a statically-known `true` (`<El prop />` or
 * `<El prop={true} />`). Dynamic values are treated as *not* set, so that a
 * card gated on e.g. `isDisabled={isLoading}` is still checked.
 */
function isStaticallyTrue(
  openingElement: TSESTree.JSXOpeningElement,
  propName: string
): boolean {
  const attr = openingElement.attributes.find(
    (a): a is TSESTree.JSXAttribute =>
      a.type === 'JSXAttribute' &&
      a.name.type === 'JSXIdentifier' &&
      a.name.name === propName
  );

  if (!attr) return false;
  if (attr.value == null) return true;

  return (
    attr.value.type === 'JSXExpressionContainer' &&
    attr.value.expression.type === 'Literal' &&
    attr.value.expression.value === true
  );
}

function getTarget(
  componentName: string,
  node: TSESTree.JSXElement
): Target | null {
  const { openingElement } = node;

  if (componentName === CARD) {
    // A card with `onClick`/`href` attaches a wrapper click handler that
    // forwards to the title link, so a control anywhere in its content fires
    // both its own action and the card's. A disabled card attaches no handler.
    //
    // `selectable` cards are deliberately not a target: pairing the select
    // button with a footer action is a pattern EUI itself ships. It is only
    // safe when the footer control stops propagation, which this rule cannot
    // verify statically — see the PR discussion.
    return hasInteractivityProp(openingElement) &&
      !isStaticallyTrue(openingElement, 'isDisabled')
      ? {
          messageId: 'clickableCardContent',
          contentProps: getComponentContentProps(componentName),
        }
      : null;
  }

  if (LEAF_HTML_ELEMENTS.has(componentName) && isInteractiveElement(node)) {
    return {
      messageId: 'nestedInteractive',
      contentProps: [],
    };
  }

  // Several leaf components only render a control when given the right props
  // (`EuiListGroupItem` is an `<li>` without an action, `EuiContextMenuItem` a
  // `<div>`), so the name alone is not enough to make it a target.
  if (LEAF_COMPONENTS.has(componentName) && isInteractiveElement(node)) {
    return {
      messageId: 'nestedInteractive',
      contentProps: getComponentContentProps(componentName),
    };
  }

  return null;
}

/** The element's children plus the expression value of each content prop. */
function getContentRoots(
  node: TSESTree.JSXElement,
  componentName: string | null,
  contentProps: string[]
): TSESTree.Node[] {
  const roots: TSESTree.Node[] = [...node.children];

  for (const attr of node.openingElement.attributes) {
    if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') {
      continue;
    }
    const isChildrenProp =
      attr.name.name === 'children' &&
      componentName != null &&
      COMPONENTS_WITH_CHILDREN_PROP.has(componentName);
    if (!isChildrenProp && !contentProps.includes(attr.name.name)) continue;
    // Only `prop={<JSX />}` can hold an element; a string literal cannot.
    if (attr.value?.type !== 'JSXExpressionContainer') continue;
    if (attr.value.expression.type === 'JSXEmptyExpression') continue;

    roots.push(attr.value.expression);
  }

  return roots;
}

function getComponentContentProps(componentName: string | null): string[] {
  if (componentName === CARD) {
    return CARD_CONTENT_PROPS;
  }

  return LEAF_CONTENT_PROPS[componentName ?? ''] ?? [];
}

function getDescendantRoots(node: TSESTree.JSXElement): TSESTree.Node[] {
  const componentName = getElementName(node.openingElement);

  // `getContentRoots` also adds supported `children={...}` content based on
  // the component name, so descendants are traversed the same way as targets.
  return getContentRoots(node, componentName, getComponentContentProps(componentName));
}

function shouldSkipNestedScanElement(element: TSESTree.JSXElement): boolean {
  const elementName = getElementName(element.openingElement);

  if (!elementName) return true;

  // Custom components stay traversable here; local ones are resolved by
  // `walkJsxChildren` before this guard runs, and unresolved ones remain opaque.
  if (/^[A-Z]/.test(elementName) && !elementName.startsWith('Eui')) {
    return true;
  }

  return !isInteractiveElement(element);
}

export const NoNestedInteractiveElement = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXElement(node) {
        const componentName = getElementName(node.openingElement);

        if (!componentName) return;

        const target = getTarget(componentName, node);

        if (!target) return;

        // Non-interactive elements (layout wrappers, `EuiToolTip`, text, …) are
        // walked through; interactive ones are reported and not descended into,
        // so this scan flags only the outermost control of a subtree. Anything
        // deeper is reported against its own nearest target, when that target
        // is itself scanned.
        const reported = new Set<TSESTree.JSXElement>();

        for (const root of getContentRoots(node, componentName, target.contentProps)) {
          walkJsxChildren(
            root,
            (leaf) => {
              if (leaf.type !== 'JSXElement' || reported.has(leaf)) return;
              reported.add(leaf);

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
              shouldSkip: shouldSkipNestedScanElement,
              getChildren: getDescendantRoots,
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
