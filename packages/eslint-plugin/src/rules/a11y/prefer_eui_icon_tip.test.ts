import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { PreferEuiIconTip } from './prefer_eui_icon_tip';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('prefer-eui-icon-tip', PreferEuiIconTip, {
  valid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiToolTip>
            <EuiIconTip type="info" />
          </EuiToolTip>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiToolTip>
            <div>
              <span>Some text</span>
              <EuiIcon type="info" />
            </div>
          </EuiToolTip>
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <div>
            <EuiIcon type="info" />
          </div>
        )
      `,
      languageOptions,
    },
  ],
  invalid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiToolTip>
            <EuiIcon type="info" />
          </EuiToolTip>
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'preferEuiIconTip',
        },
      ],
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiToolTip>
            <EuiIcon />
            <span>Other content</span>
          </EuiToolTip>
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'preferEuiIconTip',
        },
      ],
    },
  ],
});
