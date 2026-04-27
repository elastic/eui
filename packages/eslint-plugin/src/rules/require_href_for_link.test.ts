/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';

import { RequireHrefForLink } from './require_href_for_link';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('require-href-for-link', RequireHrefForLink, {
  valid: [
    {
      code: dedent`
        module.export = () => (
          <EuiLink />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        module.export = () => (
          <EuiLink href="/" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        module.export = () => (
          <EuiLink href="/" onClick={handleClick} />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        module.export = () => (
          <EuiLink {...linkProps} onClick={handleClick} />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        module.export = () => (
          <EuiButton onClick={handleClick} />
        )
      `,
      languageOptions,
    },
  ],

  invalid: [
    {
      code: dedent`
        module.export = () => (
          <EuiLink onClick={handleClick} />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'requireHrefForLink',
        },
      ],
    },
  ],
});
