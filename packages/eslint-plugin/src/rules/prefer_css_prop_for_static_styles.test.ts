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

import { PreferCSSPropForStaticStyles } from './prefer_css_prop_for_static_styles';

/**
 * For some reason, `languageOptions` is defined in `RuleTesterConfig` but causes an error: "Object literal may only specify known properties".
 * Documented way (per each test case) works as expected: https://typescript-eslint.io/packages/rule-tester/.
 */
const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run(
  'prefer-css-prop-for-static-styles',
  PreferCSSPropForStaticStyles,
  {
    valid: [
      {
        code: dedent`
        import React from 'react';

        function TestComponent() {
          return (
            <EuiCode css={{ color: '#dd4040' }}>This is a test</EuiCode>
          )
        }`,
        languageOptions,
      },
    ],

    invalid: [
      {
        code: dedent`
        import React from 'react';

        function TestComponent() {
          return (
            <EuiCode style={{ color: '#dd4040' }}>This is a test</EuiCode>
          )
        }`,
        languageOptions,
        errors: [
          {
            messageId: 'preferCSSPropForStaticStyles',
          },
        ],
        output: dedent`
        import React from 'react';

        function TestComponent() {
          return (
            <EuiCode css={{ color: '#dd4040' }}>This is a test</EuiCode>
          )
        }`,
      },
    ],
  }
);
