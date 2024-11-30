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
    project: [
      './tsconfig.json',
      './cypress/tsconfig.json',
      './.storybook/tsconfig.json',
    ],
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
      webpack: {
        config: './.eslintwebpack.config.js',
      },
    },
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:deprecation/recommended',
    'plugin:storybook/recommended',
    // Prettier options need to come last, in order to override other style rules
    'plugin:prettier/recommended',
  ],
  plugins: [
    'mocha',
    'jsx-a11y',
    'local',
    'import',
    'react',
    'react-hooks',
    '@emotion',
    'deprecation'
  ],
  rules: {
    'deprecation/deprecation': 'warn',
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

    'local/i18n': 'error',
    'local/href-with-rel': 'error',
    'local/forward-ref': 'error',
    'local/css-logical-properties': 'error',
    'local/require-cypress-references': 'error',
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

    'mocha/handle-done-callback': 'error',
    'mocha/no-exclusive-tests': 'error',

    'jsx-a11y/accessible-emoji': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': [2, { ignoreNonDOM: true }],
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/media-has-caption': 'error',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'error',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
    'jsx-a11y/label-has-associated-control': 'error',

    'react/jsx-uses-vars': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': 'error',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

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
