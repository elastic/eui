/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, ESLintUtils } from '@typescript-eslint/utils';
import { type RuleContext } from '@typescript-eslint/utils/ts-eslint';

import {
  INTERACTIVE_EUI_COMPONENTS,
  HTML_TEXT_ELEMENTS,
  EUI_TEXT_COMPONENTS,
  HTML_ACTION_ELEMENTS,
  CALLOUT_LAYOUT_CONTAINERS,
  I18N_TEXT_COMPONENTS,
} from '../utils/constants';
import { getElementName } from '../utils/get_element_name';

const COMPONENT_NAME = 'EuiCallOut';

const EUI_ACTION_COMPONENTS = new Set(
  INTERACTIVE_EUI_COMPONENTS.filter(
    (c) => c.startsWith('EuiButton') || c === 'EuiLink'
  )
);

type MessageIds = 'childrenHavePlainText' | 'childrenHaveText' | 'childrenHaveActions';

/**
 * Recursively checks a node for text or action elements that should not be in EuiCallOut children.
 * It unwraps fragments, layout containers, conditional expressions, and logical expressions.
 * It does NOT traverse into custom/complex component children.
 */
function checkNode(node: TSESTree.Node, context: RuleContext<MessageIds, []>): void {
  switch (node.type) {
    case 'JSXText': {
      // Plain string content
      if ((node as TSESTree.JSXText).value.trim().length > 0) {
        context.report({ node, messageId: 'childrenHavePlainText' });
      }
      break;
    }
    case 'Literal': {
      const { value } = node as TSESTree.Literal;

      if (typeof value === 'string' && value.trim().length > 0) {
        context.report({ node, messageId: 'childrenHavePlainText' });
      }
      break;
    }
    case 'JSXElement': {
      const el = node as TSESTree.JSXElement;
      const { name } = el.openingElement;

      if (
        name.type === 'JSXMemberExpression' &&
        name.object.type === 'JSXIdentifier' &&
        name.object.name === 'React' &&
        name.property.type === 'JSXIdentifier' &&
        name.property.name === 'Fragment'
      ) {
        for (const child of el.children) {
          checkNode(child, context);
        }
        break;
      }

      const elementName = getElementName(el.openingElement);

      if (!elementName) return;

      if (
        HTML_TEXT_ELEMENTS.has(elementName) ||
        EUI_TEXT_COMPONENTS.has(elementName) ||
        I18N_TEXT_COMPONENTS.has(elementName)
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
      } else if (CALLOUT_LAYOUT_CONTAINERS.has(elementName)) {
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
    case 'MemberExpression': {
      const { object } = node as TSESTree.MemberExpression;

      if (object.type === 'Identifier' && object.name === 'i18n') {
        context.report({ node, messageId: 'childrenHavePlainText' });
      }
      break;
    }
    case 'TemplateLiteral': {
      context.report({ node, messageId: 'childrenHavePlainText' });
      break;
    }
    case 'ArrayExpression': {
      for (const element of (node as TSESTree.ArrayExpression).elements) {
        if (element) checkNode(element, context);
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
      const { left, right } = node as TSESTree.LogicalExpression;

      checkNode(left, context);
      checkNode(right, context);

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
