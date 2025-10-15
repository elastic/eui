/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { ConsistentIsInvalidProps } from './consistent_is_invalid_props';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('consistent-is-invalid-props', ConsistentIsInvalidProps, {
  valid: [
    {
      code: dedent`
        const MyComponent = () => {
          const expression = true && Boolean(Date.now());
          return (<EuiFormRow isInvalid={expression}>
            <EuiFieldText isInvalid={expression} />
          </EuiFormRow>
        );
        }
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiFormRow isInvalid={
            true &&
            Boolean(Date.now())}>
            <EuiFieldText isInvalid={true && Boolean(Date.now())} />
          </EuiFormRow>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiFormRow isInvalid={true && Boolean(Date.now())}>
            <EuiFieldText isInvalid={true && Boolean(Date.now())} />
          </EuiFormRow>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiFormRow isInvalid={false}>
            <EuiComboBox isInvalid={false} />
          </EuiFormRow>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiFormRow>
            <EuiFieldNumber />
          </EuiFormRow>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiFormRow>
            <div>Not a form control</div>
          </EuiFormRow>
        )
      `,
      languageOptions,
    },
  ],
  invalid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiFormRow isInvalid={true}>
            <EuiFieldText />
          </EuiFormRow>
        )
      `,
      output: dedent`
        const MyComponent = () => (
          <EuiFormRow isInvalid={true}>
            <EuiFieldText isInvalid={true} />
          </EuiFormRow>
        )
      `,
      languageOptions,
      errors: [{ messageId: 'inconsistentIsInvalid' }],
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiFormRow isInvalid={false}>
            <EuiSelect isInvalid={true} />
          </EuiFormRow>
        )
      `,
      output: dedent`
        const MyComponent = () => (
          <EuiFormRow isInvalid={false}>
            <EuiSelect isInvalid={false} />
          </EuiFormRow>
        )
      `,
      languageOptions,
      errors: [{ messageId: 'inconsistentIsInvalid' }],
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiFormRow isInvalid={true}>
            <EuiTextArea isInvalid={false} />
          </EuiFormRow>
        )
      `,
      output: dedent`
        const MyComponent = () => (
          <EuiFormRow isInvalid={true}>
            <EuiTextArea isInvalid={true} />
          </EuiFormRow>
        )
      `,
      languageOptions,
      errors: [{ messageId: 'inconsistentIsInvalid' }],
    },
    {
      code: dedent`
        const MyComponent = () => {
          const expression = true && Boolean(Date.now());
          return (<EuiFormRow isInvalid={expression}>
            <EuiFieldText />
          </EuiFormRow>
          );
        };
      `,
      output: dedent`
        const MyComponent = () => {
          const expression = true && Boolean(Date.now());
          return (<EuiFormRow isInvalid={expression}>
            <EuiFieldText isInvalid={expression} />
          </EuiFormRow>
          );
        };
      `,
      languageOptions,
      errors: [{ messageId: 'inconsistentIsInvalid' }],
    },
  ],
});
