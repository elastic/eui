/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { TSESTree, ESLintUtils } from '@typescript-eslint/utils';

export const PreferCSSAttributeForEuiComponents =
  ESLintUtils.RuleCreator.withoutDocs({
    create(context) {
      const isNamedEuiComponentRegex = /^Eui[A-Z]*/;

      return {
        JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
          if (
            node.name.type === 'JSXIdentifier' &&
            isNamedEuiComponentRegex.test(node.name.name)
          ) {
            let styleAttrNode: TSESTree.JSXAttribute | undefined;

            if (
              (styleAttrNode = node.attributes
                .filter(
                  (attr): attr is TSESTree.JSXAttribute =>
                    attr.type === 'JSXAttribute'
                )
                .find((attr) => attr.name.name === 'style'))
            ) {
              context.report({
                node: styleAttrNode?.parent,
                messageId: 'preferCSSAttributeForEuiComponents',
                fix(fixer) {
                  const cssAttr = node.attributes.find(
                    (attr) =>
                      attr.type === 'JSXAttribute' && attr.name.name === 'css'
                  );

                  if (cssAttr) {
                    return null;
                  }

                  return fixer.replaceTextRange(
                    styleAttrNode?.name?.range!,
                    'css'
                  );
                },
              });
            }
          }
        },
      };
    },
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Prefer the JSX css attribute for EUI components',
      },
      messages: {
        preferCSSAttributeForEuiComponents:
          'Prefer the css attribute for EUI components',
      },
      fixable: 'code',
      schema: [],
    },
    defaultOptions: [],
  });
