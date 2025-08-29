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
import { NoUnnamedInteractiveElement } from './no_unnamed_interactive_element';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('no-unnamed-interactive-element', NoUnnamedInteractiveElement, {
  valid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiButtonEmpty aria-label="Click me" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiFormRow label="Form row">
            <EuiSelect />
          </EuiFormRow>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <div>Not an EUI element</div>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiButtonIcon aria-labelledby={dynamicLabelId} />
        )
      `,
      languageOptions,
    },
  ],
  invalid: [
    // Unwrapped interactive element with no a11y name
    {
      code: dedent`
        const MyComponent = () => (
          <EuiButtonEmpty />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'missingA11y',
          data: {
            component: 'EuiButtonEmpty',
            how: '`aria-label` or `aria-labelledby`',
          },
        },
      ],
    },
    // Wrapped interactive element; suggest wrapper's label in addition
    {
      code: dedent`
        const MyComponent = () => (
          <EuiFormRow>
            <EuiSelect />
          </EuiFormRow>
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'missingA11y',
          data: {
            component: 'EuiFormRow',
            how: '`aria-label` or `aria-labelledby` or the wrapper\'s \`label\` (e.g., \`EuiFormRow\`)',
          },
        },
      ],
    },
  ],
});
