/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
