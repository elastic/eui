/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
            'For client-side, please use `useEuiTheme` instead.',
        },
      ],
    },
    {
      code: "import theme from '@elastic/eui/dist/eui_theme_light.json';",
      errors: [
        {
          // @ts-expect-error @typescript-eslint types expect `messageId` here but `message` is also allowed in eslint API
          message:
            'For client-side, please use `useEuiTheme` instead.',
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
