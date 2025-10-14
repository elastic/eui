/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';
import { INTERACTIVE_EUI_COMPONENTS } from '../../utils/constants';
import { extractAttrValue } from "../../utils/get_attr_value";

export const AccessibleInteractiveElements = ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.type !== 'JSXIdentifier') return;
        const componentName = node.name.name;
        if (!INTERACTIVE_EUI_COMPONENTS.includes(componentName)) return;

        const tabIndexAttribute = node.attributes.find(
          (attr): attr is TSESTree.JSXAttribute =>
            attr.type === 'JSXAttribute' &&
            attr.name.type === 'JSXIdentifier' &&
            attr.name.name === 'tabIndex'
        );


        if (tabIndexAttribute && (Number(extractAttrValue(context, tabIndexAttribute)) || 0) === -1) {
          context.report({
            node:  node,
            messageId: 'disallowTabIndex',
            data: { component: componentName },
            fix: fixer => fixer.remove(tabIndexAttribute),
          });
        }
      },
    };
  },
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure interactive EUI components remain accessible by prohibiting tabIndex={-1}, which removes them from keyboard navigation.',
    },
    fixable: 'code',
    schema: [],
    messages: {
      disallowTabIndex: '{{component}} is an interactive EUI component and must not use tabIndex={-1}, as this removes it from keyboard navigation and impairs accessibility.',
    },
  },
  defaultOptions: [],
});
