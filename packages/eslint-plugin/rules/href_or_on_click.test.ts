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

import { RuleTester } from 'eslint';
import dedent from 'dedent';

import { HrefOnClick } from './href_or_on_click';

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('@elastic/eui/href-or-on-click', HrefOnClick, {
  valid: [
    {
      code: dedent(`
        module.export = () => (
          <EuiButton />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <EuiButton href="/" />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <EuiButton href={'/' + 'home'} />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <EuiButton onClick={executeAction} />
        )
      `),
    },
    {
      code: dedent(`
        module.export = () => (
          <EuiButton onClick={() => executeAction()} />
        )
      `),
    },
  ],

  invalid: [
    {
      code: dedent(`
        module.export = () => (
          <EuiButton href="/" onClick={fooBar} />
        )
      `),

      errors: [
        {
          message:
            '<EuiButton> supplied with both `href` and `onClick`; is this intentional? (Valid use cases include programmatic navigation via `onClick` while preserving "Open in new tab" style functionality via `href`.)',
        },
      ],
    },
    {
      code: dedent(`
        module.export = () => (
          <EuiButtonEmpty href="/" onClick={fooBar} />
        )
      `),

      errors: [
        {
          message:
            '<EuiButtonEmpty> supplied with both `href` and `onClick`; is this intentional? (Valid use cases include programmatic navigation via `onClick` while preserving "Open in new tab" style functionality via `href`.)',
        },
      ],
    },
    {
      code: dedent(`
        module.export = () => (
          <EuiLink href="/" onClick={fooBar} />
        )
      `),

      errors: [
        {
          message:
            '<EuiLink> supplied with both `href` and `onClick`; is this intentional? (Valid use cases include programmatic navigation via `onClick` while preserving "Open in new tab" style functionality via `href`.)',
        },
      ],
    },
  ],
});
