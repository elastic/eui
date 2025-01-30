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

const { RuleTester } = require('eslint');
const rule = require('./no_restricted_eui_imports');

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaVersion: 2018,
  },
});

ruleTester.run('@elastic/eui/no-restricted-eui-imports', rule, {
  valid: [
    {
      code: "import { EuiButton } from '@elastic/eui';",
    },
    {
      code: "import theme from '@kbn/ui-theme';",
    },
  ],

  invalid: [
    {
      code: "import theme from '@elastic/eui/dist/eui_theme_light.json';",
      errors: [
        {
          message:
            'For client-side, please use `useEuiTheme` instead. Direct JSON token imports will be removed as per the EUI Deprecation schedule: https://github.com/elastic/eui/issues/1469.',
        },
      ],
    },
    {
      code: "import theme from '@kbn/ui-theme';",
      options: [
        {
          patterns: [
            {
              pattern: '@kbn/ui-theme',
              message:
                'For client-side, please use `useEuiTheme` from `@elastic/eui` instead.',
            },
          ],
        },
      ],
      errors: [
        {
          message:
            'For client-side, please use `useEuiTheme` from `@elastic/eui` instead.',
        },
      ],
    },
  ],
});
