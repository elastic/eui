import rule from './css_logical_properties.js';
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

const valid = [
  `css\`
    inline-size: 50px;
    inline-start-end: 10px;
  \``,
  // This is not in css``, so it's fine
  '`width: 50px; left: 10px;`',
  // Make sure we don't incorrectly catch similar properties that do not have logical equivalents
  `css\`
    line-height: 20px;
    border-width: 1px;
    scrollbar-width: 30px
  \``,
];

const invalid = [
  {
    code: 'css`height: 50px;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`max-height: 50px;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`width: 50px;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`min-width: 50px;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`top: 0;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`padding-right: 0;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`margin-bottom: 0;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`border-left: 1px solid green;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`border-left-color: red;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  {
    code: 'css`text-align: left;`',
    errors: [{ messageId: 'preferLogicalValue' }],
  },
  {
    code: 'css`overflow-y: hidden;`',
    errors: [{ messageId: 'preferLogicalProperty' }],
  },
  // Test multiple errors
  {
    code: `css\`
      content: 'ok';
      text-align: right;
      bottom: 50px;
    \``,
    errors: [
      { messageId: 'preferLogicalValue' },
      { messageId: 'preferLogicalProperty' },
    ],
  },
];

ruleTester.run('css_logical_properties', rule, {
  valid,
  invalid,
});
