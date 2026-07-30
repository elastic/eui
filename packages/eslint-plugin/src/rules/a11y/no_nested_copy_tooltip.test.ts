/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { NoNestedCopyTooltip } from './no_nested_copy_tooltip';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run(
  'no-nested-copy-tooltip',
  NoNestedCopyTooltip,
  {
    valid: [
      // No `beforeMessage`, child is a tooltip
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCopy textToCopy="some text">
            {(copy) => (
              <EuiToolTip content="Copy me">
                <EuiButton onClick={copy}>Copy</EuiButton>
              </EuiToolTip>
            )}
          </EuiCopy>
        )
      `,
        languageOptions,
      },
      // `beforeMessage` but child is not a tooltip
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCopy textToCopy="some text" beforeMessage="Click to copy">
            {(copy) => (
              <EuiButton onClick={copy}>Copy</EuiButton>
            )}
          </EuiCopy>
        )
      `,
        languageOptions,
      },
      // `beforeMessage` with block body that returns a non-tooltip element
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCopy textToCopy="some text" beforeMessage="Click to copy">
            {(copy) => {
              return <EuiButtonIcon onClick={copy} aria-label="Copy" iconType="copy" />;
            }}
          </EuiCopy>
        )
      `,
        languageOptions,
      },
      // Unrelated component
      {
        code: dedent`
        const MyComponent = () => (
          <EuiToolTip content="Copy me" beforeMessage="Click to copy">
            <EuiButton>Copy</EuiButton>
          </EuiToolTip>
        )
      `,
        languageOptions,
      },
    ],
    invalid: [
      // Implicit arrow return of a tooltip
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCopy textToCopy="some text" beforeMessage="Click to copy">
            {(copy) => (
              <EuiToolTip content="Copy me">
                <EuiButton onClick={copy}>Copy</EuiButton>
              </EuiToolTip>
            )}
          </EuiCopy>
        )
      `,
        languageOptions,
        errors: [{ messageId: 'redundantTooltipWrapper' }],
      },
      // `beforeMessage` as an expression, tooltip as first child
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCopy textToCopy="some text" beforeMessage={message}>
            {(copy) => (
              <EuiToolTip content="Copy me">
                <EuiButton onClick={copy}>Copy</EuiButton>
              </EuiToolTip>
            )}
          </EuiCopy>
        )
      `,
        languageOptions,
        errors: [{ messageId: 'redundantTooltipWrapper' }],
      },
      // Block body with explicit return of a tooltip
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCopy beforeMessage="Click to copy" textToCopy="some text">
            {(copy) => {
              return (
                <EuiToolTip content="Copy me">
                  <EuiButton onClick={copy}>Copy</EuiButton>
                </EuiToolTip>
              );
            }}
          </EuiCopy>
        )
      `,
        languageOptions,
        errors: [{ messageId: 'redundantTooltipWrapper' }],
      },
      // Function expression (not an arrow) returning a tooltip
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCopy beforeMessage="Click to copy" textToCopy="some text">
            {function (copy) {
              return (
                <EuiToolTip content="Copy me">
                  <EuiButton onClick={copy}>Copy</EuiButton>
                </EuiToolTip>
              );
            }}
          </EuiCopy>
        )
      `,
        languageOptions,
        errors: [{ messageId: 'redundantTooltipWrapper' }],
      },
      // Block body with an early return before the tooltip return
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCopy beforeMessage="Click to copy" textToCopy="some text">
            {(copy) => {
              if (!condition) return null;
              return (
                <EuiToolTip content="Copy me">
                  <EuiButton onClick={copy}>Copy</EuiButton>
                </EuiToolTip>
              );
            }}
          </EuiCopy>
        )
      `,
        languageOptions,
        errors: [{ messageId: 'redundantTooltipWrapper' }],
      },
    ],
  }
);
