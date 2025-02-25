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

import micromatch from 'micromatch';
import { TSESTree, ESLintUtils } from '@typescript-eslint/utils';

type MessageIds = 'restrictedEuiImport';

type Options = Array<{
  patterns: string[];
  messageId: MessageIds;
}>;

const DEFAULT_RESTRICTED_IMPORT_PATTERNS = [
  {
    patterns: ['@elastic/eui/dist/eui_theme_*\\.json'],
    messageId: 'restrictedEuiImport' as const,
  },
];

export const NoRestrictedEuiImports = ESLintUtils.RuleCreator.withoutDocs<
  Options,
  MessageIds
>({
  create(context) {
    const userPatterns = context.options || [];

    // Combine the default patterns with the user-defined patterns
    const allPatterns = [
      ...DEFAULT_RESTRICTED_IMPORT_PATTERNS,
      ...userPatterns,
    ];

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        allPatterns.forEach(({ patterns, messageId }) => {
          if (micromatch.isMatch(node.source.value, patterns)) {
            context.report({
              node,
              messageId,
            });
          }
        });
      },
    };
  },
  meta: {
    type: 'problem',
    docs: {
      description: 'Discourage the use of deprecated EUI imports.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          patterns: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          messageId: {
            type: 'string',
            enum: ['restrictedEuiImport'],
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      restrictedEuiImport:
        'For client-side, please use `useEuiTheme` instead. Direct JSON token imports will be removed as per the EUI Deprecation schedule: https://github.com/elastic/eui/issues/1469.',
    },
  },
  defaultOptions: [],
});
