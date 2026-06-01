/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RuleTester } from '@typescript-eslint/rule-tester';
import dedent from 'dedent';

import { CallOutPreferPropsForContent } from './callout_prefer_props_for_content';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run(
  'callout-prefer-props-for-content',
  CallOutPreferPropsForContent,
  {
    valid: [
      {
        // `text` prop used correctly
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title" text={<p>Callout text content</p>} />
        )
      `,
        languageOptions,
      },
      {
        // `actionProps` used correctly
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut
            title="Callout title"
            actionProps={{ primary: { children: 'Primary action', onClick: onClick } }}
          />
        )
      `,
        languageOptions,
      },
      {
        // Custom non-text content: It's acceptable as we don't know what's the content
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <MyComplexWidget data={someData} />
          </EuiCallOut>
        )
      `,
        languageOptions,
      },
      {
        // Nested text inside a custom component: It's acceptable as we don't know what's inside the custom component
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <ComplexLayout>
              <p>Nested text inside complex content</p>
            </ComplexLayout>
          </EuiCallOut>
        )
      `,
        languageOptions,
      },
      {
        // Other components are not flagged
        code: dedent`
        const MyComponent = () => (
          <EuiPanel>
            <p>Text content</p>
            <EuiButton>Action</EuiButton>
          </EuiPanel>
        )
      `,
        languageOptions,
      },
    ],
    invalid: [
      // `text` prop
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <p>Callout text content</p>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [{ messageId: 'childrenHaveText', data: { elementName: 'p' } }],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <span>Callout text content</span>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          { messageId: 'childrenHaveText', data: { elementName: 'span' } },
        ],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <strong>Callout text content</strong>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          { messageId: 'childrenHaveText', data: { elementName: 'strong' } },
        ],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <EuiText>Callout text content</EuiText>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          { messageId: 'childrenHaveText', data: { elementName: 'EuiText' } },
        ],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <EuiText><p>Callout text content</p></EuiText>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          { messageId: 'childrenHaveText', data: { elementName: 'EuiText' } },
        ],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <EuiCode>Callout content</EuiCode>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          { messageId: 'childrenHaveText', data: { elementName: 'EuiCode' } },
        ],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <>
              <p>Fragment wrapped text.</p>
            </>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [{ messageId: 'childrenHaveText', data: { elementName: 'p' } }],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            Some plain text content.
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          {
            messageId: 'childrenHavePlainText',
          },
        ],
      },
      // `actionProps` prop
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <p>Some text.</p>
            <EuiButton onClick={onClick}>Do it</EuiButton>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          { messageId: 'childrenHaveText', data: { elementName: 'p' } },
          {
            messageId: 'childrenHaveActions',
            data: { elementName: 'EuiButton' },
          },
        ],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <EuiButton onClick={onClick}>Button</EuiButton>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          {
            messageId: 'childrenHaveActions',
            data: { elementName: 'EuiButton' },
          },
        ],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <EuiButtonEmpty onClick={onClick}>Button</EuiButtonEmpty>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          {
            messageId: 'childrenHaveActions',
            data: { elementName: 'EuiButtonEmpty' },
          },
        ],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <EuiButtonIcon onClick={onClick}>Button</EuiButtonIcon>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          {
            messageId: 'childrenHaveActions',
            data: { elementName: 'EuiButtonIcon' },
          },
        ],
      },
      {
        code: dedent`
        const MyComponent = () => (
        
          <EuiCallOut title="Callout title">
            <EuiButtonGroup options={options} onChange={onClick}>Button</EuiButtonGroup>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          {
            messageId: 'childrenHaveActions',
            data: { elementName: 'EuiButtonGroup' },
          },
        ],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <button type="button" onClick={onClick}>Button</button>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          { messageId: 'childrenHaveActions', data: { elementName: 'button' } },
        ],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <EuiLink href="/">Link</EuiLink>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          {
            messageId: 'childrenHaveActions',
            data: { elementName: 'EuiLink' },
          },
        ],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <a href="/">Link</a>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          { messageId: 'childrenHaveActions', data: { elementName: 'a' } },
        ],
      },
      // Logical expressions
      {
        code: dedent`
        const MyComponent = ({ show }) => (
          <EuiCallOut title="Callout title">
            {show && <p>Conditionally shown text.</p>}
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [{ messageId: 'childrenHaveText', data: { elementName: 'p' } }],
      },
      // Conditional expressions
      {
        code: dedent`
        const MyComponent = ({ condition }) => (
          <EuiCallOut title="Callout title">
            {condition ? <p>Text when true.</p> : null}
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [{ messageId: 'childrenHaveText', data: { elementName: 'p' } }],
      },
      {
        code: dedent`
        const MyComponent = ({ condition }) => (
          <EuiCallOut title="Callout title">
            {condition ? null : <EuiButton onClick={onClick}>Button</EuiButton>}
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          {
            messageId: 'childrenHaveActions',
            data: { elementName: 'EuiButton' },
          },
        ],
      },
      // Nested text & actions
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <EuiFlexGroup>
              <EuiFlexItem>
                <p>Callout text content</p>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton onClick={onClick}>Button</EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          { messageId: 'childrenHaveText', data: { elementName: 'p' } },
          {
            messageId: 'childrenHaveActions',
            data: { elementName: 'EuiButton' },
          },
        ],
      },
      {
        code: dedent`
        const MyComponent = () => (
          <EuiCallOut title="Callout title">
            <div>
              <p>Callout text content</p>
              <EuiButton onClick={onClick}>Button</EuiButton>
            </div>
          </EuiCallOut>
        )
      `,
        languageOptions,
        errors: [
          { messageId: 'childrenHaveText', data: { elementName: 'p' } },
          {
            messageId: 'childrenHaveActions',
            data: { elementName: 'EuiButton' },
          },
        ],
      },
    ],
  }
);
