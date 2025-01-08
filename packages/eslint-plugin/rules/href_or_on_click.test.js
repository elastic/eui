/* eslint-disable @typescript-eslint/no-var-requires */

const { RuleTester } = require('eslint');
const rule = require('./href_or_on_click');
const dedent = require('dedent');

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
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
    {
      code: dedent(`
        module.export = () => (
          <EuiButton href="/" onClick={fooBar} />
        )
      `),

      errors: [
        {
          message:
            '<EuiButton> supplied with both `href` and `onClick`; is this intentional? (Valid use cases include programmatic navigation via `onClick` while preserving \"Open in new tab\" style functionality via `href`.)',
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
