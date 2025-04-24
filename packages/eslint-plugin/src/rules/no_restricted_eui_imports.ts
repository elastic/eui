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
import { TSESTree, TSESLint } from '@typescript-eslint/utils';

type Option = {
  patterns: string[];
  message: string;
};

const DEFAULT_RESTRICTED_IMPORT_OPTIONS: Option[] = [
  {
    patterns: ['@elastic/eui/dist/eui_theme_*\\.json'],
    message:
      'For client-side, please use `useEuiTheme` instead.',
  },
];

export const NoRestrictedEuiImports: TSESLint.RuleModule<never, Readonly<Option>[]> = {
  create(context) {
    const userOptions = context.options || [];
    const options = [...DEFAULT_RESTRICTED_IMPORT_OPTIONS, ...userOptions];

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        options.forEach(({ patterns, message }: Option) => {
          if (micromatch.isMatch(node.source.value, patterns)) {
            context.report({
              loc: node.source.loc,
              // @ts-expect-error @typescript-eslint types expect `messageId` here but `message` is also allowed in eslint API
              message,
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
          message: {
            type: 'string',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {},
  },
  defaultOptions: [],
};
