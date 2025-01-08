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
