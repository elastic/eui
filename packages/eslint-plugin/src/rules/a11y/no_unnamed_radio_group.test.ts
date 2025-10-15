/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { NoUnnamedRadioGroup } from './no_unnamed_radio_group';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('no-unnamed-radio-group', NoUnnamedRadioGroup, {
  valid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiRadio name="group1" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiRadioGroup name="group2" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <div>Not a radio</div>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiRadio name={dynamicName} />
        )
      `,
      languageOptions,
    },
  ],
  invalid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiRadio />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'missingRadioName',
          data: { component: 'EuiRadio' },
        },
      ],
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiRadioGroup />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'missingRadioName',
          data: { component: 'EuiRadioGroup' },
        },
      ],
    },
  ],
});
