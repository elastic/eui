const rule = require('./rel');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

const valid = [
  'const Component = ({ href, rel }) => {};',
  'const Component = ({ foo, bar, baz}) => {};',
];

const invalid = [
  {
    code: 'const Component = ({ href }) => {};',
    errors: [
      {
        message: 'Props must contain rel if href is defined',
      },
    ],
  },
];

ruleTester.run('href-with-rel', rule, {
  valid,
  invalid,
});
