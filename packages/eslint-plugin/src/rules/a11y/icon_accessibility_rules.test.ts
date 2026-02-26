import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { EuiIconAccessibilityRules } from './icon_accessibility_rules';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('EuiIconAccessibilityRules', EuiIconAccessibilityRules, {
  valid: [
    {
      code: dedent`
        const MyComponent = () => (
          <EuiIcon title="Search" type="search" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiIcon aria-label="Close" type="cross" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiIcon aria-labelledby="iconDesc" type="alert" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiIcon aria-hidden={true} type="logoElastic" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiIcon type="logoElastic" aria-hidden />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const MyComponent = () => (
          <EuiIcon tabIndex={0} aria-label="Focusable icon" type="user" />
        )
      `,
      languageOptions,
    },
    {
      code: dedent`
        const extraProps = {title: 'Search'};
        const MyComponent = () => (
          <EuiIcon type="search" {...extraProps} />
        )
      `,
      languageOptions,
    }
  ],
  invalid: [
    // Missing accessible name -> autofix adds aria-hidden={true}
    {
      code: dedent`
        const MyComponent = () => (<EuiIcon type="search" />)
      `,
      output: dedent`
        const MyComponent = () => (<EuiIcon type="search"  aria-hidden={true}/>)
      `,
      languageOptions,
      errors: [
        {
          messageId: 'missingTitleOrAriaHidden',
        },
      ],
    },
    // tabIndex with aria-hidden={true} -> error and autofix removes aria-hidden
    {
      code: dedent`
        const MyComponent = () => (
          <EuiIcon tabIndex={0} aria-hidden={true} type="cross" />
        )
      `,
      output: dedent`
        const MyComponent = () => (
          <EuiIcon tabIndex={0} type="cross" />
        )
      `,
      languageOptions,
      errors: [
        {
          messageId: 'tabIndexWithAriaHidden',
        },
      ],
    },
    // tabIndex without accessible name and without aria-hidden -> error
    {
      code: dedent`
        const MyComponent = () => (<EuiIcon tabIndex={0} type="alert" />)
      `,
      output: null, // no autofix
      languageOptions,
      errors: [
        {
          messageId: 'missingTitleOrAriaHidden',
        },
      ],
    },
  ],
});
