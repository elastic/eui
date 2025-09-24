/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';

import { HrefOnClick } from './href_or_on_click';

/**
 * For some reason, `languageOptions` is defined in `RuleTesterConfig` but causes an error: "Object literal may only specify known properties".
 * Documented way (per each test case) works as expected: https://typescript-eslint.io/packages/rule-tester/.
 */
const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('href-or-on-click', HrefOnClick, {
  valid: [
    {
      code: dedent`
        module.export = () => (
          <EuiButton />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        module.export = () => (
          <EuiButton href="/" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        module.export = () => (
          <EuiButton href={'/' + 'home'} />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        module.export = () => (
          <EuiButton onClick={executeAction} />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        module.export = () => (
          <EuiButton onClick={() => executeAction()} />
        )
      `,
      languageOptions,
    },
  ],

  invalid: [
    {
      code: dedent`
        module.export = () => (
          <EuiButton href="/" onClick={fooBar} />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'hrefOrOnClick',
        },
      ],
    },
    {
      code: dedent`
        module.export = () => (
          <EuiButtonEmpty href="/" onClick={fooBar} />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'hrefOrOnClick',
        },
      ],
    },
    {
      code: dedent`
        module.export = () => (
          <EuiLink href="/" onClick={fooBar} />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'hrefOrOnClick',
        },
      ],
    },
  ],
});
