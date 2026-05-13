/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { TooltipNoInteractiveContent } from './tooltip_no_interactive_content';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('tooltip-no-interactive-content', TooltipNoInteractiveContent, {
  valid: [
    {
      name: 'plain text content',
      code: dedent`
        <EuiToolTip content="Just text">
          <EuiButton>Hover me</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
    },
    {
      name: 'non-interactive JSX in content',
      code: dedent`
        <EuiToolTip content={<span>Info text</span>}>
          <EuiButton>Hover me</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
    },
    {
      name: 'variable content - cannot be statically analyzed',
      code: dedent`
        <EuiToolTip content={someVariable}>
          <EuiButton>Hover me</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
    },
    {
      name: '`EuiIconTip` with plain text',
      code: dedent`
        <EuiIconTip content="Info" type="info" />
      `,
      languageOptions,
    },
    {
      name: 'conditionally-interactive component used as display element',
      code: dedent`
        <EuiToolTip content={<EuiBadge>v2.0</EuiBadge>}>
          <EuiButton>Hover me</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
    },
    {
      name: 'non-tooltip component with interactive content prop is ignored',
      code: dedent`
        <EuiPopover content={<EuiButton>Click</EuiButton>}>
          <EuiButton>Open</EuiButton>
        </EuiPopover>
      `,
      languageOptions,
    },
    {
      name: '`EuiToolTip` `title` prop with plain text',
      code: dedent`
        <EuiToolTip title="Heading" content="Body text">
          <EuiButton>Hover</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
    },
    {
      name: 'content with `EuiText` wrapper - not interactive',
      code: dedent`
        <EuiToolTip content={<EuiText><p>Description</p></EuiText>}>
          <EuiButton>Hover me</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
    },
  ],
  invalid: [
    {
      name: '`EuiLink` in content',
      code: dedent`
        <EuiToolTip content={<EuiLink href="/docs">Learn more</EuiLink>}>
          <EuiButton>Hover me</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
      errors: [
        {
          messageId: 'noInteractiveContent',
          data: { elementName: 'EuiLink', componentName: 'EuiToolTip', propName: 'content' },
        },
      ],
    },
    {
      name: '`EuiButton` in content',
      code: dedent`
        <EuiToolTip content={<EuiButton onClick={doSomething}>Click me</EuiButton>}>
          <span tabIndex={0}>Hover</span>
        </EuiToolTip>
      `,
      languageOptions,
      errors: [
        {
          messageId: 'noInteractiveContent',
          data: { elementName: 'EuiButton', componentName: 'EuiToolTip', propName: 'content' },
        },
      ],
    },
    {
      name: '`EuiFieldText` in content',
      code: dedent`
        <EuiToolTip content={<EuiFieldText placeholder="Search" />}>
          <EuiButton>Hover</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
      errors: [
        {
          messageId: 'noInteractiveContent',
          data: { elementName: 'EuiFieldText', componentName: 'EuiToolTip', propName: 'content' },
        },
      ],
    },
    {
      name: 'native `<a>` in content',
      code: dedent`
        <EuiToolTip content={<span><a href="/docs">link</a></span>}>
          <EuiButton>Hover</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
      errors: [
        {
          messageId: 'noInteractiveContent',
          data: { elementName: 'a', componentName: 'EuiToolTip', propName: 'content' },
        },
      ],
    },
    {
      name: 'native `<button>` in content',
      code: dedent`
        <EuiToolTip content={<button onClick={doSomething}>Click</button>}>
          <EuiButton>Hover</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
      errors: [
        {
          messageId: 'noInteractiveContent',
          data: { elementName: 'button', componentName: 'EuiToolTip', propName: 'content' },
        },
      ],
    },
    {
      name: 'native `<input>` in content',
      code: dedent`
        <EuiToolTip content={<div><input type="text" /></div>}>
          <EuiButton>Hover</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
      errors: [
        {
          messageId: 'noInteractiveContent',
          data: { elementName: 'input', componentName: 'EuiToolTip', propName: 'content' },
        },
      ],
    },
    {
      name: 'native `<select>` in content',
      code: dedent`
        <EuiToolTip content={<select><option>A</option></select>}>
          <EuiButton>Hover</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
      errors: [
        {
          messageId: 'noInteractiveContent',
          data: { elementName: 'select', componentName: 'EuiToolTip', propName: 'content' },
        },
      ],
    },
    {
      name: 'native `<textarea>` in content',
      code: dedent`
        <EuiToolTip content={<textarea placeholder="Enter text" />}>
          <EuiButton>Hover</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
      errors: [
        {
          messageId: 'noInteractiveContent',
          data: { elementName: 'textarea', componentName: 'EuiToolTip', propName: 'content' },
        },
      ],
    },
    {
      name: '`EuiButton` in `EuiIconTip` content',
      code: dedent`
        <EuiIconTip content={<EuiButton>Click</EuiButton>} type="info" />
      `,
      languageOptions,
      errors: [
        {
          messageId: 'noInteractiveContent',
          data: { elementName: 'EuiButton', componentName: 'EuiIconTip', propName: 'content' },
        },
      ],
    },
    {
      name: '`EuiLink` in `title` prop',
      code: dedent`
        <EuiToolTip title={<EuiLink href="#">Learn more</EuiLink>} content="Info">
          <EuiButton>Hover</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
      errors: [
        {
          messageId: 'noInteractiveContent',
          data: { elementName: 'EuiLink', componentName: 'EuiToolTip', propName: 'title' },
        },
      ],
    },
    {
      name: 'interactive element inside logical expression in content',
      code: dedent`
        <EuiToolTip content={<span>{cond && <EuiLink href="#">Link</EuiLink>}</span>}>
          <EuiButton>Hover</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
      errors: [
        {
          messageId: 'noInteractiveContent',
          data: { elementName: 'EuiLink', componentName: 'EuiToolTip', propName: 'content' },
        },
      ],
    },
    {
      name: 'interactive element inside conditional expression in content',
      code: dedent`
        <EuiToolTip content={cond ? <EuiLink href="#">Link</EuiLink> : null}>
          <EuiButton>Hover</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
      errors: [
        {
          messageId: 'noInteractiveContent',
          data: { elementName: 'EuiLink', componentName: 'EuiToolTip', propName: 'content' },
        },
      ],
    },
    {
      name: 'interactive element nested inside a fragment in content',
      code: dedent`
        <EuiToolTip content={<><span>Text</span><EuiLink href="#">Link</EuiLink></>}>
          <EuiButton>Hover</EuiButton>
        </EuiToolTip>
      `,
      languageOptions,
      errors: [
        {
          messageId: 'noInteractiveContent',
          data: { elementName: 'EuiLink', componentName: 'EuiToolTip', propName: 'content' },
        },
      ],
    },
  ],
});
