/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { RequireTableCaption } from './require_table_caption';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('require-table-caption', RequireTableCaption, {
  valid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiBasicTable tableCaption="TableCaption" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiInMemoryTable tableCaption={"TableCaption"} />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
         <table>Should not affect other components</table>
        )
      `,
      languageOptions,
    },
  ],
  invalid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiBasicTable columns={[]} />
        );
      `,
      languageOptions,
      errors: [
        {
          messageId: 'missingTableCaption',
          data: { component: 'EuiBasicTable' },
        },
      ],
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiInMemoryTable columns={[]} />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'missingTableCaption',
          data: { component: 'EuiInMemoryTable' },
        },
      ],
    },
  ],
});
