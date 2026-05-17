/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { TooltipButtonIconWrap } from './tooltip_button_icon_wrap';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('tooltip-button-icon-wrap', TooltipButtonIconWrap, {
  valid: [
    {
      name: 'wrapped with EuiToolTip using string content',
      code: dedent`
        <EuiToolTip content="Edit item">
          <EuiButtonIcon aria-label="Edit item" iconType="pencil" />
        </EuiToolTip>
      `,
      languageOptions,
    },
    {
      name: 'wrapped with EuiToolTip using variable content',
      code: dedent`
        const label = "Edit item";
        <EuiToolTip content={label}>
          <EuiButtonIcon aria-label={label} iconType="pencil" />
        </EuiToolTip>
      `,
      languageOptions,
    },
    {
      name: 'wrapped inside conditional rendering',
      code: dedent`
        <EuiToolTip content="Edit">
          {isVisible && <EuiButtonIcon aria-label="Edit" iconType="pencil" />}
        </EuiToolTip>
      `,
      languageOptions,
    },
    {
      name: 'wrapped inside ternary',
      code: dedent`
        <EuiToolTip content="Edit">
          {isVisible ? <EuiButtonIcon aria-label="Edit" iconType="pencil" /> : null}
        </EuiToolTip>
      `,
      languageOptions,
    },
    {
      name: 'wrapped inside fragment inside EuiToolTip',
      code: dedent`
        <EuiToolTip content="Edit">
          <>
            <EuiButtonIcon aria-label="Edit" iconType="pencil" />
          </>
        </EuiToolTip>
      `,
      languageOptions,
    },
    {
      name: 'wrapped inside intermediate JSX element',
      code: dedent`
        <EuiToolTip content="Edit">
          <EuiFlexItem>
            <EuiButtonIcon aria-label="Edit" iconType="pencil" />
          </EuiFlexItem>
        </EuiToolTip>
      `,
      languageOptions,
    },
    {
      name: 'spread props without title — cannot statically determine, skip',
      code: dedent`
        <EuiButtonIcon {...props} />
      `,
      languageOptions,
    },
    {
      name: 'non-EuiButtonIcon is ignored',
      code: dedent`
        <EuiButton aria-label="Edit" iconType="pencil" />
      `,
      languageOptions,
    },
  ],
  invalid: [
    {
      name: 'standalone with aria-label — auto-wrap with string literal',
      code: dedent`
        <EuiButtonIcon aria-label="Edit item" iconType="pencil" />
      `,
      output: dedent`
        <EuiToolTip content="Edit item">
          <EuiButtonIcon aria-label="Edit item" iconType="pencil" />
        </EuiToolTip>
      `,
      languageOptions,
      errors: [{ messageId: 'wrapWithEuiToolTip' }],
    },
    {
      name: 'standalone with aria-label as expression — auto-wrap',
      code: dedent`
        const label = "Delete";
        <EuiButtonIcon aria-label={label} iconType="trash" />
      `,
      output: dedent`
        const label = "Delete";
        <EuiToolTip content={label}>
          <EuiButtonIcon aria-label={label} iconType="trash" />
        </EuiToolTip>
      `,
      languageOptions,
      errors: [{ messageId: 'wrapWithEuiToolTip' }],
    },
    {
      name: 'standalone without aria-label — warn only, no fix',
      code: dedent`
        <EuiButtonIcon iconType="pencil" />
      `,
      output: null,
      languageOptions,
      errors: [{ messageId: 'wrapWithEuiToolTip' }],
    },
    {
      name: 'title prop with string — remove title, wrap with EuiToolTip',
      code: dedent`
        <EuiButtonIcon title="Edit item" aria-label="Edit item" iconType="pencil" />
      `,
      output: dedent`
        <EuiToolTip content="Edit item">
          <EuiButtonIcon aria-label="Edit item" iconType="pencil" />
        </EuiToolTip>
      `,
      languageOptions,
      errors: [{ messageId: 'useEuiToolTipInsteadOfTitle' }],
    },
    {
      name: 'title prop with expression — remove title, wrap with EuiToolTip',
      code: dedent`
        const label = "Edit item";
        <EuiButtonIcon title={label} aria-label={label} iconType="pencil" />
      `,
      output: dedent`
        const label = "Edit item";
        <EuiToolTip content={label}>
          <EuiButtonIcon aria-label={label} iconType="pencil" />
        </EuiToolTip>
      `,
      languageOptions,
      errors: [{ messageId: 'useEuiToolTipInsteadOfTitle' }],
    },
    {
      name: 'title prop already wrapped — only remove title, no double wrap',
      code: dedent`
        <EuiToolTip content="Edit">
          <EuiButtonIcon title="Edit" aria-label="Edit" iconType="pencil" />
        </EuiToolTip>
      `,
      output: dedent`
        <EuiToolTip content="Edit">
          <EuiButtonIcon aria-label="Edit" iconType="pencil" />
        </EuiToolTip>
      `,
      languageOptions,
      errors: [{ messageId: 'useEuiToolTipInsteadOfTitle' }],
    },
    {
      name: 'spread props with explicit title — title is still reported',
      code: dedent`
        <EuiButtonIcon {...props} title="Edit" iconType="pencil" />
      `,
      output: dedent`
        <EuiToolTip content="Edit">
          <EuiButtonIcon {...props} iconType="pencil" />
        </EuiToolTip>
      `,
      languageOptions,
      errors: [{ messageId: 'useEuiToolTipInsteadOfTitle' }],
    },
    {
      name: 'title takes priority — does not also report wrapWithEuiToolTip',
      code: dedent`
        <EuiButtonIcon title="Delete" iconType="trash" />
      `,
      output: dedent`
        <EuiToolTip content="Delete">
          <EuiButtonIcon iconType="trash" />
        </EuiToolTip>
      `,
      languageOptions,
      errors: [{ messageId: 'useEuiToolTipInsteadOfTitle' }],
    },
  ],
});
