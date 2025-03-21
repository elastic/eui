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

import { RuleTester } from '@typescript-eslint/rule-tester';

import { NoRestrictedEuiImports } from './no_restricted_eui_imports';

const ruleTester = new RuleTester();

ruleTester.run('no-restricted-eui-imports', NoRestrictedEuiImports, {
  valid: [
    {
      code: "import { EuiButton } from '@elastic/eui';",
    },
    {
      code: "import theme from '@project/package';",
    },
    {
      code: "import theme from '@elastic/eui/dist/eui_themesomething_else.json';",
    },
  ],

  invalid: [
    {
      code: "import theme from '@elastic/eui/dist/eui_theme_something.json';",
      errors: [
        {
          // @ts-expect-error @typescript-eslint types expect `messageId` here but `message` is also allowed in eslint API
          message:
            'For client-side, please use `useEuiTheme` instead. Direct JSON token imports will be removed as per the EUI Deprecation schedule: https://github.com/elastic/eui/issues/1469.',
        },
      ],
    },
    {
      code: "import theme from '@elastic/eui/dist/eui_theme_light.json';",
      errors: [
        {
          // @ts-expect-error @typescript-eslint types expect `messageId` here but `message` is also allowed in eslint API
          message:
            'For client-side, please use `useEuiTheme` instead. Direct JSON token imports will be removed as per the EUI Deprecation schedule: https://github.com/elastic/eui/issues/1469.',
        },
      ],
    },
    {
      code: "import theme from '@project/package';",
      options: [
        {
          patterns: ['@project/package'],
          message: 'Please use `theme` from `@project/package` instead.',
        },
      ],
      errors: [
        {
          // @ts-expect-error @typescript-eslint types expect `messageId` here but `message` is also allowed in eslint API
          message: 'Please use `theme` from `@project/package` instead.',
        },
      ],
    },
    {
      code: "import { EuiIcon } from '@elastic/eui/lib/components/icon/icon';",
      options: [
        {
          patterns: ['@elastic/eui/lib/components/icon/*'],
          message: 'Please use `EuiIcon` from `@elastic/eui` instead.',
        },
      ],
      errors: [
        {
          // @ts-expect-error @typescript-eslint types expect `messageId` here but `message` is also allowed in eslint API
          message: 'Please use `EuiIcon` from `@elastic/eui` instead.',
        },
      ],
    },
    {
      code: "import { EuiIcon } from '@elastic/eui/lib/components/icon/icon';",
      options: [
        {
          patterns: ['@elastic/eui/lib/**/icon'],
          message: 'Please use `EuiIcon` from `@elastic/eui` instead.',
        },
      ],
      errors: [
        {
          // @ts-expect-error @typescript-eslint types expect `messageId` here but `message` is also allowed in eslint API
          message: 'Please use `EuiIcon` from `@elastic/eui` instead.',
        },
      ],
    },
    {
      code: "import { EuiIcon } from '@elastic/eui/lib/components/icon/icon';",
      options: [
        {
          patterns: ['@elastic/eui/lib/components/**'],
          message: 'Please use `EuiIcon` from `@elastic/eui` instead.',
        },
      ],
      errors: [
        {
          // @ts-expect-error @typescript-eslint types expect `messageId` here but `message` is also allowed in eslint API
          message: 'Please use `EuiIcon` from `@elastic/eui` instead.',
        },
      ],
    },
  ],
});
