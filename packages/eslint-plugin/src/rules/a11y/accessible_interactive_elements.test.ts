/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { AccessibleInteractiveElements } from './accessible_interactive_element';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('accessible-interactive-element', AccessibleInteractiveElements, {
  valid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiButton>Click me</EuiButton>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiButton tabIndex={0}>Focusable</EuiButton>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiLink href="#">Link</EuiLink>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <span tabIndex={-1}>Not interactive EUI</span>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiButton tabIndex={1}>Custom tab order</EuiButton>
        )
      `,
      languageOptions,
    },
  ],
  invalid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiButton tabIndex={-1}>Should not be focusable</EuiButton>
        )
      `,
      output: dedent`
        const MyComponent = () => (
          <EuiButton >Should not be focusable</EuiButton>
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'disallowTabIndex',
          data: { component: 'EuiButton' },
        },
      ],
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiLink tabIndex={-1} href="#">Link</EuiLink>
        )
      `,
      output: dedent`
        const MyComponent = () => (
          <EuiLink  href="#">Link</EuiLink>
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'disallowTabIndex',
          data: { component: 'EuiLink' },
        },
      ],
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiButton tabIndex={-1} color="primary">Primary</EuiButton>
        )
      `,
      output: dedent`
        const MyComponent = () => (
          <EuiButton  color="primary">Primary</EuiButton>
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'disallowTabIndex',
          data: { component: 'EuiButton' },
        },
      ],
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiBadge tabIndex={-1} />
        )
      `,
      output: dedent`
        const MyComponent = () => (
          <EuiBadge  />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'disallowTabIndex',
          data: { component: 'EuiBadge' },
        },
      ],
    },
  ],
});
