const SSPL_ELASTIC_2_0_LICENSE_HEADER = `
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
`;

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
    },
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    // Prettier options need to come last, in order to override other style rules
    'plugin:prettier/recommended',
  ],
  plugins: ['local', 'import'],
  rules: {
    'block-scoped-var': 'error',
    camelcase: 'off',
    'dot-notation': ['error', { allowKeywords: true }],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'guard-for-in': 'error',
    'new-cap': ['error', { capIsNewExceptions: ['Private'] }],
    'no-caller': 'error',
    'no-const-assign': 'error',
    'no-debugger': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-global-assign': 'error',
    'no-loop-func': 'error',
    'no-restricted-globals': ['error', 'context'],
    'no-script-url': 'error',
    'no-sequences': 'error',
    'no-var': 'error',
    'no-with': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    strict: ['error', 'never'],
    'valid-typeof': 'error',

    'local/require-license-header': [
      'warn',
      {
        license: SSPL_ELASTIC_2_0_LICENSE_HEADER,
      },
    ],

    'import/no-unresolved': ['error', { amd: true, commonjs: true }],
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-duplicates': 'error',

    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-triple-slash-reference': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    // It"s all very well saying that some types are trivially inferrable,
    // but being explicit is still clearer.
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
        'ts-expect-error': 'allow-with-description',
      },
    ],
    '@typescript-eslint/consistent-type-exports': [
      'error',
      { fixMixedExportsWithInlineTypeSpecifier: false },
    ],
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'react/prefer-es6-class': 'off',
      },
    },
  ],
};
