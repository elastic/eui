/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { TSESTree, ESLintUtils } from '@typescript-eslint/utils';
import { NON_INTERACTIVE_HTML_TAGS } from '../../utils/constants';

const TOOL_TIP_COMPONENT = 'EuiToolTip';

const NON_INTERACTIVE_ELEMENTS = [
  ...NON_INTERACTIVE_HTML_TAGS,
  // note: not a complete list, based on the most common violations
  'EuiText',
  'EuiImage',
  'EuiBadge',
  'EuiBetaBadge'
];

const INTERACTIVE_ATTRS = [
  'tabIndex',
  'href',
  'onClick'
];

export const TooltipFocusableAnchor = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    const isTooltipComponent = (node: TSESTree.JSXOpeningElement): boolean =>
      node.name.type === 'JSXIdentifier' && node.name.name === TOOL_TIP_COMPONENT;

    const hasInteractiveAttribute = (node: TSESTree.JSXOpeningElement): boolean =>
      node.attributes.some(
        (attr) =>
          attr.type === 'JSXAttribute' &&
          attr.name.type === 'JSXIdentifier' &&
          INTERACTIVE_ATTRS.includes(attr.name.name)
      );

    const isNonInteractiveElement = (elementName: string): boolean =>
      NON_INTERACTIVE_ELEMENTS.includes(elementName);

    return {
      JSXElement(node) {
        const { openingElement } = node;

        if (!isTooltipComponent(openingElement)) {
          return;
        }

        const children = node.children.filter(
          (child) => child.type === 'JSXElement'
        ) as TSESTree.JSXElement[];

        if (children.length === 0) {
          return;
        }

        const firstChild = children[0].openingElement;
        if (firstChild.name.type !== 'JSXIdentifier') {
          return;
        }

        const childName = firstChild.name.name;

        if (isNonInteractiveElement(childName) && !hasInteractiveAttribute(firstChild)) {
          context.report({
            node: firstChild,
            messageId: 'requiresFocusableAnchor',
            data: {
              element: childName,
              toolTipComponent: TOOL_TIP_COMPONENT
            }
          });
        }
      }
    };
  },
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure {{ toolTipComponent }} components are anchored to focusable elements'
    },
    schema: [],
    messages: {
      requiresFocusableAnchor: [
        '{{ element }} inside {{ toolTipComponent }} must be focusable for accessibility.',
        'Option 1: Add tabIndex attribute to make the element keyboard focusable:',
        '  <{{ toolTipComponent }} content=\'...\'>',
        '    <{{ element }} tabIndex={0}>...</{{ element }}>',
        '  </{{ toolTipComponent }}>',
        'Option 2 (Preferred): Use an interactive component instead:',
        '  <{{ toolTipComponent }} content=\'...\'>',
        '    <EuiButton>...</EuiButton>',
        '  </{{ toolTipComponent }}>'
      ].join('\n')
    }
  },
  defaultOptions: []
});
