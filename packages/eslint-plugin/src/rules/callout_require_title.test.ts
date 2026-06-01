/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RuleTester } from '@typescript-eslint/rule-tester';
import dedent from 'dedent';

import { CallOutRequireTitle } from './callout_require_title';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('callout-title-required', CallOutRequireTitle, {
  valid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Something went wrong" color="danger" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiCallOut title={myTitle} color="warning">
            <p>Additional content</p>
          </EuiCallOut>
        )
      `,
      languageOptions,
    },
    {
      // Other components should not be affected
      code: dedent`
        const MyComponent = () => (
          <EuiPanel />
        )
      `,
      languageOptions,
    },
  ],
  invalid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiCallOut color="danger" />
        )
      `,
      languageOptions,
      errors: [{ messageId: 'missingTitle' }],
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiCallOut>
            Something went wrong
          </EuiCallOut>
        )
      `,
      languageOptions,
      errors: [{ messageId: 'missingTitle' }],
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiCallOut color="warning" size="s" />
        )
      `,
      languageOptions,
      errors: [{ messageId: 'missingTitle' }],
    },
  ],
});
