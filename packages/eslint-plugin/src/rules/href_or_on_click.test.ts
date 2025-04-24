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
