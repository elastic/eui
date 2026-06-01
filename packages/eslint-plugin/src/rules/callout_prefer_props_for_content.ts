/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, ESLintUtils } from '@typescript-eslint/utils';

const COMPONENT_NAME = 'EuiCallOut';

const HTML_TEXT_ELEMENTS = new Set([
  'p',
  'span',
  'strong',
  'em',
  'b',
  'i',
  'small',
  'code',
]);
const EUI_TEXT_COMPONENTS = new Set([
  'EuiText',
  'EuiTextColor',
  'EuiTextAlign',
  'EuiCode',
  'EuiMark',
  'EuiHighlight',
]);
const HTML_ACTION_ELEMENTS = new Set(['button', 'a']);
const EUI_ACTION_COMPONENTS = new Set([
  'EuiButton',
  'EuiButtonEmpty',
  'EuiButtonIcon',
  'EuiButtonGroup',
  'EuiLink',
]);

// Layout container components that should be traversed for text/action elements.
const LAYOUT_CONTAINERS = new Set(['EuiFlexGroup', 'EuiFlexItem', 'div']);

type RuleContext = Parameters<
  Parameters<typeof ESLintUtils.RuleCreator.withoutDocs>[0]['create']
>[0];

function getElementName(
  openingElement: TSESTree.JSXOpeningElement
): string | null {
  const { name } = openingElement;

  if (name.type === 'JSXIdentifier') return name.name;

  return null;
}

/**
 * Recursively checks a node for text or action elements that should not be in EuiCallOut children.
 * It unwraps fragments, layout containers, conditional expressions, and logical expressions.
 * It does NOT traverse into custom/complex component children.
 */
function checkNode(node: TSESTree.Node, context: RuleContext): void {
  switch (node.type) {
    case 'JSXText': {
      // Plain string content
      if ((node as TSESTree.JSXText).value.trim().length > 0) {
        context.report({ node, messageId: 'childrenHavePlainText' });
      }
      break;
    }
    case 'JSXElement': {
      const el = node as TSESTree.JSXElement;
      const elementName = getElementName(el.openingElement);

      if (!elementName) return;

      if (
        HTML_TEXT_ELEMENTS.has(elementName) ||
        EUI_TEXT_COMPONENTS.has(elementName)
      ) {
        context.report({
          node,
          messageId: 'childrenHaveText',
          data: { elementName },
        });
      } else if (
        HTML_ACTION_ELEMENTS.has(elementName) ||
        EUI_ACTION_COMPONENTS.has(elementName)
      ) {
        context.report({
          node,
          messageId: 'childrenHaveActions',
          data: { elementName },
        });
      } else if (LAYOUT_CONTAINERS.has(elementName)) {
        // Transparent layout wrapper, traverse its children
        for (const child of el.children) {
          checkNode(child, context);
        }
      }

      // Custom/complex component, don't traverse its children
      break;
    }
    case 'JSXFragment': {
      for (const child of (node as TSESTree.JSXFragment).children) {
        checkNode(child, context);
      }

      break;
    }
    case 'JSXExpressionContainer': {
      const { expression } = node as TSESTree.JSXExpressionContainer;

      if (expression.type !== 'JSXEmptyExpression') {
        checkNode(expression, context);
      }

      break;
    }
    case 'LogicalExpression': {
      // e.g. {condition && <p>text</p>}
      checkNode((node as TSESTree.LogicalExpression).right, context);

      break;
    }
    case 'ConditionalExpression': {
      // e.g. {condition ? <p>text</p> : null}
      const { consequent, alternate } = node as TSESTree.ConditionalExpression;

      checkNode(consequent, context);
      checkNode(alternate, context);

      break;
    }
    default:
      break;
  }
}

export const CallOutPreferPropsForContent = ESLintUtils.RuleCreator.withoutDocs(
  {
    create(context) {
      return {
        JSXElement(node) {
          const { openingElement, children } = node;

          if (
            openingElement.name.type !== 'JSXIdentifier' ||
            openingElement.name.name !== COMPONENT_NAME
          ) {
            return;
          }

          for (const child of children) {
            checkNode(child, context);
          }
        },
      };
    },
    meta: {
      type: 'suggestion',
      docs: {
        description: [
          `Enforce correct usage of ${COMPONENT_NAME} \`text\` and \`actionProps\` props and discourage using \`children\` for content.`,
          'Text elements should be passed via the `text` prop.',
          'Action elements (buttons, links) should be passed via `actionProps` instead.',
        ].join(' '),
      },
      schema: [],
      messages: {
        childrenHavePlainText: [
          'Plain text passed as `children` of `EuiCallOut` should be moved to the `text` prop instead.',
          'Example:',
          '  <EuiCallOut title="Callout title" text="Callout text content" />',
        ].join('\n'),
        childrenHaveText: [
          '`<{{elementName}}>` passed as `children` of `EuiCallOut` should be moved to the `text` prop instead.',
          'The `text` prop accepts string text, block text elements (e.g. `<p>`) or inline elements (e.g. `<span>`, `<strong>`, `<em>`).',
          'Use `children` only for complex non-text content that cannot be expressed via `text`.',
          'Example:',
          '  <EuiCallOut title="Callout title" text={<p>Callout text content</p>} />',
        ].join('\n'),
        childrenHaveActions: [
          '`<{{elementName}}>` passed as `children` of `EuiCallOut` should be moved to the `actionProps` prop instead.',
          'Use `actionProps` to render standardized primary or secondary action buttons, including buttons-as-links via `href`.',
          'If a link is part of inline copy, move the surrounding content to the `text` prop instead.',
          'Example:',
          '  <EuiCallOut',
          '    title="Callout title"',
          '    actionProps={{ primary: { children: "Primary action", onClick: onClick }, secondary: { children: "Secondary action", href: "/"} }}',
          '  />',
        ].join('\n'),
      },
    },
    defaultOptions: [],
  }
);
