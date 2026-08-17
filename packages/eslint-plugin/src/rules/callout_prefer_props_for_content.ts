/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { type TSESTree, ESLintUtils } from '@typescript-eslint/utils';
import {
  INTERACTIVE_EUI_COMPONENTS,
  HTML_TEXT_ELEMENTS,
  EUI_TEXT_COMPONENTS,
  HTML_ACTION_ELEMENTS,
  CALLOUT_LAYOUT_CONTAINERS,
  I18N_TEXT_COMPONENTS,
} from '../utils/constants';
import { getElementName } from '../utils/get_element_name';
import { walkJsxChildren } from '../utils/walk_jsx_children';

const DEFAULT_COMPONENTS = ['EuiCallOut'];

const EUI_ACTION_COMPONENTS = new Set(
  INTERACTIVE_EUI_COMPONENTS.filter(
    (c) => c.startsWith('EuiButton') || c === 'EuiLink'
  )
);

type MessageIds =
  | 'childrenHavePlainText'
  | 'childrenHaveText'
  | 'childrenHaveActions';
type Options = [{ components?: string[] }];

export const CallOutPreferPropsForContent = ESLintUtils.RuleCreator.withoutDocs<
  Options,
  MessageIds
>({
  create(context) {
    const components = new Set(
      context.options[0]?.components ?? DEFAULT_COMPONENTS
    );

    return {
      JSXElement(node) {
        const { openingElement, children } = node;

        if (
          openingElement.name.type !== 'JSXIdentifier' ||
          !components.has(openingElement.name.name)
        ) {
          return;
        }

        const componentName = openingElement.name.name;

        for (const child of children) {
          walkJsxChildren(
            child,
            (leaf) => {
              switch (leaf.type) {
                case 'JSXText': {
                  if ((leaf as TSESTree.JSXText).value.trim().length > 0) {
                    context.report({
                      node: leaf,
                      messageId: 'childrenHavePlainText',
                      data: { componentName },
                    });
                  }
                  break;
                }
                case 'Literal': {
                  const { value } = leaf as TSESTree.Literal;
                  if (typeof value === 'string' && value.trim().length > 0) {
                    context.report({
                      node: leaf,
                      messageId: 'childrenHavePlainText',
                      data: { componentName },
                    });
                  }
                  break;
                }
                case 'TemplateLiteral': {
                  context.report({
                    node: leaf,
                    messageId: 'childrenHavePlainText',
                    data: { componentName },
                  });
                  break;
                }
                case 'MemberExpression': {
                  const { object } = leaf as TSESTree.MemberExpression;
                  if (object.type === 'Identifier' && object.name === 'i18n') {
                    context.report({
                      node: leaf,
                      messageId: 'childrenHavePlainText',
                      data: { componentName },
                    });
                  }
                  break;
                }
                case 'JSXElement': {
                  const el = leaf as TSESTree.JSXElement;
                  const elementName = getElementName(el.openingElement);
                  if (!elementName) break;
                  if (
                    HTML_TEXT_ELEMENTS.has(elementName) ||
                    EUI_TEXT_COMPONENTS.has(elementName) ||
                    I18N_TEXT_COMPONENTS.has(elementName)
                  ) {
                    context.report({
                      node: leaf,
                      messageId: 'childrenHaveText',
                      data: { elementName, componentName },
                    });
                  } else if (
                    HTML_ACTION_ELEMENTS.has(elementName) ||
                    EUI_ACTION_COMPONENTS.has(elementName)
                  ) {
                    context.report({
                      node: leaf,
                      messageId: 'childrenHaveActions',
                      data: { elementName, componentName },
                    });
                  }
                  break;
                }
              }
            },
            {
              shouldSkip: (el) => {
                const name = getElementName(el.openingElement);

                return !!name && CALLOUT_LAYOUT_CONTAINERS.has(name);
              },
            }
          );
        }
      },
    };
  },
  meta: {
    type: 'suggestion',
    docs: {
      description: [
        'Enforce correct usage of `text` and `actionProps` props and discourage using `children` for content.',
        'Text elements should be passed via the `text` prop.',
        'Action elements (buttons, links) should be passed via `actionProps` instead.',
      ].join(' '),
    },
    schema: [
      {
        type: 'object',
        properties: {
          components: {
            type: 'array',
            items: { type: 'string', minLength: 1 },
            minItems: 1,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      childrenHavePlainText: [
        'Plain text passed as `children` of `{{componentName}}` should be moved to the `text` prop instead.',
        'Example:',
        '  <{{componentName}} title="Callout title" text="Callout text content" />',
      ].join('\n'),
      childrenHaveText: [
        '`<{{elementName}}>` passed as `children` of `{{componentName}}` should be moved to the `text` prop instead.',
        'The `text` prop accepts string text, block text elements (e.g. `<p>`) or inline elements (e.g. `<span>`, `<strong>`, `<em>`).',
        'Use `children` only for complex non-text content that cannot be expressed via `text`.',
        'Example:',
        '  <{{componentName}} title="Callout title" text={<p>Callout text content</p>} />',
      ].join('\n'),
      childrenHaveActions: [
        '`<{{elementName}}>` passed as `children` of `{{componentName}}` should be moved to the `actionProps` prop instead.',
        'Use `actionProps` to render standardized primary or secondary action buttons, including buttons-as-links via `href`.',
        'If a link is part of inline copy, move the surrounding content to the `text` prop instead.',
        'Example:',
        '  <{{componentName}}',
        '    title="Callout title"',
        '    actionProps={{ primary: { children: "Primary action", onClick: onClick }, secondary: { children: "Secondary action", href: "/"} }}',
        '  />',
      ].join('\n'),
    },
  },
  defaultOptions: [{}],
});
