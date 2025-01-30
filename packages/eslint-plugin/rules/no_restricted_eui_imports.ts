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

import { Rule } from 'eslint';
import { ImportDeclaration } from 'estree';

const DEFAULT_RESTRICTED_IMPORT_PATTERNS = [
  {
    pattern: '@elastic/eui/dist/eui_theme_*\\.json',
    message:
      'For client-side, please use `useEuiTheme` instead. Direct JSON token imports will be removed as per the EUI Deprecation schedule: https://github.com/elastic/eui/issues/1469.',
  },
];

export const NoRestrictedEuiImports: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Discourage the use of deprecated EUI imports.',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {
          patterns: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                pattern: { type: 'string' },
                message: { type: 'string' },
              },
              required: ['pattern'],
              additionalProperties: false,
            },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const userPatterns = options.patterns || [];

    // Combine the default patterns with the user-defined patterns
    const allPatterns = [
      ...DEFAULT_RESTRICTED_IMPORT_PATTERNS,
      ...userPatterns,
    ];

    return {
      ImportDeclaration(node: ImportDeclaration) {
        allPatterns.forEach(({ pattern, message }) => {
          const regex = new RegExp(pattern.replace('*', '.*'));
          if (regex.test(node.source.value as string)) {
            context.report({
              node,
              message,
            });
          }
        });
      },
    };
  },
};
