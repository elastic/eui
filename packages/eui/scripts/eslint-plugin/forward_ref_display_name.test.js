import rule from './forward_ref_display_name.js';
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

const valid = [
  `const Component = React.forwardRef<ref>(() => {})
   Component.displayName = "EuiBadgeGroup"
`,
  `const Component = React.memo(() => {})
   Component.displayName = "EuiHighlight"
`,
];

const invalid = [
  {
    code: 'const Component = React.forwardRef<ref>(() => {})',
    errors: [
      {
        message:
          'Components wrapped in React.forwardRef must set a manual displayName',
      },
    ],
  },
  {
    code: 'const Component = React.memo(() => {})',
    errors: [
      {
        message:
          'Components wrapped in React.memo must set a manual displayName',
      },
    ],
  },
];

ruleTester.run('forward_ref_display_name', rule, {
  valid,
  invalid,
});
