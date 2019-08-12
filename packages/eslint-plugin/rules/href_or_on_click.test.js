/* eslint-disable @typescript-eslint/no-var-requires */

const { RuleTester } = require('eslint');
const rule = require('./href_or_on_click');
const dedent = require('dedent');

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
  },
});

ruleTester.run('@elastic/eui/href-or-on-click', rule, {
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
    // both href and onClick
    {
      code: dedent(`
        module.export = () => (
          <EuiButton href="/" onClick={fooBar} />
        )
      `),

      errors: [
        {
          message: '<EuiButton> accepts either `href` or `onClick`, not both.',
        },
      ],
    },
  ],
});
