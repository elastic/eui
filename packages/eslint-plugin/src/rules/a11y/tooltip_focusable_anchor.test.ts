/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { TooltipFocusableAnchor } from './tooltip_focusable_anchor';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('tooltip-focusable-anchor', TooltipFocusableAnchor, {
  valid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiToolTip content="Info">
            <EuiButton>Click me</EuiButton>
          </EuiToolTip>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiToolTip content="Info">
            <span tabIndex={0}>Hover me</span>
          </EuiToolTip>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiToolTip content="Info">
            <div role="button" tabIndex={0}>Click me</div>
          </EuiToolTip>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiToolTip content="Info">
            <EuiLink href="#">Link text</EuiLink>
          </EuiToolTip>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <span>Not a tooltip</span>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiToolTip content="Info">
            <EuiBadge onClick={() => {}}>Status</EuiBadge>
          </EuiToolTip>
        )
      `,
      languageOptions
    },
  ],
  invalid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiToolTip content="Info">
            <span>Hover me</span>
          </EuiToolTip>
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'requiresFocusableAnchor',
          data: {
            element: 'span',
            toolTipComponent: 'EuiToolTip'
          },
        },
      ],
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiToolTip content="Info">
            <EuiText>Some text</EuiText>
          </EuiToolTip>
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'requiresFocusableAnchor',
          data: {
            element: 'EuiText',
            toolTipComponent: 'EuiToolTip'
          },
        },
      ],
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiToolTip content="Info">
            <div>Content</div>
          </EuiToolTip>
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'requiresFocusableAnchor',
          data: {
            element: 'div',
            toolTipComponent: 'EuiToolTip'
          },
        },
      ],
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiToolTip content="Info">
            <EuiBadge>Status</EuiBadge>
          </EuiToolTip>
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'requiresFocusableAnchor',
          data: {
            element: 'EuiBadge',
            toolTipComponent: 'EuiToolTip'
          },
        },
      ],
    },
  ],
});
