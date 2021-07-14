import rule from './forward_ref_display_name.js';
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
});

const valid = [
  `const Component = React.forwardRef<ref>(() => {})
   Component.displayName = "EuiBadgeGroup"
`,
];

const invalid = [
  {
    code: 'const Component = React.forwardRef<ref>(() => {})',
    errors: [
      {
        message: 'Forward ref components must use a display name',
      },
    ],
  },
];

ruleTester.run('forward_ref_display_name', rule, {
  valid,
  invalid,
});
